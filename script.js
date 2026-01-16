/*************************************************
 * CONFIGURACIÓN GENERAL
 *************************************************/

const PASSWORD = "1308";

const FECHA_INICIO = new Date("2026-01-09T09:00:00-03:00");
const FECHA_REENCUENTRO = new Date("2026-02-22T00:00:00-03:00");

/*************************************************
 * 📩 CARTAS (AQUÍ ES DONDE ESCRIBES LAS 45 CARTAS)
 *************************************************/
const cartas = [
  `Dia 1
Bueno mi amor...`, // tus cartas siguen igual
  `Dia 2
Holaa mi vida...`,
  `DIA 3
Buen dia...`,
  `Dia 4
Buen dia amorcito mio...`,
  `Dia 5
Pensó que no habria carta hoy...`,
  `Dia 6
Holaa mi amor hoy es el dia 6...`,
  `Dia 7
Buenos días mi amor hoy es el dia 7...`,
  `Carta día 8.`,
  `Carta día 9.`,
  `Carta día 10.`,
  `Carta día 11.`,
  `Carta día 12.`,
  `Carta día 13.`,
  `Carta día 14.`,
  `Carta día 15.`,
  `Carta día 16.`,
  `Carta día 17.`,
  `Carta día 18.`,
  `Carta día 19.`,
  `Carta día 20.`,
  `Carta día 21.`,
  `Carta día 22.`,
  `Carta día 23.`,
  `Carta día 24.`,
  `Carta día 25.`,
  `Carta día 26.`,
  `Carta día 27.`,
  `Carta día 28.`,
  `Carta día 29.`,
  `Carta día 30.`,
  `Carta día 31.`,
  `Carta día 32.`,
  `Carta día 33.`,
  `Carta día 34.`,
  `Carta día 35.`,
  `Carta día 36.`,
  `Carta día 37.`,
  `Carta día 38.`,
  `Carta día 39.`,
  `Carta día 40.`,
  `Carta día 41.`,
  `Carta día 42.`,
  `Carta día 43.`,
  `Carta día 44.`,
  `Carta día 45. Este es el cierre del viaje.`
];

/*************************************************
 * DOM
 *************************************************/

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

/*************************************************
 * UTILIDAD: DÍA ACTUAL (0 a 44)
 *************************************************/

function obtenerDiaActual() {
  const diff = new Date() - FECHA_INICIO;
  const dia = Math.floor(diff / 86400000);
  return Math.min(Math.max(dia, 0), 44);
}

/*************************************************
 * LOGIN
 *************************************************/

function verificarPassword() {
  if (inputPassword.value !== PASSWORD) {
    errorPassword.innerText = "Contraseña incorrecta";
    return;
  }
  pantallaPassword.style.display = "none";
  contenidoPrincipal.classList.remove("oculto");
  iniciar();
}

/*************************************************
 * INICIO
 *************************************************/

function iniciar() {
  construirSelector();
  actualizarCarta();
  setInterval(actualizarCarta, 1000);
  mostrarFoto();
}

/*************************************************
 * CARTA DEL DÍA
 *************************************************/

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
    bloqueCarta.onclick = () => abrirCarta(obtenerDiaActual());
  }

  actualizarViaje();
}

/*************************************************
 * SELECTOR DE CARTAS
 *************************************************/

function construirSelector() {
  listaCartas.innerHTML = "";
  const hoy = obtenerDiaActual();

  for (let i = 0; i < 45; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.text = i <= hoy ? `Carta ${i + 1}` : `🔒 Carta ${i + 1}`;
    opt.disabled = i > hoy;
    listaCartas.appendChild(opt);
  }

  listaCartas.onchange = () => abrirCarta(listaCartas.value);
}

/*************************************************
 * ABRIR CARTA (PARCHE DE SEGURIDAD)
 *************************************************/

function abrirCarta(dia) {
  seccionCarta.classList.remove("oculto");
  numeroDia.innerText = `DÍA ${Number(dia) + 1}`;

  // ✅ Solo mostrar si la carta existe
  if (cartas[dia]) {
    contenidoCarta.innerText = cartas[dia];
  } else {
    contenidoCarta.innerText = "Esta carta aún no está disponible.";
  }

  // ✅ Solo cambiar video si existe
  const videoPath = `videos/video${Number(dia) + 1}.mp4`;
  fetch(videoPath, { method: 'HEAD' })
    .then(res => {
      if (res.ok) videoDiario.src = videoPath;
      else videoDiario.src = ""; // o video por defecto
    })
    .catch(() => videoDiario.src = "");
}

/*************************************************
 * CONTADOR REENCUENTRO
 *************************************************/

function actualizarViaje() {
  const s = Math.floor((FECHA_REENCUENTRO - new Date()) / 1000);

  const dias = Math.floor(s / 86400);
  const horas = Math.floor((s % 86400) / 3600);
  const minutos = Math.floor((s % 3600) / 60);
  const segundos = s % 60;

  contadorViaje.innerText =
    `${dias}d ${horas}h ${minutos}m ${segundos}s`;
}

/*************************************************
 * CARRUSEL
 *************************************************/

const fotos = [
  "imagenes/foto1.jpg",
  "imagenes/foto2.jpg",
  "imagenes/foto3.jpg"
];

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