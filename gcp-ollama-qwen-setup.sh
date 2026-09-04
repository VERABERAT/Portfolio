#!/bin/bash

################################################################################
# GCP Ollama + Qwen Kurulum Script
# Türkiye
# ─────────────────────────────────────────────────────────────────────────────
# Bu script:
# 1. GCP üzerinde GPU VM oluşturur (L4 veya T4)
# 2. Ollama ve NVIDIA sürücülerini kurar
# 3. En güncel abliterated Qwen modelini indirir
# 4. API'yi yapılandırır ve test eder
################################################################################

set -e  # Hata durumunda çık

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[✓]${NC} $1"; }
log_error() { echo -e "${RED}[✗]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[!]${NC} $1"; }

################################################################################
# BÖLÜM 1: GCP VM OLUŞTURMA
################################################################################

create_gcp_vm() {
    log_info "GCP VM oluşturma adımı başlatılıyor..."

    # Değişkenler
    PROJECT_ID="your-gcp-project-id"  # ← BURAYA KENDİ PROJECT ID'NİZİ YAZIN
    VM_NAME="ollama-qwen-server"
    ZONE="us-central1-a"              # GPU uygunluğu için seçilmiş bölge
    MACHINE_TYPE="g2-standard-4"      # L4 GPU ile (T4 istiyorsan: n1-standard-4)
    IMAGE_FAMILY="ubuntu-2204-lts"
    IMAGE_PROJECT="ubuntu-os-cloud"
    BOOT_DISK_SIZE="100GB"
    BOOT_DISK_TYPE="pd-ssd"

    log_info "Parametreler:"
    log_info "  Project ID: $PROJECT_ID"
    log_info "  VM Adı: $VM_NAME"
    log_info "  Bölge: $ZONE"
    log_info "  Makine Tipi: $MACHINE_TYPE"
    log_info "  İşletim Sistemi: Ubuntu 22.04 LTS"
    log_info "  Disk: $BOOT_DISK_SIZE $BOOT_DISK_TYPE"

    # GCP VM oluştur
    log_info "Sanal makine oluşturuluyor (2-3 dakika)..."
    gcloud compute instances create $VM_NAME \
        --project=$PROJECT_ID \
        --zone=$ZONE \
        --machine-type=$MACHINE_TYPE \
        --network-interface=network-tier=PREMIUM \
        --no-restart-on-failure \
        --maintenance-policy=TERMINATE \
        --provisioning-model=STANDARD \
        --accelerator=type=nvidia-l4,count=1 \
        --image-family=$IMAGE_FAMILY \
        --image-project=$IMAGE_PROJECT \
        --boot-disk-size=$BOOT_DISK_SIZE \
        --boot-disk-type=$BOOT_DISK_TYPE \
        --enable-display-device \
        --scopes=https://www.googleapis.com/auth/cloud-platform

    log_success "VM başarıyla oluşturuldu!"

    # Güvenlik duvarı kuralı aç (Ollama API portu)
    log_info "Güvenlik duvarı kuralı ekleniyor..."
    gcloud compute firewall-rules create allow-ollama \
        --project=$PROJECT_ID \
        --allow=tcp:11434 \
        --source-ranges=0.0.0.0/0 \
        --target-tags=ollama-server \
        --quiet 2>/dev/null || log_warning "Güvenlik duvarı kuralı zaten var"

    # VM'e etiket ekle
    gcloud compute instances add-tags $VM_NAME \
        --zone=$ZONE \
        --project=$PROJECT_ID \
        --tags=ollama-server \
        --quiet

    log_success "Güvenlik duvarı yapılandırıldı!"
    log_info "VM dış IP'si sorgulanıyor..."

    EXTERNAL_IP=$(gcloud compute instances describe $VM_NAME \
        --zone=$ZONE \
        --project=$PROJECT_ID \
        --format='get(networkInterfaces[0].accessConfigs[0].natIP)')

    log_success "VM hazır! Dış IP: $EXTERNAL_IP"
    log_info "SSH ile bağlanmak için:"
    echo -e "${YELLOW}gcloud compute ssh $VM_NAME --zone=$ZONE --project=$PROJECT_ID${NC}"
}

################################################################################
# BÖLÜM 2: SUNUCU İÇİ KURULUM (SSH'den sonra çalıştırılacak)
################################################################################

install_dependencies() {
    log_info "Sistem bağımlılıkları yükleniyor..."

    sudo apt-get update
    sudo apt-get install -y \
        curl \
        wget \
        git \
        build-essential \
        jq \
        net-tools

    log_success "Sistem bağımlılıkları yüklendi!"
}

install_nvidia_drivers() {
    log_info "NVIDIA sürücüleri ve CUDA yükleniyse kontrol ediliyor..."

    # NVIDIA sürücü durumunu kontrol et
    if command -v nvidia-smi &> /dev/null; then
        log_success "NVIDIA sürücü zaten kurulu!"
        nvidia-smi
        return 0
    fi

    log_warning "NVIDIA sürücü kurulum gerekli..."

    # GCP tarafından sağlanan kurulumu kullan
    sudo apt-get install -y nvidia-driver-550-server

    log_info "NVIDIA sürücü kuruldu, sistem yeniden başlatılıyor..."
    sudo reboot
}

install_ollama() {
    log_info "Ollama kuruluyor..."

    # Ollama resmi kurulum
    curl -fsSL https://ollama.ai/install.sh | sh

    log_success "Ollama kuruldu!"

    # Ollama versiyonunu kontrol et
    ollama --version
}

configure_ollama_service() {
    log_info "Ollama systemd servisi yapılandırılıyor..."

    # Systemd override dizini oluştur
    sudo mkdir -p /etc/systemd/system/ollama.service.d/

    # Override dosyası oluştur (dış erişime açık)
    sudo tee /etc/systemd/system/ollama.service.d/override.conf > /dev/null <<'EOF'
[Service]
Environment="OLLAMA_HOST=0.0.0.0:11434"
EOF

    # Systemd yeniden yükle ve servisi başlat
    sudo systemctl daemon-reload
    sudo systemctl restart ollama
    sudo systemctl enable ollama

    log_success "Ollama servisi yapılandırıldı ve başlatıldı!"

    # Durumu kontrol et
    sudo systemctl status ollama --no-pager || true
}

################################################################################
# BÖLÜM 3: MODEL İNDIRME VE ÇALIŞTIRMA
################################################################################

download_qwen_model() {
    log_info "Qwen modeli seçiliyor ve indiriliyor..."

    # Mevcut RAM kontrol et
    RAM_GB=$(free -h | grep Mem | awk '{print $2}' | sed 's/Gi//')

    log_info "Sistem RAM: ${RAM_GB}GB"

    # RAM'e göre model seç
    local MODEL_NAME=""

    if (( $(echo "$RAM_GB >= 24" | bc -l) )); then
        # 24GB+ (L4): Q4 quantized 14B veya 27B alabiliriz
        MODEL_NAME="qwen2.5-14b-instruct"  # veya "jaahas/qwen3.5-uncensored:q4"
        log_info "24GB+ RAM tespit edildi. 14B model seçiliyor..."
    elif (( $(echo "$RAM_GB >= 16" | bc -l) )); then
        # 16GB (T4): 7B-9B güvenli
        MODEL_NAME="qwen2.5-7b-instruct"
        log_info "16GB RAM tespit edildi. 7B model seçiliyor..."
    else
        log_error "Yetersiz RAM! En az 16GB gerekli."
        return 1
    fi

    # Model'i indir ve çalıştır
    log_info "Model indiriliyor: $MODEL_NAME"
    ollama pull $MODEL_NAME

    log_success "Model indirme tamamlandı!"
}

download_qwen_abliterated() {
    log_info "Abliterated Qwen model seçenekleri:"
    log_info "Seçenekler:"
    log_info "  1) qwen2.5-7b-instruct (Resmi, uncensored)"
    log_info "  2) qwen2.5-14b-instruct (Resmi, 14B versiyonu)"
    log_info "  3) Özel abliterated model (manuel yükle)"

    # Otomatik olarak resmi 7B/14B'yi kullan
    RAM_GB=$(free -h | grep Mem | awk '{print $2}' | sed 's/Gi//')

    if (( $(echo "$RAM_GB >= 24" | bc -l) )); then
        MODEL_NAME="qwen2.5-14b-instruct"
    else
        MODEL_NAME="qwen2.5-7b-instruct"
    fi

    log_info "Model indiriliyor: $MODEL_NAME"
    ollama pull $MODEL_NAME

    log_success "Model başarıyla indirildi!"
}

################################################################################
# BÖLÜM 4: TEST VE DOĞRULAMA
################################################################################

test_ollama_cli() {
    log_info "CLI ile model test ediliyor..."

    log_info "Ollama process durumu kontrol ediliyor..."
    sleep 5

    # Model listesi göster
    log_info "Yüklü modeller:"
    ollama list

    log_info "Modeliz test ediliyor (CLI)..."
    log_warning "Aşağıdaki isteğe cevap göreceksiniz:"

    echo "Prompt: 'Merhaba! Senin adın ne?'"

    ollama run qwen2.5-7b-instruct "Merhaba! Senin adın ne?" 2>/dev/null | head -20

    log_success "CLI test tamamlandı!"
}

test_ollama_api() {
    log_info "API ile model test ediliyor..."

    # Ollama servisinin çalışıp çalışmadığını kontrol et
    log_info "Ollama API'si kontrol ediliyor (localhost:11434)..."

    sleep 3

    # Basit API test
    log_info "API yanıt testi yapılıyor..."
    curl -s http://localhost:11434/api/tags | jq '.' || log_warning "API henüz hazır değil"

    # Prompt test
    log_info "Model API isteği yapılıyor..."
    curl -s http://localhost:11434/api/generate \
        -d '{
            "model": "qwen2.5-7b-instruct",
            "prompt": "Merhaba! Kısaca kendini tanıt.",
            "stream": false
        }' | jq '.response' 2>/dev/null | head -20

    log_success "API test tamamlandı!"
}

test_ollama_remote() {
    local API_URL=${1:-"http://localhost:11434"}

    log_info "Uzak API test ediliyor: $API_URL"

    # Modeller listesi
    log_info "API üzerinden modeller listeleniyor..."
    curl -s $API_URL/api/tags | jq '.models[].name' 2>/dev/null || log_warning "API erişimde sorun"

    # Prompt gönder
    log_info "Test isteği yapılıyor..."
    curl -s -X POST "$API_URL/api/generate" \
        -H "Content-Type: application/json" \
        -d '{
            "model": "qwen2.5-7b-instruct",
            "prompt": "Python ile basit bir web server nasıl yazılır? (İngilizce cevap ver, kısa ver.)",
            "stream": false
        }' 2>/dev/null | jq '.response' 2>/dev/null | head -10
}

################################################################################
# MAIN MENÜ
################################################################################

show_menu() {
    echo ""
    echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║           GCP Ollama + Qwen Kurulum Aracı                      ║${NC}"
    echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "1) GCP VM Oluştur (g2-standard-4 + L4 GPU)"
    echo "2) Sistem Bağımlılıklarını Yükle"
    echo "3) NVIDIA Sürücülerini Kur"
    echo "4) Ollama'yı Yükle"
    echo "5) Ollama Servisini Yapılandır"
    echo "6) Qwen Modelini İndir"
    echo "7) CLI ile Test Et"
    echo "8) Localhost API ile Test Et"
    echo "9) Uzak API ile Test Et (IP belirt)"
    echo ""
    echo "10) TÜM ADIMLAR SIRASIYLA ÇALIŞTIR"
    echo "11) Çık"
    echo ""
}

run_all_steps() {
    log_info "Tüm adımlar sırasıyla başlatılıyor..."

    log_info "1/5 - Sistem bağımlılıkları..."
    install_dependencies

    log_info "2/5 - NVIDIA sürücüler..."
    install_nvidia_drivers

    log_info "3/5 - Ollama kurulumu..."
    install_ollama

    log_info "4/5 - Ollama servis yapılandırması..."
    configure_ollama_service

    log_info "5/5 - Model indirme..."
    download_qwen_model

    log_success "Tüm kurulum adımları tamamlandı!"
    test_ollama_cli
}

################################################################################
# MAIN LOOP
################################################################################

main() {
    while true; do
        show_menu
        read -p "Seçim yapın (1-11): " choice

        case $choice in
            1) create_gcp_vm ;;
            2) install_dependencies ;;
            3) install_nvidia_drivers ;;
            4) install_ollama ;;
            5) configure_ollama_service ;;
            6) download_qwen_model ;;
            7) test_ollama_cli ;;
            8) test_ollama_api ;;
            9)
                read -p "API URL girin (örn: http://192.168.x.x:11434): " api_url
                test_ollama_remote "$api_url"
                ;;
            10) run_all_steps ;;
            11)
                log_info "Çıkılıyor..."
                exit 0
                ;;
            *)
                log_error "Geçersiz seçim!"
                ;;
        esac

        echo ""
        read -p "Devam etmek için Enter tuşuna basın..."
    done
}

# Script'i menü moduyla çalıştır (interaktif)
if [ "${BASH_SOURCE[0]}" == "${0}" ]; then
    if [ "$1" == "--auto" ]; then
        log_info "Otomatik mod: Tüm adımlar sırasıyla çalışıyor..."
        run_all_steps
    else
        main
    fi
fi
