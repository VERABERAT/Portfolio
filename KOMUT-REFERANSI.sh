#!/bin/bash

################################################################################
# GCP Ollama Qwen - Tek Satır Komut Referansı
# Her komutu direkt copy-paste yapabilirsin
################################################################################

# ============================================================================
# BÖLÜM 1: GCP VM OLUŞTURMA (Lokal PC'den çalıştır)
# ============================================================================

# 1.1 Değişkenleri tanımla
PROJECT_ID="your-project-id"
VM_NAME="ollama-qwen"
ZONE="us-central1-a"

# 1.2 GCP projesini ayarla
gcloud config set project $PROJECT_ID

# 1.3 VM'yi oluştur (L4 GPU ile)
gcloud compute instances create $VM_NAME --zone=$ZONE --machine-type=g2-standard-4 --accelerator=type=nvidia-l4,count=1 --image-family=ubuntu-2204-lts --image-project=ubuntu-os-cloud --boot-disk-size=100GB --boot-disk-type=pd-ssd --scopes=https://www.googleapis.com/auth/cloud-platform --quiet

# 1.4 Alternatif: T4 GPU (daha ucuz)
gcloud compute instances create $VM_NAME --zone=$ZONE --machine-type=n1-standard-4 --accelerator=type=nvidia-tesla-t4,count=1 --image-family=ubuntu-2204-lts --image-project=ubuntu-os-cloud --boot-disk-size=100GB --boot-disk-type=pd-ssd --quiet

# 1.5 Güvenlik duvarını aç
gcloud compute firewall-rules create allow-ollama-api --allow=tcp:11434 --source-ranges=0.0.0.0/0 --target-tags=ollama --quiet 2>/dev/null; gcloud compute instances add-tags $VM_NAME --zone=$ZONE --tags=ollama --quiet

# 1.6 Dış IP'yi öğren
gcloud compute instances describe $VM_NAME --zone=$ZONE --format='get(networkInterfaces[0].accessConfigs[0].natIP)'

# 1.7 SSH ile bağlan
gcloud compute ssh $VM_NAME --zone=$ZONE

# 1.8 Veya doğrudan IP ile (EXTERNAL_IP yerine IP adresi koy)
ssh -i ~/.ssh/google_compute_engine ubuntu@EXTERNAL_IP


# ============================================================================
# BÖLÜM 2: SUNUCU KURULUMU (SSH'den sonra çalıştır)
# ============================================================================

# 2.1 Sistem güncelle
sudo apt-get update -qq && sudo apt-get upgrade -y -qq

# 2.2 Gerekli paketleri yükle
sudo apt-get install -y curl wget git build-essential jq net-tools htop tmux screen

# 2.3 NVIDIA sürücü yükle (L4/T4 için)
sudo apt-get install -y nvidia-driver-550-server

# 2.4 NVIDIA yüklemesini kontrol et
nvidia-smi

# 2.5 Ollama'yı yükle
curl -fsSL https://ollama.ai/install.sh | sh

# 2.6 Ollama versiyonunu kontrol et
ollama --version

# 2.7 Ollama servisini yapılandır (uzak erişim için)
sudo mkdir -p /etc/systemd/system/ollama.service.d/ && sudo tee /etc/systemd/system/ollama.service.d/override.conf > /dev/null <<EOF
[Service]
Environment="OLLAMA_HOST=0.0.0.0:11434"
EOF

# 2.8 Systemd yeniden yükle ve Ollama başlat
sudo systemctl daemon-reload && sudo systemctl restart ollama

# 2.9 Ollama servisini kontrol et
sudo systemctl status ollama --no-pager

# 2.10 Port dinleniyor mu kontrol et
sudo netstat -tlnp | grep ollama

# 2.11 API portu çalışıyor mu kontrol et
curl http://localhost:11434/api/tags


# ============================================================================
# BÖLÜM 3: MODEL İNDIRME
# ============================================================================

# 3.1 Sistem RAM'ini kontrol et
free -h

# 3.2 7B Modeli indir (16GB+ RAM)
ollama pull qwen2.5-7b-instruct

# 3.3 14B Modeli indir (24GB+ RAM)
ollama pull qwen2.5-14b-instruct

# 3.4 32B Quantized Modeli indir (24GB+ RAM, Q4)
ollama pull qwen2.5-32b:q4_1

# 3.5 Yüklü modelleri listele
ollama list

# 3.6 Model bilgilerini API ile görüntüle
curl http://localhost:11434/api/tags | jq '.models'

# 3.7 Modeli sil
ollama rm qwen2.5-7b-instruct


# ============================================================================
# BÖLÜM 4: TEST VE DOĞRULAMA
# ============================================================================

# 4.1 CLI ile interaktif sohbet
ollama run qwen2.5-7b-instruct

# 4.2 CLI ile tek prompt
ollama run qwen2.5-7b-instruct "Merhaba! Kısaca kendini tanıt."

# 4.3 API ile modeller listesi (JSON)
curl http://localhost:11434/api/tags | jq '.'

# 4.4 API ile basit prompt (single shot)
curl -X POST http://localhost:11434/api/generate -H "Content-Type: application/json" -d '{"model":"qwen2.5-7b-instruct","prompt":"Merhaba!","stream":false}' | jq '.response'

# 4.5 API ile detaylı prompt
curl -X POST http://localhost:11434/api/generate -H "Content-Type: application/json" -d '{
  "model": "qwen2.5-7b-instruct",
  "prompt": "Python ile Fibonacci yazılabilir mi?",
  "stream": false
}' | jq '.'

# 4.6 API ile streaming (akışlı cevap)
curl -X POST http://localhost:11434/api/generate -H "Content-Type: application/json" -d '{"model":"qwen2.5-7b-instruct","prompt":"Merhaba, nasılsın?","stream":true}'

# 4.7 Uzak API ile test (EXTERNAL_IP yerine gerçek IP koy)
curl -X POST http://EXTERNAL_IP:11434/api/generate -H "Content-Type: application/json" -d '{"model":"qwen2.5-7b-instruct","prompt":"Merhaba!","stream":false}' | jq '.response'

# 4.8 Python ile API kullanımı
python3 -c "
import requests
response = requests.post('http://localhost:11434/api/generate', json={'model': 'qwen2.5-7b-instruct', 'prompt': 'Merhaba!', 'stream': False})
print(response.json()['response'])
"


# ============================================================================
# BÖLÜM 5: SISTEM YÖNETIMI
# ============================================================================

# 5.1 Ollama servisi durumunu kontrol et
sudo systemctl status ollama

# 5.2 Ollama servisini yeniden başlat
sudo systemctl restart ollama

# 5.3 Ollama servisini durdur
sudo systemctl stop ollama

# 5.4 Ollama servisini başlat
sudo systemctl start ollama

# 5.5 Ollama loglarını gerçek zamanlı izle
sudo journalctl -u ollama -f

# 5.6 Son 50 log satırını göster
sudo journalctl -u ollama -n 50 --no-pager

# 5.7 GPU kullanımını izle (her 1 saniyede güncelle)
watch -n 1 nvidia-smi

# 5.8 Disk kullanımını kontrol et
df -h /

# 5.9 Modellerden kullandığı disk alanı
sudo du -sh /var/lib/ollama/models/

# 5.10 Sistem RAM ve CPU kullanımı
free -h && echo "---" && top -bn1 | head -15


# ============================================================================
# BÖLÜM 6: GCP YÖNETİMİ
# ============================================================================

# 6.1 VM durumunu kontrol et
gcloud compute instances describe $VM_NAME --zone=$ZONE

# 6.2 VM'yi yeniden başlat
gcloud compute instances reboot $VM_NAME --zone=$ZONE

# 6.3 VM'yi durdur
gcloud compute instances stop $VM_NAME --zone=$ZONE

# 6.4 VM'yi başlat
gcloud compute instances start $VM_NAME --zone=$ZONE

# 6.5 VM'yi sil
gcloud compute instances delete $VM_NAME --zone=$ZONE --quiet

# 6.6 Güvenlik duvarı kurallarını listele
gcloud compute firewall-rules list --filter="name~'ollama'"

# 6.7 Güvenlik duvarı kuralını sil
gcloud compute firewall-rules delete allow-ollama-api --quiet

# 6.8 Tüm VM'leri listele
gcloud compute instances list


# ============================================================================
# BÖLÜM 7: OLLAMA YANLIŞ TESPİT VE ÇÖZÜM
# ============================================================================

# 7.1 Ollama servisini yeniden başlat (taklı kalırsa)
sudo systemctl restart ollama && sleep 3 && sudo systemctl status ollama

# 7.2 NVIDIA sürücüsünü yeniden kur
sudo apt-get install --upgrade nvidia-driver-550-server

# 7.3 Disk alanı kontrol ve temizle
df -h && sudo apt-get clean

# 7.4 Model indirmesi iptal edilirse, yeniden dene
ollama pull qwen2.5-7b-instruct

# 7.5 Tüm modelleri sil ve temizle
ollama list | grep -oE "^[^ ]+" | xargs -I {} ollama rm {}

# 7.6 Ollama yapılandırma dosyasını kontrol et
cat /etc/systemd/system/ollama.service.d/override.conf

# 7.7 Sistem yeniden başlat
sudo reboot

# 7.8 Sistem açılırken Ollama otomatik başlasın mı kontrol et
sudo systemctl is-enabled ollama


# ============================================================================
# BÖLÜM 8: GELIŞMIŞ AYARLAR
# ============================================================================

# 8.1 Ollama HOST'u sadece localhost'ta dinlesin
OLLAMA_HOST=127.0.0.1:11434 ollama serve

# 8.2 Ollama HOST'u spesifik interface'de dinlesin
OLLAMA_HOST=192.168.1.100:11434 ollama serve

# 8.3 Model context window'unu artır
ollama run qwen2.5-7b-instruct --num-ctx 4096

# 8.4 Model precision'ı kontrol et
ollama show qwen2.5-7b-instruct

# 8.5 Custom Modelfile ile model oluştur
cat > Modelfile <<EOF
FROM qwen2.5-7b-instruct
PARAMETER temperature 0.7
PARAMETER top_p 0.9
EOF
ollama create qwen-custom -f Modelfile

# 8.6 Model parametreleri değiştir
ollama run qwen-custom "Merhaba"


# ============================================================================
# BÖLÜM 9: PYTHON İSTEMLERİ
# ============================================================================

# 9.1 pip ile ollama kütüphanesini yükle
pip install ollama

# 9.2 Python scriptinin örneği (test.py)
cat > test.py <<'PYEOF'
from ollama import Client
client = Client(host='http://localhost:11434')
response = client.generate(model='qwen2.5-7b-instruct', prompt='Merhaba!')
print(response['response'])
PYEOF

# 9.3 Python scriptini çalıştır
python3 test.py

# 9.4 İleri API kullanımı
cat > advanced_test.py <<'PYEOF'
import requests
import json

def chat_with_ollama(prompt, model="qwen2.5-7b-instruct"):
    response = requests.post(
        'http://localhost:11434/api/generate',
        json={'model': model, 'prompt': prompt, 'stream': False}
    )
    return response.json()['response']

result = chat_with_ollama("Python'da liste nasıl oluşturulur?")
print(result)
PYEOF

# 9.5 Gelişmiş Python scriptini çalıştır
python3 advanced_test.py


# ============================================================================
# BÖLÜM 10: BASH FONKSİYONLARI (Kolaylık için)
# ============================================================================

# ~/.bashrc veya ~/.zshrc'ye ekle:

# 10.1 Ollama hızlı sorgusu
function qwen() {
  curl -s -X POST http://localhost:11434/api/generate \
    -H "Content-Type: application/json" \
    -d "{\"model\":\"qwen2.5-7b-instruct\",\"prompt\":\"$@\",\"stream\":false}" | jq '.response' 2>/dev/null
}

# 10.2 GPU kontrol
function gpu() {
  watch -n 1 nvidia-smi
}

# 10.3 Ollama log
function olog() {
  sudo journalctl -u ollama -f
}

# 10.4 Kullani: qwen "Merhaba"
# Kullani: gpu
# Kullani: olog


################################################################################
# KOLAY REFERANS TABLO
################################################################################

# Model Seçim Rehberi
# ├─ 16GB RAM (T4) → qwen2.5-7b-instruct
# ├─ 24GB RAM (L4) → qwen2.5-14b-instruct VEYA qwen2.5-32b:q4_1
# └─ 48GB+ RAM   → qwen2.5-72b:q4_k_m

# Zone Seçim (GPU uygunluğu)
# ├─ us-central1-a (L4, T4, V100, P100)
# ├─ us-west1-a (L4, T4)
# ├─ europe-west4-a (L4, T4)
# └─ asia-southeast1-a (T4)

# Makine Tipi Karşılaştırması
# ├─ g2-standard-4: 1x NVIDIA L4 (24GB) + 16vCPU + 64GB RAM = $1.20/saat
# ├─ n1-standard-4: 1x NVIDIA T4 (16GB) + 4vCPU + 15GB RAM = $0.35/saat
# └─ a2-highgpu-1g: 1x NVIDIA A100 (40GB) = $2.50/saat

# API Protokolü
# ├─ /api/tags           → Modelleri listele
# ├─ /api/generate       → Metin üret (POST)
# ├─ /api/pull           → Model indir (POST)
# ├─ /api/show           → Model bilgisi (POST)
# └─ /api/delete         → Model sil (DELETE)

################################################################################
