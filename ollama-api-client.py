#!/usr/bin/env python3

"""
Ollama API Python Client Örneği
GCP Qwen Modeli ile İletişim

Kullanım:
  python3 ollama-api-client.py --host http://localhost:11434
"""

import argparse
import json
import requests
import sys
from typing import Optional, Dict, Any
from dataclasses import dataclass
import time

# Renkler
class Colors:
    RESET = '\033[0m'
    BLUE = '\033[94m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    BOLD = '\033[1m'

@dataclass
class OllamaConfig:
    host: str = "http://localhost:11434"
    model: str = "qwen2.5-7b-instruct"
    timeout: int = 300
    stream: bool = False

class OllamaClient:
    """Ollama API ile iletişim kuran client"""

    def __init__(self, config: OllamaConfig):
        self.config = config
        self.base_url = config.host.rstrip('/')
        self._validate_connection()

    def _validate_connection(self) -> bool:
        """Ollama servisine bağlanabilir mi kontrol et"""
        try:
            response = requests.get(
                f"{self.base_url}/api/tags",
                timeout=5
            )
            if response.status_code == 200:
                print(f"{Colors.GREEN}✓ Ollama servisine bağlandı: {self.base_url}{Colors.RESET}")
                return True
        except requests.exceptions.RequestException as e:
            print(f"{Colors.RED}✗ Ollama servisine bağlanılamadı!{Colors.RESET}")
            print(f"  Hata: {e}")
            print(f"  URL: {self.base_url}")
            sys.exit(1)

    def list_models(self) -> list:
        """Yüklü modelleri listele"""
        try:
            response = requests.get(f"{self.base_url}/api/tags", timeout=10)
            response.raise_for_status()
            data = response.json()
            return data.get('models', [])
        except Exception as e:
            print(f"{Colors.RED}✗ Modeller listelenirken hata: {e}{Colors.RESET}")
            return []

    def model_exists(self, model_name: str) -> bool:
        """Model var mı kontrol et"""
        models = self.list_models()
        return any(m.get('name') == model_name for m in models)

    def generate(
        self,
        prompt: str,
        model: Optional[str] = None,
        stream: bool = False,
        **kwargs
    ) -> str:
        """
        Model ile metin üret

        Args:
            prompt: Sorulacak soru/istem
            model: Model adı (default: config.model)
            stream: Akışlı yanıt mı (True) yoksa bitmesi beklensin mi (False)
            **kwargs: Diğer parametreler (temperature, top_p, vb)

        Returns:
            Üretilen metin
        """
        model = model or self.config.model

        # Model var mı kontrol et
        if not self.model_exists(model):
            print(f"{Colors.RED}✗ Model bulunamadı: {model}{Colors.RESET}")
            print(f"  Yüklü modeller:")
            for m in self.list_models():
                print(f"    - {m.get('name')}")
            return ""

        payload = {
            "model": model,
            "prompt": prompt,
            "stream": stream,
        }
        payload.update(kwargs)

        try:
            response = requests.post(
                f"{self.base_url}/api/generate",
                json=payload,
                timeout=self.config.timeout,
                stream=stream
            )
            response.raise_for_status()

            if stream:
                return self._handle_stream(response)
            else:
                data = response.json()
                return data.get('response', '')

        except requests.exceptions.Timeout:
            print(f"{Colors.RED}✗ İstek zaman aşımına uğradı!{Colors.RESET}")
            return ""
        except Exception as e:
            print(f"{Colors.RED}✗ Üretim sırasında hata: {e}{Colors.RESET}")
            return ""

    def _handle_stream(self, response) -> str:
        """Akışlı yanıtı işle"""
        full_response = ""
        try:
            for line in response.iter_lines():
                if line:
                    data = json.loads(line)
                    chunk = data.get('response', '')
                    if chunk:
                        full_response += chunk
                        print(chunk, end='', flush=True)
            print()  # Yeni satır
            return full_response
        except Exception as e:
            print(f"\n{Colors.RED}✗ Akış işlenirken hata: {e}{Colors.RESET}")
            return full_response

    def get_model_info(self, model_name: Optional[str] = None) -> Dict[str, Any]:
        """Model bilgilerini al"""
        model_name = model_name or self.config.model

        try:
            response = requests.post(
                f"{self.base_url}/api/show",
                json={"name": model_name},
                timeout=10
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"{Colors.RED}✗ Model bilgisi alınırken hata: {e}{Colors.RESET}")
            return {}

    def pull_model(self, model_name: str) -> bool:
        """Model indir"""
        try:
            print(f"{Colors.YELLOW}⏳ Model indiriliyor: {model_name}{Colors.RESET}")
            response = requests.post(
                f"{self.base_url}/api/pull",
                json={"name": model_name},
                timeout=3600,  # 1 saat
                stream=True
            )
            response.raise_for_status()

            for line in response.iter_lines():
                if line:
                    data = json.loads(line)
                    status = data.get('status', '')
                    print(f"  {status}")

            print(f"{Colors.GREEN}✓ Model indirildi!{Colors.RESET}")
            return True
        except Exception as e:
            print(f"{Colors.RED}✗ Model indirilirken hata: {e}{Colors.RESET}")
            return False


def main():
    parser = argparse.ArgumentParser(
        description="Ollama API Python Client",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Örnekler:
  # Listeyi göster
  python3 %(prog)s --list

  # Sorgu yap
  python3 %(prog)s --prompt "Merhaba! Kısaca kendini tanıt."

  # Streaming ile yanıt al
  python3 %(prog)s --prompt "Python örneği yazar mısın?" --stream

  # Uzak sunucudan sorgula
  python3 %(prog)s --host http://192.168.1.100:11434 --prompt "Merhaba"

  # Model bilgisini al
  python3 %(prog)s --model-info

  # Model indir
  python3 %(prog)s --pull qwen2.5-14b-instruct
        """
    )

    parser.add_argument(
        '--host',
        default='http://localhost:11434',
        help='Ollama API URL (default: http://localhost:11434)'
    )
    parser.add_argument(
        '--model',
        default='qwen2.5-7b-instruct',
        help='Model adı (default: qwen2.5-7b-instruct)'
    )
    parser.add_argument(
        '--prompt',
        help='Sorulacak metin'
    )
    parser.add_argument(
        '--stream',
        action='store_true',
        help='Akışlı yanıt (gerçek zamanlı)'
    )
    parser.add_argument(
        '--list',
        action='store_true',
        help='Yüklü modelleri listele'
    )
    parser.add_argument(
        '--model-info',
        action='store_true',
        help='Model bilgisini göster'
    )
    parser.add_argument(
        '--pull',
        metavar='MODEL',
        help='Model indir'
    )
    parser.add_argument(
        '--temperature',
        type=float,
        default=0.7,
        help='Sıcaklık (0.0-1.0, default: 0.7)'
    )
    parser.add_argument(
        '--top-p',
        type=float,
        default=0.9,
        help='Top-p (0.0-1.0, default: 0.9)'
    )

    args = parser.parse_args()

    # Config oluştur
    config = OllamaConfig(
        host=args.host,
        model=args.model,
        stream=args.stream
    )

    # Client oluştur
    client = OllamaClient(config)

    # Komutları çalıştır
    if args.list:
        print(f"\n{Colors.BOLD}Yüklü Modeller:{Colors.RESET}")
        models = client.list_models()
        if models:
            for model in models:
                name = model.get('name', 'N/A')
                size = model.get('size', 0)
                size_gb = size / (1024**3)
                print(f"  • {Colors.BOLD}{name}{Colors.RESET} ({size_gb:.2f} GB)")
        else:
            print("  Henüz model yüklü değil")

    elif args.model_info:
        print(f"\n{Colors.BOLD}Model Bilgisi: {config.model}{Colors.RESET}")
        info = client.get_model_info(config.model)
        if info:
            print(json.dumps(info, indent=2, ensure_ascii=False))
        else:
            print("  Bilgi alınamadı")

    elif args.pull:
        print(f"\n{Colors.BOLD}Model İndirme: {args.pull}{Colors.RESET}")
        client.pull_model(args.pull)

    elif args.prompt:
        print(f"\n{Colors.BOLD}Soru:{Colors.RESET} {args.prompt}")
        print(f"{Colors.BOLD}Model:{Colors.RESET} {config.model}")
        print(f"{Colors.BOLD}Yanıt:{Colors.RESET}\n")

        start_time = time.time()

        response = client.generate(
            prompt=args.prompt,
            model=config.model,
            stream=args.stream,
            temperature=args.temperature,
            top_p=args.top_p
        )

        elapsed = time.time() - start_time

        print(f"\n{Colors.BOLD}Süre:{Colors.RESET} {elapsed:.2f}s")

    else:
        parser.print_help()


if __name__ == "__main__":
    main()
