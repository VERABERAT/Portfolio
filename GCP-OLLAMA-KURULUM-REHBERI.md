# GCP + Ollama + Qwen Kurulum Rehberi

**Tarih:** Eylül 2026  
**Hedef:** GCP üzerinde GPU VM'de uncensored Qwen modelini Ollama ile çalıştırmak  
**Süre:** ~20-30 dakika (model indirme hariç)

---

## 📋 İçindekiler

1. [Ön Koşullar](#ön-koşullar)
2. [Adım 1: GCP VM Oluşturma](#adım-1-gcp-vm-oluşturma)
3. [Adım 2: Sunucu İçi Kurulum](#adım-2-sunucu-içi-kurulum)
4. [Adım 3: Model İndirme](#adım-3-model-indirme)
5. [Adım 4: Test ve Doğrulama](#adım-4-test-ve-doğrulama)
6. [Sorun Giderme](#sorun-giderme)
7. [Referans: Tüm Komutlar](#referans-tüm-komutlar)

---

## Ön Koşullar

- **Google Cloud Account** (kredi kartı ile doğrulanmış)
- **gcloud CLI** yüklü ve yapılandırılmış
- **SSH** istemcisi (Windows: PuTTY veya WSL)
- **Minimum 100 GB boş disk** (GCP kredisi)

### gcloud CLI Yüklemesi

```bash
# macOS / Linux
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
gcloud init

# Windows
# https://cloud.google.com/sdk/docs/install adresinden indir
```

### Projeyi Yapılandır

```bash
# Aktif projeyi ayarla
gcloud config set project YOUR-PROJECT-ID

# Hesabı doğrula
gcloud auth list
gcloud config list
```

---

## Adım 1: GCP VM Oluşturma

### 1.1 Temel VM Oluşturma (L4 GPU ile)

```bash
#!/bin/bash
# Değişkenleri tanımla
PROJECT_ID="your-project-id"          # ← BURAYA KENDİ ID'NİZİ YAZIN
VM_NAME="ollama-qwen-server"
ZONE="us-central1-a"                  # GPU bulunabilen bölge
MACHINE_TYPE="g2-standard-4"          # L4 GPU (1x 24GB VRAM)
IMAGE="ubuntu-2204-lts"               # Ubuntu 22.04 LTS

# VM'yi oluştur
gcloud compute instances create $VM_NAME \
    --project=$PROJECT_ID \
    --zone=$ZONE \
    --machine-type=$MACHINE_TYPE \
    --network-interface=network-tier=PREMIUM \
    --no-restart-on-failure \
    --provisioning-model=STANDARD \
    --accelerator=type=nvidia-l4,count=1 \
    --image-family=$IMAGE \
    --image-project=ubuntu-os-cloud \
    --boot-disk-size=100GB \
    --boot-disk-type=pd-ssd \
    --scopes=https://www.googleapis.com/auth/cloud-platform
```

### 1.2 Alternatif: T4 GPU ile (Daha ucuz)

```bash
# n1-standard-4 (16GB RAM, T4 GPU)
gcloud compute instances create ollama-t4-server \
    --project=$PROJECT_ID \
    --zone=$ZONE \
    --machine-type=n1-standard-4 \
    --accelerator=type=nvidia-tesla-t4,count=1 \
    --image-family=ubuntu-2204-lts \
    --image-project=ubuntu-os-cloud \
    --boot-disk-size=100GB \
    --boot-disk-type=pd-ssd
```

### 1.3 Güvenlik Duvarı Kuralı Aç

```bash
# Ollama API portu (11434) açılsın
gcloud compute firewall-rules create allow-ollama-api \
    --project=$PROJECT_ID \
    --allow=tcp:11434 \
    --source-ranges=0.0.0.0/0 \
    --target-tags=ollama-server \
    --quiet

# VM'e etiket ekle
gcloud compute instances add-tags $VM_NAME \
    --zone=$ZONE \
    --project=$PROJECT_ID \
    --tags=ollama-server
```

### 1.4 VM'ye Bağlan

```bash
# Dış IP'yi öğren
gcloud compute instances describe $VM_NAME \
    --zone=$ZONE \
    --format='get(networkInterfaces[0].accessConfigs[0].natIP)'

# SSH ile bağlan
gcloud compute ssh $VM_NAME --zone=$ZONE

# VEYA doğrudan IP ile
ssh -i ~/.ssh/google_compute_engine ubuntu@EXTERNAL_IP
```

---

## Adım 2: Sunucu İçi Kurulum

**SSH ile VM'ye bağlandıktan sonra aşağıdaki komutları çalıştır.**

### 2.1 Sistem Bağımlılıklarını Yükle

```bash
# Sistem güncelle
sudo apt-get update
sudo apt-get upgrade -y

# Gerekli paketler
sudo apt-get install -y \
    curl \
    wget \
    git \
    build-essential \
    jq \
    net-tools \
    htop \
    screen \
    tmux
```

### 2.2 NVIDIA Sürücülerini Kur

```bash
# NVIDIA sürücü ve CUDA araçlarını yükle
sudo apt-get install -y \
    nvidia-driver-550-server \
    nvidia-utils

# Yüklemenin doğrulaması
nvidia-smi

# Çıktı örneği:
# +-------------------------+
# | NVIDIA-SMI 550.xx       |
# +-------------------------+
# | GPU  Name       Memory  |
# | 0    NVIDIA L4  24576MB |
# +-------------------------+
```

> **Not:** Eğer `nvidia-smi` çıktı vermezse, sistem yeniden başlatılması gerekebilir:
> ```bash
> sudo reboot
> ```

### 2.3 Ollama'yı Yükle

```bash
# Resmi Ollama kurulum scripti
curl -fsSL https://ollama.ai/install.sh | sh

# Yüklemenin doğrulaması
ollama --version
# Çıktı: ollama version X.X.X

# Ollama servisinin durumunu kontrol et
sudo systemctl status ollama
```

### 2.4 Ollama Servisini Yapılandır (Uzak Erişim)

```bash
# Systemd override dizini oluştur
sudo mkdir -p /etc/systemd/system/ollama.service.d/

# Override dosyasını oluştur
sudo tee /etc/systemd/system/ollama.service.d/override.conf > /dev/null <<EOF
[Service]
Environment="OLLAMA_HOST=0.0.0.0:11434"
EOF

# Systemd yeniden yükle ve servisi yeniden başlat
sudo systemctl daemon-reload
sudo systemctl restart ollama

# Servisin çalıştığını doğrula
sudo systemctl status ollama --no-pager

# Port dinleniyor mu kontrol et
sudo netstat -tlnp | grep ollama
# VEYA:
curl http://localhost:11434/api/tags

# Çıktı:
# {"models":[]}  (henüz model yüklü değil)
```

---

## Adım 3: Model İndirme

### 3.1 RAM'e Göre Model Seçimi

```bash
# Sistemin RAM'ini öğren
free -h

# Sonuç örneği:
#              total        used        free
# Mem:           24Gi        1.2Gi       22Gi
```

**Model Seçim Tablosu:**

| RAM | GPU | Önerilen Model | Komut |
|-----|-----|-----------------|-------|
| 16GB | T4 | qwen2.5-7b-instruct | `ollama pull qwen2.5-7b-instruct` |
| 24GB | L4 | qwen2.5-14b-instruct | `ollama pull qwen2.5-14b-instruct` |
| 24GB+ | L4 | qwen2.5-32b (Q4) | `ollama pull qwen2.5-32b:q4_1` |

### 3.2 Model İndir (7B Versiyonu)

```bash
# Resmi Qwen modeli indir (7B - 16GB RAM'de çalışır)
ollama pull qwen2.5-7b-instruct

# Çıktı örneği:
# Pulling model information
# Pulling c3d2e4a...
# Pulling d1234f...
# Verifying sha256 digest
# Writing manifest
# Success

# Yükleme süresi: 5-15 dakika (internet hızına bağlı)
```

### 3.3 Model İndir (14B Versiyonu - L4/24GB+ için)

```bash
# Daha büyük ve güçlü model (24GB+ RAM)
ollama pull qwen2.5-14b-instruct

# Yükleme süresi: 15-30 dakika
```

### 3.4 Yüklü Modelleri Listele

```bash
# CLI ile
ollama list

# Çıktı örneği:
# NAME                 ID              SIZE      MODIFIED
# qwen2.5-7b-instruct  1a1c2b3d4e5f   ~7.4GB    2 minutes ago

# API ile
curl http://localhost:11434/api/tags | jq '.models'
```

---

## Adım 4: Test ve Doğrulama

### 4.1 CLI ile Test

```bash
# Model ile doğrudan sohbet
ollama run qwen2.5-7b-instruct

# Sonra sorular yazabilirsin:
# >>> Merhaba! Kısaca kendini tanıt.
# >>> Python'da örnek bir program yazar mısın?
# >>> exit  (çıkmak için)
```

### 4.2 CLI ile Tek Prompt Test

```bash
# Tek bir soru sorrup çık
ollama run qwen2.5-7b-instruct "Türkiye'nin başkenti neresidir?"

# Çıktı örneği:
# Türkiye'nin başkenti Ankara'dır.
# İstatistikler:
#    total duration:       2.156s
#    load duration:        150ms
#    prompt eval count:    12 token(s)
#    prompt eval duration: 450ms
#    eval count:           20 token(s)
#    eval duration:        1.456s
```

### 4.3 API ile Test (Localhost)

```bash
# 1. Modeller listesi
curl http://localhost:11434/api/tags | jq '.'

# 2. Basit prompt gönder
curl -X POST http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen2.5-7b-instruct",
    "prompt": "Merhaba! Senin adın ne?",
    "stream": false
  }' | jq '.'

# Beklenen çıktı:
# {
#   "model": "qwen2.5-7b-instruct",
#   "created_at": "2024-01-15T10:30:00Z",
#   "response": "Merhaba! Adım Qwen ve ben Alibaba tarafından geliştirilen...",
#   "done": true,
#   "context": [...]
# }
```

### 4.4 API ile Test (Akışlı Yanıt)

```bash
# Streaming (Real-time response) ile
curl -X POST http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen2.5-7b-instruct",
    "prompt": "Python ile Fibonacci dizisini yazabilir misin?",
    "stream": true
  }'

# Cevap kelime kelime gelmek
# {"model":"qwen2.5-7b-instruct","created_at":"...","response":"```\n",...}
# {"model":"qwen2.5-7b-instruct","created_at":"...","response":"python\n",...}
# ...
```

### 4.5 Uzak IP üzerinden API Test

```bash
# Yerel makinen/başka bir cihazdan:
# EXTERNAL_IP yerine GCP VM'nin dış IP'sini koy

EXTERNAL_IP="35.184.123.456"  # ← Gerçek IP'yi koy

# Test
curl -X POST http://$EXTERNAL_IP:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen2.5-7b-instruct",
    "prompt": "Merhaba!",
    "stream": false
  }' | jq '.response'
```

### 4.6 Python ile API Kullanımı

```python
#!/usr/bin/env python3
import requests
import json

API_URL = "http://localhost:11434/api/generate"

def query_ollama(prompt):
    payload = {
        "model": "qwen2.5-7b-instruct",
        "prompt": prompt,
        "stream": False
    }
    
    response = requests.post(API_URL, json=payload)
    
    if response.status_code == 200:
        data = response.json()
        print("Yanıt:")
        print(data['response'])
        print("\n---")
        print(f"Token hızı: {data.get('eval_count', 0)} / {data.get('eval_duration', 0)/1e9:.2f}s")
    else:
        print(f"Hata: {response.status_code}")

if __name__ == "__main__":
    query_ollama("Yapay zeka nedir?")
```

---

## Sorun Giderme

### Sorun 1: `nvidia-smi` Çalışmıyor

```bash
# Sürücü güncellemesi
sudo apt-get install --upgrade nvidia-driver-550-server

# Sistem yeniden başlat
sudo reboot

# Yeniden kontrol
nvidia-smi
```

### Sorun 2: Ollama Model İndirirken Takılıyor

```bash
# Ollama servisini yeniden başlat
sudo systemctl restart ollama

# Logs kontrol et
sudo journalctl -u ollama -n 50 --no-pager

# Disk alanı kontrol et
df -h /

# Minimum 50GB boş alan gerekli
```

### Sorun 3: API Portu (11434) Erişimi Yok

```bash
# Güvenlik duvarını tekrar kontrol et
gcloud compute firewall-rules list --filter="name~'ollama'"

# Port dinleniyor mu
sudo netstat -tlnp | grep :11434

# Eğer görmezsen:
# Ollama servisini yeniden başlat
sudo systemctl restart ollama
sudo systemctl status ollama
```

### Sorun 4: Model Yüklü Olmasına Rağmen API 404 Hatası

```bash
# Modelin doğru adını kontrol et
ollama list

# İsmi tam olarak kullan
curl http://localhost:11434/api/generate \
  -d '{
    "model": "qwen2.5-7b-instruct",
    "prompt": "Test",
    "stream": false
  }'
```

### Sorun 5: CUDA/GPU Kullanılmıyor

```bash
# GPU'nun çalışıp çalışmadığını kontrol et
nvidia-smi

# Ollama loglarında GPU kullanımını kontrol et
sudo journalctl -u ollama -f

# Log örneği: "llm server started on 0.0.0.0:11434" ve GPU stats görmeli
```

---

## Referans: Tüm Komutlar

### Hızlı Başlangıç (Tüm Adımlar)

```bash
# 1. Sistem güncelle
sudo apt-get update && sudo apt-get upgrade -y

# 2. NVIDIA sürücü
sudo apt-get install -y nvidia-driver-550-server

# 3. Ollama kur
curl -fsSL https://ollama.ai/install.sh | sh

# 4. Ollama yapılandır (uzak erişim)
sudo mkdir -p /etc/systemd/system/ollama.service.d/
sudo tee /etc/systemd/system/ollama.service.d/override.conf > /dev/null <<EOF
[Service]
Environment="OLLAMA_HOST=0.0.0.0:11434"
EOF
sudo systemctl daemon-reload && sudo systemctl restart ollama

# 5. Model indir
ollama pull qwen2.5-7b-instruct

# 6. Test et
curl http://localhost:11434/api/tags
```

### Kullanışlı Komutlar

```bash
# Servis yönetimi
sudo systemctl status ollama
sudo systemctl restart ollama
sudo systemctl logs ollama -f

# Modeller
ollama list
ollama rm qwen2.5-7b-instruct  # Modeli sil
ollama pull <model-name>       # Model indir

# Sistem bilgisi
nvidia-smi
free -h
df -h
top

# Port bilgisi
sudo netstat -tlnp | grep ollama
lsof -i :11434

# API Test
curl http://localhost:11434/api/tags
curl http://localhost:11434/api/tags | jq '.models[].name'
```

### Model Seçenekleri

```bash
# Resmi Qwen Modelleri
ollama pull qwen:7b                      # 7B
ollama pull qwen:14b                     # 14B
ollama pull qwen2.5-7b-instruct          # 7B Instruct
ollama pull qwen2.5-14b-instruct         # 14B Instruct
ollama pull qwen2.5-32b:q4_1             # 32B Quantized

# Diğer İyi Modeller
ollama pull neural-chat                  # 7B Chat
ollama pull mistral                      # 7B Mistral
ollama pull llama2                       # 7B Llama
```

---

## 📊 Performans Tahminleri

### L4 GPU (24GB VRAM)

```
Model              | Yükleme Süresi | İlk Cevap | Çıktı Hızı
---|---|---|---
qwen2.5-7b-inst    | 5-10 min       | 300ms    | 50 token/s
qwen2.5-14b-inst   | 15-25 min      | 400ms    | 40 token/s
qwen2.5-32b:q4     | 20-30 min      | 600ms    | 25 token/s
```

### T4 GPU (16GB VRAM)

```
Model              | Yükleme Süresi | İlk Cevap | Çıktı Hızı
---|---|---|---
qwen2.5-7b-inst    | 5-10 min       | 200ms    | 45 token/s
qwen2.5-14b:q4     | 15-20 min      | 350ms    | 20 token/s
```

---

## 💡 İpuçları

1. **Uzun Süreli Çalışma:** `tmux` veya `screen` kullan
   ```bash
   tmux new-session -d -s ollama
   tmux send-keys -t ollama "ollama serve" Enter
   ```

2. **API Güvenliği:** Production'da ters proxy (nginx) ve authentication ekle
   ```nginx
   location /api/ {
       auth_basic "Ollama API";
       auth_basic_user_file /etc/nginx/.htpasswd;
       proxy_pass http://localhost:11434;
   }
   ```

3. **Model Caching:** Büyük modelleri `/var/lib/ollama/models` içinde tutar
   ```bash
   sudo du -sh /var/lib/ollama/models/
   ```

4. **GPU Monitörü:** Real-time izleme
   ```bash
   watch -n 1 nvidia-smi
   ```

---

## 📞 Destek

- **Ollama GitHub:** https://github.com/ollama/ollama
- **Qwen GitHub:** https://github.com/QwenLM/Qwen2.5
- **GCP Dokümanları:** https://cloud.google.com/compute/docs

---

**Hazırlandı:** September 2026  
**Sürüm:** 1.0
