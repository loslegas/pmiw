let pantallaActual = 0;
let imagenes = [];
let juegoIniciado = false;
 
let sonidosPantalla = [];
let sonidoFondo;
let sonidoBotones;
let botonComenzar;
let destinoPendiente = -1;
let momentoCambio = 0;
let esperaComenzar = 3000;
 
let autoF1;
let anchoAuto = 100;
let altoAuto = 200;
let duracionAuto = 300;
let inicioCreditos = 0;
 
let lineasCreditos = [
  { texto: "SENNA",                    tam: 52, yFinal: 80  },
  { texto: "Las 24 horas del Rey",     tam: 26, yFinal: 135 },
  { texto: "Creado por",               tam: 18, yFinal: 205 },
  { texto: "Matías Legarreta",         tam: 28, yFinal: 245 },
  { texto: "Wenceslao Crivos",         tam: 28, yFinal: 285 },
  { texto: "Facultad de Artes - UNLP", tam: 20, yFinal: 350 }
];
 
let pantallas = [
  { texto: "",
    botones: [{ etiqueta: "Comenzar", destino: 1,
      zona: { x: 305, y: 244, w: 190, h: 48 }, visible: false }] },
 
  { texto: "AYRTON: El Día del Gran Premio. El sol apenas asoma en el horizonte. No es solo una carrera; es el examen final a una vida de sacrificio. Ponete el buzo y decidí tu destino.",
    botones: [{ etiqueta: "Comenzar el Día", destino: 2 }] },
 
  { texto: "Son las 6:30 AM. El sonido de los motores de categorías menores ya vibra a lo lejos. Necesitás enfocar tu mente antes de ir al paddock. ¿Cómo iniciás tu mañana?",
    botones: [
      { etiqueta: "Buscar el equilibrio mental y leer la Biblia", destino: 3 },
      { etiqueta: "Ir directo al circuito a analizar datos del tanque de combustible", destino: 4 }
    ] },
 
  { texto: "La espiritualidad te da la calma necesaria. Sentís una paz inmensa, pero el deber llama. Al salir al paddock, te rodea una nube de periodistas hambrientos de polémicas con tu rival.",
    botones: [
      { etiqueta: "Enfrentar a la prensa con declaraciones picantes", destino: 5 },
      { etiqueta: "Ignorarlos y tener una reunión privada con el director del equipo", destino: 6 }
    ] },
 
  { texto: "Llegás al box antes que nadie. Los mecánicos desarman el motor V10. Notás que el reparto de frenos digital falló ayer en los entrenamientos. ¿Dónde ordenás centrar el trabajo?",
    botones: [
      { etiqueta: "Exigir una revisión total del mapa del motor Honda", destino: 7 },
      { etiqueta: "Modificar mecánicamente los discos de freno traseros", destino: 8 }
    ] },
 
  { texto: "Tus palabras encienden los titulares. La presión psicológica sobre tu rival aumenta, pero también sobre vos. Con los nervios de punta, caminás hacia la grilla de partida.",
    botones: [{ etiqueta: "Ir a la Grilla", destino: 9 }] },
 
  { texto: "Te encerrás en el motorhome. Coordinás una estrategia secreta para la largada: no se atacarán en la primera curva para asegurar el 1-2 del equipo. Es hora de saltar a la pista.",
    botones: [{ etiqueta: "Ir a la Pista", destino: 10 }] },
 
  { texto: "Los ingenieros encuentran una anomalía en la inyección de combustible. El motor recupera sus caballos de fuerza óptimos. Estás listo para exprimir la velocidad.",
    botones: [{ etiqueta: "Subir al Monoplaza", destino: 11 }] },
 
  { texto: "El tacto del pedal cambia, ahora se siente más duro y directo. Tendrás que aplicar una fuerza brutal con tu pierna izquierda, pero la frenada será letal.",
    botones: [{ etiqueta: "Subir al Monoplaza", destino: 12 }] },
 
  { texto: "Estás sentado en el auto. El calor del asfalto se siente a través del mono. Tus declaraciones previas te pusieron en la mira de los comisarios deportivos. Bandera verde. ¿Qué hacés al apagarse los semáforos?",
    botones: [
      { etiqueta: "Largada agresiva cruzando el auto para tapar el hueco", destino: 13 },
      { etiqueta: "Largada limpia cuidando la tracción", destino: 14 }
    ] },
 
  { texto: "Calentás los neumáticos haciendo zig-zag. El pacto con tu compañero resuena en tu cabeza, pero ves que él no está respetando la distancia acordada y se te empareja antes de la línea.",
    botones: [
      { etiqueta: "Romper el pacto y atacarlo con todo en la primera curva", destino: 14 },
      { etiqueta: "Respetar la estrategia y esperar el desgaste de neumáticos", destino: 15 }
    ] },
 
  { texto: "Vuelta 45 de 60. El motor reparado vuela en las rectas. Estás alcanzando al líder a un ritmo demoledor de un segundo por vuelta, pero el cielo se empieza a nublar súbitamente.",
    botones: [
      { etiqueta: "Ignorar el cielo y seguir acelerando a fondo con gomas de seco", destino: 15 },
      { etiqueta: "Entrar inmediatamente a boxes previendo el diluvio", destino: 16 }
    ] },
 
  { texto: "Tus piernas y brazos arden por el esfuerzo de la frenada modificada. Tu rival directo estira el frenaje al final de la recta principal, obligándote a decidir en una fracción de segundo.",
    botones: [
      { etiqueta: "Frenar aún más tarde, arriesgando a bloquear los neumáticos", destino: 16 },
      { etiqueta: "Ceder la posición para contraatacar en la siguiente vuelta", destino: 13 }
    ] },
 
  { texto: "Cruzás la línea de meta en primer lugar. Agitás el puño fuera del cockpit mientras sostenés la bandera de Brasil que te alcanzaron los auxiliares. Sos el héroe de todo un pueblo.",
    botones: [
      { etiqueta: "Volver a Empezar", destino: 0 },
      { etiqueta: "Créditos", destino: 17 }
    ] },
 
  { texto: "Terminás segundo tras una batalla feroz y llena de tensiones políticas. En el podio no te mirás con tu compañero de equipo. La prensa se prepara para una guerra que durará toda la temporada.",
    botones: [
      { etiqueta: "Volver a Empezar", destino: 0 },
      { etiqueta: "Créditos", destino: 17 }
    ] },
 
  { texto: "El destino fue esquivo hoy. Una mala decisión bajo la lluvia o la rotura de un componente te obliga a estacionar el auto en la banquina. Te quedás sentado sobre la contención mirando cómo corren los demás.",
    botones: [
      { etiqueta: "Volver a Empezar", destino: 0 },
      { etiqueta: "Créditos", destino: 17 }
    ] },
 
  { texto: "Tu obsesión por los detalles pagó con creces. Una parada de boxes perfecta y un frenaje quirúrgico te dan la victoria más inteligente de tu carrera. El box entero te festeja en andas.",
    botones: [
      { etiqueta: "Volver a Empezar", destino: 0 },
      { etiqueta: "Créditos", destino: 17 }
    ] },
 
  { texto: "",
    botones: [{ etiqueta: "Volver al Inicio", destino: 0 }] }
];
 
function preload() {
 
  for (let i = 0; i <= 17; i++) {
    let numero = nf(i, 2);
    imagenes[i] = loadImage("data/pantalla-" + numero + ".png");
  }
  autoF1 = loadImage("data/auto-f1.png");
 
  for (let i = 0; i <= 16; i++) {
    let numero = nf(i, 2);
    sonidosPantalla[i] = loadSound("data/sonido" + numero + ".mp3");
  }
 
  sonidoFondo = loadSound("data/sonidoFondo.mp3");
  sonidoBotones = loadSound("data/sonidoBotones.mp3");
  botonComenzar = loadSound("data/botonComenzar.mp3");
}
 
function setup() {
  createCanvas(800, 450);
  sonidoFondo.setVolume(0.4);
}
 
function draw() {
  background(0);
 
  if (!juegoIniciado) {
    mostrarPantallaInicial();
    return;
  }
 
  mostrarPantalla(pantallaActual);
  vigilarCambio();
}
 
function mostrarPantallaInicial() {
 
  let opacidad = map(sin(frameCount * 0.05), -1, 1, 80, 255);
  noStroke();
  fill(255, opacidad);
  textAlign(CENTER, CENTER);
  textSize(28);
  text("Clic para empezar", width / 2, height / 2);
}
 
function mostrarPantalla(numero) {
  image(imagenes[numero], 0, 0, width, height);
  mostrarTexto(pantallas[numero].texto);
  if (numero === 17) {
    mostrarCreditos();
  }
  mostrarBotones(numero);
}
 
function mostrarTexto(contenido) {
  if (contenido === "") return;
 
  textSize(16);
  textStyle(BOLD);
  textLeading(21);
  textAlign(LEFT, TOP);
  strokeJoin(ROUND);
 
  stroke(0);
  strokeWeight(4);
  fill(0);
  text(contenido, 20, 320, 760, 70);
 
  noStroke();
  fill(255);
  text(contenido, 20, 320, 760, 70);
 
  textStyle(NORMAL);
}
 
function zonaDelBoton(pantalla, indice) {
  let boton = pantalla.botones[indice];
  if (boton.zona) {
    return boton.zona;
  }
  let cantidad = pantalla.botones.length;
  let ancho = 370;
  let x = 20 + indice * (ancho + 20);
  if (cantidad === 1) {
    ancho = 300;
    x = (width - ancho) / 2;
  }
  return { x: x, y: 395, w: ancho, h: 42 };
}
 
function mouseEnZona(zona) {
  return mouseX > zona.x && mouseX < zona.x + zona.w &&
         mouseY > zona.y && mouseY < zona.y + zona.h;
}
 
function mostrarBotones(numero) {
  let pantalla = pantallas[numero];
  cursor(ARROW);
 
  for (let i = 0; i < pantalla.botones.length; i++) {
    let boton = pantalla.botones[i];
    let zona = zonaDelBoton(pantalla, i);
    let encima = mouseEnZona(zona);
 
    if (encima) {
      cursor(HAND);
    }
    if (boton.visible === false) {
      continue;
    }
 
    stroke(255);
    strokeWeight(2);
    if (encima) {
      fill(200, 30, 30);
    } else {
      fill(30, 30, 30, 220);
    }
    rect(zona.x, zona.y, zona.w, zona.h, 8);
 
    noStroke();
    fill(255);
    textSize(13);
    textAlign(CENTER, CENTER);
    text(boton.etiqueta, zona.x + 8, zona.y, zona.w - 16, zona.h);
  }
}
 
function mousePressed() {
 
  if (!juegoIniciado) {
    juegoIniciado = true;
    userStartAudio();
    reproducirSonidoDePantalla(0);
    return;
  }
 
  if (destinoPendiente !== -1) {
    return;
  }
 
  let pantalla = pantallas[pantallaActual];
  for (let i = 0; i < pantalla.botones.length; i++) {
    let zona = zonaDelBoton(pantalla, i);
    if (mouseEnZona(zona)) {
      sonidoBotones.play();
      if (pantallaActual === 0) {
        detenerSonidos();
        botonComenzar.play();
        destinoPendiente = pantalla.botones[i].destino;
        momentoCambio = millis() + esperaComenzar;
      } else {
        irAPantalla(pantalla.botones[i].destino);
      }
      break;
    }
  }
}
 
function irAPantalla(destino) {
  pantallaActual = destino;
  if (destino === 17) {
    inicioCreditos = frameCount;
  }
  reproducirSonidoDePantalla(destino);
}
 
function detenerSonidos() {
  sonidoFondo.stop();
  for (let i = 0; i < sonidosPantalla.length; i++) {
    sonidosPantalla[i].stop();
  }
}
 
function reproducirSonidoDePantalla(numero) {
  detenerSonidos();
 
  if (numero === 17) {
    sonidoFondo.loop();
  } else {
    sonidosPantalla[numero].play();
  }
}
 
function vigilarCambio() {
  if (destinoPendiente !== -1 && millis() >= momentoCambio) {
    let destino = destinoPendiente;
    destinoPendiente = -1;
    irAPantalla(destino);
  }
}
 
function calcularProgreso(inicio, duracion) {
  return constrain((frameCount - inicio) / duracion, 0, 1);
}
 
function mostrarCreditos() {
 
  noStroke();
  fill(0, 0, 0, 130);
  rect(0, 0, width, height);
 
  let progresoAuto = calcularProgreso(inicioCreditos, duracionAuto);
  let autoY = lerp(-altoAuto, height + altoAuto, progresoAuto);
 
  for (let i = 0; i < lineasCreditos.length; i++) {
    let linea = lineasCreditos[i];
    let colaDelAuto = autoY - altoAuto / 2;
    let opacidad = constrain(map(colaDelAuto, linea.yFinal, linea.yFinal + 50, 0, 255), 0, 255);
    textoConContorno(linea.texto, width / 2, linea.yFinal, linea.tam, opacidad);
  }
 
  dibujarAuto(width / 2, autoY);
}
 
function dibujarAuto(x, y) {
  push();
  imageMode(CENTER);
  noSmooth();
  translate(x, y);
  rotate(PI);
  image(autoF1, 0, 0, anchoAuto, altoAuto);
  pop();
  smooth();
}
 
function textoConContorno(contenido, x, y, tam, opacidad) {
  textSize(tam);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  strokeJoin(ROUND);
 
  stroke(0, opacidad);
  strokeWeight(5);
  fill(0, opacidad);
  text(contenido, x, y);
 
  noStroke();
  fill(255, opacidad);
  text(contenido, x, y);
 
  textStyle(NORMAL);
}