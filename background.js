// Запускаем сервер при установке расширения
chrome.runtime.onInstalled.addListener(() => {
  const http = require('http');
  const fs = require('fs');
  const path = require('path');

  // Укажите полный путь к вашему HTML-файлу
  const htmlPath = '/полный/путь/к/вашему/файлу.html';

  const server = http.createServer((req, res) => {
    fs.readFile(htmlPath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading file');
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    });
  });

  server.listen(0, '127.0.0.1'); // Слушаем на случайном порту
  server.on('listening', () => {
    const port = server.address().port;
    // Сохраняем порт для использования в tab.html
    chrome.storage.local.set({ serverPort: port });
  });
});