/******************
Code by Guilherme Vieira

Author links:
http://guilhermevieira.info
http://github.com/guilhermesv
******************/

let coisinhas = [];
let texturas = [];
let rastroAtivo = true;
let movimentoAtivo = true;

let angleWorld = 0;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function preload() {
  texturas[0] = loadImage('texturas/Textura-01.png');
  texturas[1] = loadImage('texturas/Textura-02.png');
  texturas[2] = loadImage('texturas/Textura-03.png');
	texturas[3] = loadImage('texturas/Textura-04.png');
	texturas[4] = loadImage('texturas/Textura-05.png');
	texturas[5] = loadImage('texturas/Textura-06.png');
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	
	noStroke();
  for( let i = 0; i < 10; i++ ) {
    let x = random( -width/2, width/2 );
    let y = random( -height/2, height/2 );
    let z = random( -width/2, width/2 );
    let coisinha = new Primitivas (x, y, z);
    coisinhas.push(coisinha);
	}
  background("#1a0633");
}

function draw() {

  rotateY(angleWorld);
	rotateX(angleWorld * 0.5);
	rotateZ(map(mouseX, 0, width, -1, 1));
	ambientLight(255, 255, 255);
  
  for( primitiva of coisinhas ) {
    primitiva.show();
  }
	
	angleWorld += 0.01;
  
}

function keyPressed() {

	for( let i = 0; i < 10; i++ ) {
    let x = random( -width/2, width/2 );
    let y = random( -height/2, height/2 );
    let z = random( -width/2, width/2 );
    let coisinha = new Primitivas (x, y, z);
    coisinhas[i] = coisinha;
	}
	background("#1a0633");
	
}

/* Classe Coisinhas */

let primitivasOpcoes = [
  "box",
  "sphere",
  "cylinder",
  "torus"
]

class Primitivas {
 
  constructor(x, y, z) {
    this.posicao = createVector(x, y, z);
    this.angulo = createVector(random(TWO_PI), random(TWO_PI), random(TWO_PI));
    this.forma = random(primitivasOpcoes);
    this.tamanho = random(40, 200);
    this.textura = random(texturas);
  }

  show() {
		push();

		translate(this.posicao);
    rotateX(this.angulo.x);
    rotateY(this.angulo.y);
		rotateZ(this.angulo.z);
		
    texture(this.textura);
    switch( this.forma ) {
      case "box":
        box( this.tamanho / 2 );
        break;
      case "sphere":
        sphere(this.tamanho * noise(angleWorld), 32, 16);
        break;
      case "cylinder":
        cylinder(30 * noise(angleWorld), this.tamanho * 2, 32);
        break;
      default:
        torus(this.tamanho, 10, 16, 16);
        break;
		}
		pop();
	}

}