/******************
Recortes by Guilherme Vieira

Author links:
http://guilhermevieira.info
http://github.com/guilhermesv
******************/

let formaTipologia = [
  "retangularRasgada",
  "irregular"
];

let corFundo = "#1a0633";

let paleta = [
  "#581845",
  "#900C3F", 
  "#C70039", 
  "#FF5733", 
  "#FFC30F"
];

let parallax = 0;


let formas = new Array(10);

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
  rectMode(CENTER);
  ellipseMode(CENTER);
  noStroke();
  background(random(paleta));
  
  resetar();
};

function draw() {
  background(corFundo);

  parallax = map(mouseX, 0, width, -20, 20);

  for(let i = 0; i < formas.length; i++) {
    push();
    formas[i].mover();
    formas[i].desenhar();
    pop();
  }
  // if(frameCount % 200 == 0) {
  //   resetar();
  // }
};

function resetar() {
  for(let i = 0; i < formas.length; i++) {
    formas[i] = new Forma(
      random(width),
      random(height),
      random(formaTipologia),
      random(paleta)
    )
  }
}

class Forma {

  constructor(x, y, tipologia, cor) {
    this.x = x;
    this.y = y;
    this.largura = random(50, width/2);
    this.altura = random(50, height/2);
    this.cor = cor;
    this.tipologia = tipologia;
    this.angulo = random(TWO_PI);
    this.rotacaoVelocidade = random(-0.01, 0.01);
    this.posicaoVelocidade = random(-10, 10);
    this.parallaxVelocidade = random(-10, 10);
    this.semente = random(1000);
  }

  desenhar() {

    randomSeed(this.semente);
    noiseSeed(this.semente);

    fill(this.cor);
 
    switch (this.tipologia) {

      case "retangularRasgada":
        let x = -this.largura/2;
        let y = -this.altura/2;
        let largura = this.largura;
        let altura = this.altura;
        let corteDetalhe = 10;
        beginShape();
        vertex(x + this.largura, y + this.altura);
        vertex(x + this.largura, y);
        let corteInclinacao = 0;
        let corteInclinacaoIncremento = random(-5, 5);
        for (let i = 0; i < this.altura; i += corteDetalhe) {
          vertex(x + corteInclinacao + (noise(i) * 5), y + i);
          corteInclinacao += corteInclinacaoIncremento;
        };
        endShape(CLOSE);
        break;

      case "irregular":
        let raioVariacao = 1;
        let raioMinimo = random(this.largura / 2);
        let raioMaximo = random(raioMinimo, this.largura);  
        beginShape();
        for (let angulo = 0; angulo < TWO_PI; angulo += radians(5)) {
          let xDeslocamento = map(cos(angulo), -1, 1, 0, raioVariacao);
          let yDeslocamento = map(sin(angulo), -1, 1, 0, raioVariacao);
          let raio = map(noise(xDeslocamento, yDeslocamento), 0, 1, raioMinimo, raioMaximo);
          let x = raio * cos(angulo);
          let y = raio * sin(angulo);
          vertex(x, y);
        }
        endShape(CLOSE);
        break;
    }
  }

  mover() {
    this.x = this.x  + sin(this.angulo);
    this.y = this.y  + cos(this.angulo);
    translate(this.x + (parallax * this.parallaxVelocidade), this.y);
    this.angulo = this.angulo  + this.rotacaoVelocidade;
    rotate(this.angulo);
  }
}