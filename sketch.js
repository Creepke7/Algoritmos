let entrada;
let cantidadCortes = 0;

function setup() {
  createCanvas(900, 400);
  angleMode(DEGREES);

  entrada = createInput();
  entrada.position(10, height + 10);
  entrada.size(100);

  let boton = createButton('Cortar');
  boton.position(entrada.x + entrada.width + 10, height + 10);
  boton.mousePressed(actualizarCortes);
}

function draw() {
  background(240);
  
  pizzaConEcuacion(150, height / 2, cantidadCortes);
  pizzaConDDA(450, height / 2, cantidadCortes);
  pizzaConBresenham(750, height / 2, cantidadCortes);

  fill(0);
  noStroke();
  textAlign(CENTER);
  text("Línea con Ecuación", 150, height - 10);
  text("Algoritmo DDA", 450, height - 10);
  text("Algoritmo Bresenham", 750, height - 10);
}

function actualizarCortes() {
  let valor = int(entrada.value());
  if (valor > 0) {
    cantidadCortes = valor;
  }
}

function pizzaConEcuacion(cx, cy, cortes) {
  let radio = 100;
  stroke(0);
  noFill();
  ellipse(cx, cy, radio * 2);

  for (let i = 0; i < cortes; i++) {
    let ang = (360 / cortes) * i;
    let x0 = cx;
    let y0 = cy;
    let x1 = cx + radio * cos(ang);
    let y1 = cy + radio * sin(ang);

    let dx = x1 - x0;
    let dy = y1 - y0;
    let pasos = int(max(abs(dx), abs(dy)));

    for (let j = 0; j <= pasos; j++) {
      let frac = j / pasos;
      let px = x0 + dx * frac;
      let py = y0 + dy * frac;
      point(px, py);
    }
  }
}

function pizzaConDDA(cenX, cenY, divisiones) {
  let r = 100;
  stroke(0);
  noFill();
  ellipse(cenX, cenY, r * 2);

  for (let i = 0; i < divisiones; i++) {
    let angulo = (360 / divisiones) * i;
    let xStart = cenX;
    let yStart = cenY;
    let xEnd = cenX + r * cos(angulo);
    let yEnd = cenY + r * sin(angulo);

    let dx = xEnd - xStart;
    let dy = yEnd - yStart;
    let pasos = int(max(abs(dx), abs(dy)));

    let incX = dx / pasos;
    let incY = dy / pasos;

    let x = xStart;
    let y = yStart;
    for (let j = 0; j <= pasos; j++) {
      point(round(x), round(y));
      x += incX;
      y += incY;
    }
  }
}

function pizzaConBresenham(cenX, cenY, partes) {
  let r = 100;
  stroke(0);
  noFill();
  ellipse(cenX, cenY, r * 2);

  for (let i = 0; i < partes; i++) {
    let angulo = (360 / partes) * i;
    let x0 = int(cenX);
    let y0 = int(cenY);
    let x1 = int(cenX + r * cos(angulo));
    let y1 = int(cenY + r * sin(angulo));

    let dx = abs(x1 - x0);
    let dy = abs(y1 - y0);
    let dirX = x0 < x1 ? 1 : -1;
    let dirY = y0 < y1 ? 1 : -1;
    let err = dx - dy;

    while (true) {
      point(x0, y0);
      if (x0 === x1 && y0 === y1) break;
      let e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x0 += dirX;
      }
      if (e2 < dx) {
        err += dx;
        y0 += dirY;
      }
    }
  }
}
