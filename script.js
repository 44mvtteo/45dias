const PASSWORD = "1308";

const FECHA_INICIO = new Date("2026-01-09T09:00:00-03:00");
const FECHA_REENCUENTRO = new Date("2026-02-22T00:00:00-03:00");

const cartas = Array.from({ length: 45 }, (_, i) =>
  `Carta del día ${i + 1}.
Aquí escribes el contenido real.`
);

/* DOM */
const inputPassword = document.getElementById("inputPassword");
const pantallaPassword = document.getElementById("pantallaPassword");
const contenidoPrincipal = document.getElementById("contenidoPrincipal");
const errorPassword = document.getElementById("errorPassword");

const bloqueCarta = document.getElementById("bloqueCarta");
const estadoCarta = document.getElementById("estadoCarta");
const contadorDesbloqueo = document.getElementById("contadorDesbloqueo");

const listaCartas = document.getElementById("listaCartas");
const seccionCarta = document.getElementById("seccionCarta");
const numeroDia = document.getElementById("numeroDia");
const contenidoCarta = document.getElementById("contenidoCarta");

const imagenCarrusel = document.getElementById("imagenCarrusel");
const videoDiario = document.getElementById("videoDiario");
const contadorViaje = document.getElementById("contadorViaje");

/* LOGIN */
function verificarPassword() {
  if (inputPassword.value !== PASSWORD) {
    errorPassword.innerText = "Contraseña incorrecta";
    return;
  }
  pantallaPassword.style.display = "none";
  contenidoPrincipal.classList.remove("oculto");
  iniciar();
}

/* INICIO */
function iniciar() {
  construirSelector();
  actualizarCarta();
  setInterval(actualizarCarta, 1000);
  mostrarFoto();
}

/* CARTA */
function actualizarCarta() {
  const ahora = new Date();
  const diff = FECHA_INICIO - ahora;

  if (diff > 0) {
    estadoCarta.innerText = "La carta se abre en:";
    contadorDesbloqueo.innerText =
      Math.floor(diff / 3600000) + "h " +
      Math.floor((diff % 3600000) / 60000) + "m";
  } else {
    estadoCarta.innerText = "Presione para leer la carta 💌";
    contadorDesbloqueo.innerText = "";
  }

  actualizarViaje();
}

/* SELECTOR */
function construirSelector() {
  listaCartas.innerHTML = "";
  for (let i = 0; i < 45; i++) {
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

function abrirCarta(dia) {
  seccionCarta.classList.remove("oculto");
  numeroDia.innerText = `DÍA ${Number(dia) + 1}`;
  contenidoCarta.innerText = cartas[dia];
  videoDiario.src = `videos/video${Number(dia) + 1}.mp4`;
}

/* CONTADOR VIAJE */
function actualizarViaje() {
  const d = FECHA_REENCUENTRO - new Date();
  const s = Math.floor(d / 1000);
  contadorViaje.innerText =
    Math.floor(s / 86400) + "d " +
    Math.floor((s % 86400) / 3600) + "h " +
    Math.floor((s % 3600) / 60) + "m";
}

/* CARRUSEL */
const fotos = ["imagenes/foto1.jpg","imagenes/foto2.jpg","imagenes/foto3.jpg"];
let indice = 0;

function mostrarFoto() {
  imagenCarrusel.src = fotos[indice];
}
function siguiente() {
  indice = (indice + 1) % fotos.length;
  mostrarFoto();
}
function anterior() {
  indice = (indice - 1 + fotos.length) % fotos.length;
  mostrarFoto();
}
