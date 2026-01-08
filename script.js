const PASSWORD = "1308";

const FECHA_INICIO = new Date("2026-01-09T09:00:00-03:00");

const cartas = [
  ["Aquí escribes la carta del día 1"],
  ["Aquí escribes la carta del día 2"],
  ["Aquí escribes la carta del día 3"],
  ["Aquí escribes la carta del día 4"],
  ["Aquí escribes la carta del día 5"],
  ["Aquí escribes la carta del día 6"],
  ["Aquí escribes la carta del día 7"],
  ["Aquí escribes la carta del día 8"],
  ["Aquí escribes la carta del día 9"],
  ["Aquí escribes la carta del día 10"],
  ["Aquí escribes la carta del día 11"],
  ["Aquí escribes la carta del día 12"],
  ["Aquí escribes la carta del día 13"],
  ["Aquí escribes la carta del día 14"],
  ["Aquí escribes la carta del día 15"],
  ["Aquí escribes la carta del día 16"],
  ["Aquí escribes la carta del día 17"],
  ["Aquí escribes la carta del día 18"],
  ["Aquí escribes la carta del día 19"],
  ["Aquí escribes la carta del día 20"],
  ["Aquí escribes la carta del día 21"],
  ["Aquí escribes la carta del día 22"],
  ["Aquí escribes la carta del día 23"],
  ["Aquí escribes la carta del día 24"],
  ["Aquí escribes la carta del día 25"],
  ["Aquí escribes la carta del día 26"],
  ["Aquí escribes la carta del día 27"],
  ["Aquí escribes la carta del día 28"],
  ["Aquí escribes la carta del día 29"],
  ["Aquí escribes la carta del día 30"],
  ["Aquí escribes la carta del día 31"],
  ["Aquí escribes la carta del día 32"],
  ["Aquí escribes la carta del día 33"],
  ["Aquí escribes la carta del día 34"],
  ["Aquí escribes la carta del día 35"],
  ["Aquí escribes la carta del día 36"],
  ["Aquí escribes la carta del día 37"],
  ["Aquí escribes la carta del día 38"],
  ["Aquí escribes la carta del día 39"],
  ["Aquí escribes la carta del día 40"],
  ["Aquí escribes la carta del día 41"],
  ["Aquí escribes la carta del día 42"],
  ["Aquí escribes la carta del día 43"],
  ["Aquí escribes la carta del día 44"],
  ["Aquí escribes la carta del día 45"]
];

function verificarPassword() {
  if (inputPassword.value !== PASSWORD) {
    errorPassword.innerText = "Contraseña incorrecta";
    return;
  }
  pantallaPassword.style.display = "none";
  contenidoPrincipal.classList.remove("oculto");
  iniciar();
}

function iniciar() {
  actualizarCarta();
  construirSelector();
}

function actualizarCarta() {
  const diff = FECHA_INICIO - new Date();
  if (diff > 0) {
    estadoCarta.innerText = "La carta se abre en:";
    contadorDesbloqueo.innerText =
      Math.floor(diff / 3600000) + "h " +
      Math.floor((diff % 3600000) / 60000) + "m";
    bloqueCarta.onclick = null;
  } else {
    estadoCarta.innerText = "Presione para leer la carta 💌";
    contadorDesbloqueo.innerText = "";
    bloqueCarta.onclick = () => abrirCarta(diaActual());
  }
}

function diaActual() {
  return Math.floor((new Date() - FECHA_INICIO) / 86400000);
}

function abrirCarta(dia) {
  seccionCarta.classList.remove("oculto");
  contenidoCarta.innerHTML = "";

  cartas[dia].forEach((texto, i) => {
    const hoja = document.createElement("div");
    hoja.className = "carta";

    const diaLabel = document.createElement("div");
    diaLabel.className = "numero-dia";
    diaLabel.innerText = `DÍA ${dia + 1}`;

    const p = document.createElement("p");
    p.innerText = texto;

    hoja.appendChild(diaLabel);
    hoja.appendChild(p);
    contenidoCarta.appendChild(hoja);
  });
}

function construirSelector() {
  listaCartas.innerHTML = "";
  for (let i = 0; i < cartas.length; i++) {
    const f = new Date(FECHA_INICIO);
    f.setDate(f.getDate() + i);
    const opt = document.createElement("option");
    opt.value = i;
    opt.text = new Date() >= f ? `Carta ${i + 1}` : `🔒 Carta ${i + 1}`;
    opt.disabled = new Date() < f;
    listaCartas.appendChild(opt);
  }
  listaCartas.onchange = () => abrirCarta(listaCartas.value);
}
