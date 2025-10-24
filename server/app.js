// Importando módulos
const http = require('http');
const fs = require('fs');
const path = require('path');

// Criando o servidor
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // Página inicial normal
    const filePath = path.join(__dirname, 'home.html');
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Erro interno no servidor');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      }
    });
  } else {
    const notFoundPath = path.join(__dirname, 'index.html');
    fs.readFile(notFoundPath, (err, content) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Página não encontrada');
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(content);
      }
    });
  }
});

// Especificando a porta
const port = 3000;
server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/`);
});
