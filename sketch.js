let idleFrames = [];
let walkFrames = [];
let walkIndex = 0;
let walkSpeed = 10;
let currentState = "idle";
let stateStartFrame = 0;
let moveSpeed = 4;
let facing = 1;
let bgOffsetMontañas = 0;
let bgOffsetNubes = 0;
let marioScale = 4;
let jumpFrames = [];
let marioVelY = 0;
let isJumping = false;
let groundY = 469;
let marioX = 100;
let marioY = groundY;      
let gravedad = 0.8;
let fuerzaSalto = -15;
let blockX = 400;
let blockY = 300;
let blockSize = 50;
let blockGolpeado = false;
let mostrarTitulo = false;
let tituloY = -100;
let blockFrames = [];




function preload() {
  blockFrames[0] = loadImage('assets/block1.png');
  jumpFrames[0] = loadImage('assets/jump1.png');
  idleFrames[0] = loadImage('assets/idle1.png');

  for (let i = 1; i <= 3; i++) {
    walkFrames[i - 1] = loadImage('assets/walk' + i + '.png');
  }
}

function setup() {
  createCanvas(800, 600);
  imageMode(CENTER);
  noSmooth();
}

function draw() {
  background(135, 206, 235);

  dibujarCapa(0, 320, function(x) {
  fill(100, 130, 100);
  noStroke();
  triangle(x, 500, x + 160, 280, x + 320, 500);
});

  dibujarCapa(0, 260, function(x) {
  fill(255);
  noStroke();
  ellipse(x, 100, 90, 40);
  ellipse(x + 40, 85, 70, 35);
  ellipse(x - 30, 90, 60, 30);
});

  dibujarBloque(blockX, blockY); 

  fill(34, 139, 34);
  noStroke();
  rect(0, 500, width, 100);

  let isMoving = false;

  if (keyIsDown(LEFT_ARROW)) {
    marioX -= moveSpeed;
    facing = -1;
    isMoving = true;
  } else if (keyIsDown(RIGHT_ARROW)) {
    marioX += moveSpeed;
    facing = 1;
    isMoving = true;
  }

  marioX = constrain(marioX, 30, width - 30);

  marioVelY += gravedad;
  marioY += marioVelY;

  if (marioY >= groundY) {
    marioY = groundY;
    marioVelY = 0;
    isJumping = false;
  }


  if (!blockGolpeado && marioTocaBloque()) {
    blockGolpeado = true;
    mostrarTitulo = true;
  }

  let nuevoEstado = isMoving ? "walk" : "idle";
  if (nuevoEstado !== currentState) {
    currentState = nuevoEstado;
    stateStartFrame = frameCount;
  }

  if (isJumping) {
    reproducirAnimacion(jumpFrames, 30, marioX, marioY, facing);
  } else if (currentState === "idle") {
    reproducirAnimacion(idleFrames, 30, marioX, marioY, facing);
  } else {
    reproducirAnimacion(walkFrames, walkSpeed, marioX, marioY, facing);
  }


  if (mostrarTitulo) {
    tituloY = lerp(tituloY, 80, 0.05);
    fill(255);
    stroke(0);
    strokeWeight(4);
    textAlign(CENTER, CENTER);
    textSize(48);
    text("SUPER MARIO BROS", width / 2, tituloY);
  }
}

function calcularIndice(cantidadFrames, velocidad, inicio) {
  let tiempoTranscurrido = frameCount - inicio;
  let indice = floor(tiempoTranscurrido / velocidad) % cantidadFrames;
  return indice;
}

function reproducirAnimacion(frames, velocidad, x, y, facing) {
  let indice = calcularIndice(frames.length, velocidad, stateStartFrame);
  push();
  translate(x, y);
  scale(facing * marioScale, marioScale);
  image(frames[indice], 0, 0);
  pop();
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    reiniciarTodo();
  }
  if (key === ' ' && !isJumping) {
    marioVelY = fuerzaSalto;
    isJumping = true;
  }
}

function dibujarCapa(offset, espaciado, formaFn) {
  for (let x = -espaciado; x < width + espaciado; x += espaciado) {
    let posX = ((x + offset) % (width + espaciado) + (width + espaciado)) % (width + espaciado) - espaciado;
    formaFn(posX);
  }
}

function dibujarBloque(x, y) {
  reproducirAnimacion(blockFrames, 30, x, y, 1);
}

function marioTocaBloque() {
  let d = dist(marioX, marioY, blockX, blockY);
  return d < blockSize;
}

function reiniciarTodo() {
  marioX = 100;
  marioY = groundY;
  marioVelY = 0;
  isJumping = false;
  facing = 1;

  currentState = "idle";
  stateStartFrame = frameCount;

  blockGolpeado = false;
  mostrarTitulo = false;
  tituloY = -100;

  bgOffsetNubes = 0;
}