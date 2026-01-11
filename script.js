/*************************************************
 * CONFIGURACIÓN GENERAL
 *************************************************/

const PASSWORD = "1308";

const FECHA_INICIO = new Date("2026-01-09T09:00:00-03:00");
const FECHA_REENCUENTRO = new Date("2026-02-22T00:00:00-03:00");

/*************************************************
 * 📩 CARTAS (AQUÍ ES DONDE ESCRIBES LAS 45 CARTAS)
 *************************************************
 *
 * 👉 IMPORTANTE:
 * - Deben ser EXACTAMENTE 45 textos
 * - El orden importa: índice 0 = día 1
 * - Usa \n para saltos de línea
 *
 * Ejemplo:
 * "Texto línea 1\n\nTexto línea 2"
 *
 *************************************************/
const cartas = [
  `Día 1

Bueno mi amor este es el día uno de 45 días donde mi idea era ponerle la carta en la página y que la viera ahí pero como yo siempre supuse, la página se cayó.

Me encantaría arreglarla pero ya me andan gritoniando para que me apure, lamento mucho que no esté funcionando pero le prometo que cuando llegue a la casa en España arreglaré todo lo posible y subiré cada carta que escribo al momento.

Hoy día es 9 de enero, un día bastante triste para ser verano y estar soleado, aún ni siquiera salgo de mi casa pero cada vez su ausencia pesa más.

Ninguno de los dos contaba con que discutiríamos pero pasó y solo me queda pedirle perdón al igual que usted a mí.

De verdad quiero que lo nuestro funcione, hoy, mañana y por siempre.

La amo mucho mi amor ❤️‍🩹

9 de enero
09:52`,

  `Día 2

Holaa mi vida hoy es el día dos de 45.

Le escribo esto mientras espero bajarme del avión porque ya llegué, siendo las 5:03 de la mañana hora Chile, pero acá en España son las 9 de la mañana.

La extraño muchísimo, no sabe cuánto la he pensado.

Su carta me emocionó mucho y funcionó lo que usted quería: lloré y también viví mi momento de película.

No sabe la falta que me hace pero lo único que quiero es que estemos bien estos 45 días.

La amo mucho amor mío ❤️‍🩹

10 de enero
05:05`,

  `Día 3

Buen día wawita linda, o mejor dicho ya buenas tardes.

Esta carta va con retraso porque tuve que salir y se me fue el tiempo.

Hoy fui a comer a un lugar que se llama La Salá (nombre horrible), comí carne mechada con papas fritas y tomé La Casera de limón.

Ahora estoy en la sala de música cantando horrible mientras usted duerme.

La extraño muchísimo mi amor.

Por siempre ♾️💘

11 de enero
12:59`,

  `Carta día 4.`,
  `Carta día 5.`,
  `Carta día 6.`,
  `Carta día 7.`,
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
 * ABRIR CARTA
 *************************************************/

function abrirCarta(dia) {
  seccionCarta.classList.remove("oculto");
  numeroDia.innerText = `DÍA ${Number(dia) + 1}`;
  contenidoCarta.innerText = cartas[dia];
  videoDiario.src = `videos/video${Number(dia) + 1}.mp4`;
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



