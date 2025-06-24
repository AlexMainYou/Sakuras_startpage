import http.server
import socketserver
import os
import sys

# Устанавливаем текущую директорию
script_path = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_path)

HOST = "127.0.0.1"
PORT = 1111

Handler = http.server.SimpleHTTPRequestHandler

# Подавление любых выводов (чтобы не вызывать ошибки в pythonw)
sys.stdout = open(os.devnull, 'w')
sys.stderr = open(os.devnull, 'w')

# Запуск сервера без обработки прерываний
httpd = socketserver.TCPServer((HOST, PORT), Handler)
httpd.serve_forever()