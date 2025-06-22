import http.server
import socketserver
import os

# --- Новые строки для определения пути ---
# Получаем путь к папке, в которой лежит этот скрипт
script_path = os.path.dirname(os.path.abspath(__file__))
# Меняем текущую рабочую директорию на папку со скриптом
os.chdir(script_path)
# ----------------------------------------

HOST = "127.0.0.1"
PORT = 9990 # Или любой другой свободный порт

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer((HOST, PORT), Handler) as httpd:
    print(f"Сервер запущен в папке: {script_path}")
    print(f"Откройте в браузере: http://{HOST}:{PORT}")
    print("Для остановки нажмите Ctrl+C")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nСервер остановлен.")
        httpd.shutdown()