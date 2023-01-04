//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 22;
let raio =diametro /2;

//variáveis da velocidade da bolinha
let velocidadexBolinha = 5;
let velocidadeyBolinha = 5;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//sons do jogo
let raquetada;
let ponto;
let trilha;

//variaveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

let colidiu = false;

function preload(){
  raquetada = loadSound("raquetada.mp3")
  ponto = loadSound("ponto.mp3")
  trilha = loadSound("trilha.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostrarRaquete(xRaquete, yRaquete);
  mostrarRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcarPontos();
}

function mostraBolinha (){
  circle(xBolinha,yBolinha,diametro);
}
function movimentaBolinha(){
  xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha;
}

function verificaColisaoBorda(){
    if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadexBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeyBolinha *= -1;
  }
}

function mostrarRaquete(x,y){
  rect(x, y,raqueteComprimento,raqueteAltura);
}

function mostrarRaqueteOponente (){
  rect(xRaqueteOponente,yRaqueteOponente,raqueteComprimento,raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadexBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x,y){
   colidiu = collideRectCircle(x,y,raqueteComprimento,raqueteAltura,xBolinha,yBolinha,raio);
  if (colidiu){
    velocidadexBolinha *= -1;
    
  }
}


function movimentaRaqueteOponente (){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 -30;
  yRaqueteOponente += velocidadeYOponente
}

function incluiPlacar(){
  stroke(255);
  textAlign (CENTER);
  textSize (16);
  fill(color(255,140,0))
  rect(180, 10, 40, 20);
  fill(255);
  text(meusPontos, 200, 26);
  fill(color(255,140,0))
  rect(380, 10, 40, 20);
  fill(255);
  text(pontosOponente, 400,26);
}

function marcarPontos(){
  if (xBolinha > 585){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 15){
    pontosOponente += 1;
    ponto.play();
  }
}




