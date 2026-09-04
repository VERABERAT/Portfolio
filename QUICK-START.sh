#!/bin/bash

################################################################################
# GCP Ollama Qwen - Hızlı Başlangıç
# Tüm komutları doğrudan copy-paste yapabilirsin
################################################################################

set -e

# Renkler
R='\033[0;31m'
G='\033[0;32m'
Y='\033[1;33m'
B='\033[0;34m'
NC='\033[0m'

echo -e "${B}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${B}║     GCP Ollama Qwen - Hızlı Başlangıç                         ║${NC}"
echo -e "${B}╚════════════════════════════════════════════════════════════════╝${NC}"

################################################################################
# ADIM 1: GCP VM OLUŞTUR (Lokal makineden çalıştır)
################################################################################

echo ""
echo -e "${B}ADIM 1: GCP VM Oluşturma${NC}"
echo "---------------------------------------"

# Yapılandırma
PROJECT_ID="your-project-id"
VM_NAME="ollama-qwen"
ZONE="us-central1-a"

# GCP projesi kontrol et
echo -e "${Y}[1.1]${NC} Aktif GCP projesini ayarlıyor..."
gcloud config set project $PROJECT_ID

# VM oluştur
echo -e "${Y}[1.2]${NC} Sanal makine oluşturuluyor (3-5 dakika)..."
gcloud compute instances create $VM_NAME \
    --zone=$ZONE \
    --machine-type=g2-standard-4 \
    --accelerator=type=nvidia-l4,count=1 \
    --image-family=ubuntu-2204-lts \
    --image-project=ubuntu-os-cloud \
    --boot-disk-size=100GB \
    --boot-disk-type=pd-ssd \
    --scopes=https://www.googleapis.com/auth/cloud-platform \
    --quiet

echo -e "${G}✓ VM oluşturuldu!${NC}"

# Güvenlik duvarı
echo -e "${Y}[1.3]${NC} Güvenlik duvarı kuralı ekleniyor..."
gcloud compute firewall-rules create allow-ollama-api \
    --allow=tcp:11434 \
    --source-ranges=0.0.0.0/0 \
    --target-tags=ollama \
    --quiet 2>/dev/null || true

gcloud compute instances add-tags $VM_NAME \
    --zone=$ZONE \
    --tags=ollama \
    --quiet

# Dış IP
echo -e "${Y}[1.4]${NC} VM IP adresi alınıyor..."
EXTERNAL_IP=$(gcloud compute instances describe $VM_NAME \
    --zone=$ZONE \
    --format='get(networkInterfaces[0].accessConfigs[0].natIP)')

echo -e "${G}✓ VM başarı ile oluşturuldu!${NC}"
echo ""
echo -e "${B}Dış IP: ${EXTERNAL_IP}${NC}"
echo ""
echo -e "${Y}SSH ile bağlan:${NC}"
echo "gcloud compute ssh $VM_NAME --zone=$ZONE"
echo ""
echo "VEYA:"
echo "ssh -i ~/.ssh/google_compute_engine ubuntu@$EXTERNAL_IP"
echo ""
echo -e "${Y}Aşağıdaki kısımları SSH bağlantısında çalıştır...${NC}"
echo ""

################################################################################
# ADIM 2: SUNUCU KURULUMU (SSH ile VM'ye bağlandıktan sonra)
################################################################################

read -p "VM'ye bağlanıp Enter tuşuna bas (VM kurlurumunun başlanmasını durdurmak için Ctrl+C)"

echo ""
echo -e "${B}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${B}SSH'DEN ÇALIŞTIRILACAK KOMUTLAR BAŞLADILAR${NC}"
echo -e "${B}═══════════════════════════════════════════════════════════════${NC}"
echo ""

echo -e "${Y}[2.1]${NC} Sistem bağımlılıkları kuruluyor..."
sudo apt-get update -qq
sudo apt-get install -y -qq \
    curl wget git build-essential jq net-tools htop tmux screen \
    > /dev/null 2>&1

echo -e "${G}✓ Bağımlılıklar kuruldu${NC}"

echo -e "${Y}[2.2]${NC} NVIDIA sürücü kuruluyor..."
sudo apt-get install -y -qq nvidia-driver-550-server \
    > /dev/null 2>&1
echo -e "${G}✓ NVIDIA sürücü kuruldu${NC}"

echo ""
echo -e "${Y}[2.3]${NC} Ollama kuruluyor..."
curl -fsSL https://ollama.ai/install.sh | sh > /dev/null 2>&1
echo -e "${G}✓ Ollama kuruldu${NC}"

echo -e "${Y}[2.4]${NC} Ollama yapılandırılıyor (uzak erişim)..."
sudo mkdir -p /etc/systemd/system/ollama.service.d/
sudo tee /etc/systemd/system/ollama.service.d/override.conf > /dev/null <<'EOF'
[Service]
Environment="OLLAMA_HOST=0.0.0.0:11434"
EOF
sudo systemctl daemon-reload
sudo systemctl restart ollama

echo -e "${G}✓ Ollama yapılandırıldı${NC}"

# Kontrol et
echo ""
echo -e "${Y}[2.5]${NC} Sistem kontrol ediliyor..."
echo ""

echo "NVIDIA GPU Bilgisi:"
nvidia-smi --query-gpu=name,memory.total,compute_cap --format=csv,noheader
echo ""

echo "Ollama Servisi:"
sudo systemctl status ollama --no-pager | grep Active
echo ""

echo "Port Dinleniyor mu?"
sleep 2
curl -s http://localhost:11434/api/tags | jq '.models' 2>/dev/null || echo "Henüz model yok"
echo ""

echo -e "${G}✓ Sistem kontrol tamamlandı${NC}"

################################################################################
# ADIM 3: MODEL İNDIRME
################################################################################

echo ""
echo -e "${B}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${B}ADIM 3: Model İndirme${NC}"
echo -e "${B}═══════════════════════════════════════════════════════════════${NC}"
echo ""

# RAM kontrol et
RAM_GB=$(free -h | grep "^Mem:" | awk '{print $2}' | sed 's/Gi//')
echo -e "${Y}Sistem RAM: ${RAM_GB}GB${NC}"
echo ""

# Model seç
if (( $(echo "$RAM_GB >= 24" | bc -l) )); then
    MODEL="qwen2.5-14b-instruct"
    echo -e "${Y}24GB+ RAM tespit edildi → 14B model seçiliyor${NC}"
else
    MODEL="qwen2.5-7b-instruct"
    echo -e "${Y}16GB RAM tespit edildi → 7B model seçiliyor${NC}"
fi

echo ""
echo -e "${Y}[3.1]${NC} Model indiriliyor: $MODEL"
echo "(Bu 10-30 dakika sürebilir...)"
echo ""

ollama pull $MODEL

echo ""
echo -e "${G}✓ Model indirme tamamlandı!${NC}"

################################################################################
# ADIM 4: TEST
################################################################################

echo ""
echo -e "${B}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${B}ADIM 4: Test${NC}"
echo -e "${B}═══════════════════════════════════════════════════════════════${NC}"
echo ""

echo -e "${Y}[4.1]${NC} Yüklü modeller:"
ollama list
echo ""

echo -e "${Y}[4.2]${NC} CLI ile test (kısa cevap)..."
echo ""
ollama run $MODEL "Merhaba! Kısaca: Yapay zeka nedir?" 2>/dev/null | head -15
echo ""

echo -e "${Y}[4.3]${NC} API ile test..."
echo ""
curl -s -X POST http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "model": "'$MODEL'",
    "prompt": "Python example: print()",
    "stream": false
  }' | jq '.response' 2>/dev/null | head -10
echo ""

echo -e "${G}✓ Test tamamlandı!${NC}"

################################################################################
# SONUÇ
################################################################################

echo ""
echo -e "${B}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${G}✓ TÜM KURULUM TAMAMLANDI!${NC}"
echo -e "${B}═══════════════════════════════════════════════════════════════${NC}"
echo ""

echo -e "${Y}API Uç Noktası:${NC}"
echo "http://$EXTERNAL_IP:11434"
echo ""

echo -e "${Y}Örnek cURL komutu:${NC}"
echo 'curl -X POST http://'$EXTERNAL_IP':11434/api/generate \'
echo '  -H "Content-Type: application/json" \'
echo '  -d '\''{
echo '    "model": "'$MODEL'",
echo '    "prompt": "Merhaba!",
echo '    "stream": false
echo '  }'\'''
echo ""

echo -e "${Y}Interaktif sohbet:${NC}"
echo "ollama run $MODEL"
echo ""

echo -e "${Y}Modelleri yönet:${NC}"
echo "ollama list          # Modelleri listele"
echo "ollama pull <model>  # Model indir"
echo "ollama rm <model>    # Model sil"
echo ""

echo -e "${Y}Servis yönetimi:${NC}"
echo "sudo systemctl status ollama"
echo "sudo systemctl restart ollama"
echo ""

echo -e "${B}═══════════════════════════════════════════════════════════════${NC}"
echo ""
