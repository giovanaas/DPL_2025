// Seleciona o canvas
var tela = document.getElementById("gameCanvas");
var pincel = tela.getContext("2d");

// Tamanho do jogo
var tamanho = 20; // tamanho de cada quadradinho
tela.width = 30 * tamanho;
tela.height = 30 * tamanho;

// Cobra inicial
var cobra = [];
cobra[0] = { x: 10 * tamanho, y: 10 * tamanho };

// Comida inicial (posição aleatória)
var comida = {
  x: Math.floor(Math.random() * 30) * tamanho,
  y: Math.floor(Math.random() * 30) * tamanho
};

// Score
var pontos = 0;

// Teclas pressionadas
var teclas = {};

// Direção atual da cobra
var direcao = "right";

// Eventos do teclado
document.addEventListener("keydown", function (evento) {
  teclas[evento.key] = true;

  // Atualiza a direção com base na última tecla
  if (teclas["ArrowUp"] && direcao !== "down") direcao = "up";
  if (teclas["ArrowDown"] && direcao !== "up") direcao = "down";
  if (teclas["ArrowLeft"] && direcao !== "right") direcao = "left";
  if (teclas["ArrowRight"] && direcao !== "left") direcao = "right";
});

document.addEventListener("keyup", function (evento) {
  teclas[evento.key] = false;
});

// Função principal do jogo
function desenharJogo() {
  // Fundo
  pincel.fillStyle = "#721011";
  pincel.fillRect(0, 0, tela.width, tela.height);

  // Desenha a cobra
  for (var i = 0; i < cobra.length; i++) {
    pincel.fillStyle = (i == 0) ? "#55d818" : "#77ff55";
    pincel.fillRect(cobra[i].x, cobra[i].y, tamanho, tamanho);
  }

  // Desenha a comida
  pincel.fillStyle = "#FFD700";
  pincel.fillRect(comida.x, comida.y, tamanho, tamanho);

  // Posição da cabeça
  var cabecaX = cobra[0].x;
  var cabecaY = cobra[0].y;

  // Movimento da cobra (segue a última direção escolhida)
  if (direcao === "up") cabecaY -= tamanho;
  if (direcao === "down") cabecaY += tamanho;
  if (direcao === "left") cabecaX -= tamanho;
  if (direcao === "right") cabecaX += tamanho;

  // Verifica se pegou a comida
  if (cabecaX == comida.x && cabecaY == comida.y) {
    pontos++;
    document.getElementById("score").innerText = "Score: " + pontos;
    comida.x = Math.floor(Math.random() * 30) * tamanho;
    comida.y = Math.floor(Math.random() * 30) * tamanho;
  } else {
    cobra.pop(); // remove a cauda
  }

  // Nova cabeça
  var novaCabeca = { x: cabecaX, y: cabecaY };

  // Game Over (bateu na parede ou no corpo)
  if (
    cabecaX < 0 || cabecaY < 0 ||
    cabecaX >= tela.width || cabecaY >= tela.height ||
    colisao(novaCabeca, cobra)
  ) {
    alert("Game Over! Seu score foi " + pontos);
    document.location.reload();
  }

  cobra.unshift(novaCabeca);
}

// Verifica colisão com o corpo
function colisao(cabeca, corpo) {
  for (var i = 0; i < corpo.length; i++) {
    if (cabeca.x == corpo[i].x && cabeca.y == corpo[i].y) {
      return true;
    }
  }
  return false;
}

// Atualiza o jogo a cada 100ms
setInterval(desenharJogo, 100);
