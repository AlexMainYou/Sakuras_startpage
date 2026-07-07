import http.server
import socketserver
import os
import sys
import json
import urllib.parse
import urllib.request

# Устанавливаем текущую директорию
script_path = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_path)

HOST = "127.0.0.1"
PORT = int(os.environ.get("STARTPAGE_PORT") or (sys.argv[1] if len(sys.argv) > 1 else 1111))

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)

        if parsed.path == "/api/suggest":
            self.handle_suggest(parsed)
            return

        super().do_GET()

    def handle_suggest(self, parsed):
        query = urllib.parse.parse_qs(parsed.query).get("q", [""])[0].strip()
        suggestions = []

        if query:
            url = "https://suggest.yandex.ru/suggest-ff.cgi?" + urllib.parse.urlencode({
                "part": query,
                "uil": "ru",
                "v": "4",
            })

            try:
                request = urllib.request.Request(url, headers={
                    "User-Agent": "Mozilla/5.0",
                    "Accept": "application/json,text/javascript,*/*",
                })

                with urllib.request.urlopen(request, timeout=3) as response:
                    payload = json.loads(response.read().decode("utf-8"))
                    if isinstance(payload, list) and len(payload) > 1 and isinstance(payload[1], list):
                        suggestions = [str(item) for item in payload[1]][:10]
            except Exception:
                suggestions = []

        body = json.dumps({"suggestions": suggestions}, ensure_ascii=False).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

# Подавление любых выводов (чтобы не вызывать ошибки в pythonw)
sys.stdout = open(os.devnull, 'w')
sys.stderr = open(os.devnull, 'w')

# Запуск сервера без обработки прерываний
httpd = socketserver.TCPServer((HOST, PORT), Handler)
httpd.serve_forever()
