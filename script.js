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
  `Dia 1
Bueno mi amor este es el dia uno de 45 dias donde mi idea era ponerle la carta en la pagina y que la viera ahi pero como yo siempre supuse, la pagina se cayó. Me encantaria arreglarla pero ya me andan gritoniando para que me apure, lamento mucho que no este funcionando pero le prometo que cuando llegue a la casa en españa arreglaré todo lo posible y subiré cada carta que escribo al momento. Hoy dia es 9 de enero, un dia bastante triste para ser verano y estan soleado, aun nisiquiera salgo de mi casa pero cada vez su ausencia pesa mas. Ninguno de los dos contaba con que discutiriamos pero paso y solo me queda pedirle perdon al igual que usted a mi. No tienen que ser asi las cosas, podemos estar bien, felices, amorosos, incluso si no nos podemos ver. 
De verdad quiero que lo nuestro funcione, hoy, mañana y por siempre. La amo mucho mi amor espero que hoy sea un buen día en lo que se pueda y recuerde que en todo momento estaré pensandola. La amo muchísimo mi amor❤️‍🩹.

9 de enero
09:52
`,

  `Dia 2
Holaa mi vida hoy es el dia dos de 45, lee escribo esto mientras espero a bajarme del avión porque ya llegue siendo las 5:03 de la mañana hora chile peroo aca en españa son las 9 de la mañana. La extraño muchísimo no sabe cuanto la he pensado. Su carta me emociono mucho y funcionó lo que usted queria, llore y también vivi mi momento de película. No sabe la falta que me hace pero lo único que quiero es que estemos bien estos 45 dias. Lamentablemente no tengo como darle mantenimiento a la página asi que espero que cuando llegue a la casa encuentre la solución, ahora me esperan 5 horas de viaje en auto hacia sevilla y bueno quizas cuando usted lea esto yo ya estaré llegando. La amo mucho amor mio espero que este bien y espero que estemos bien, y tambien espero que me haya hablado mucho porque o si no me voy a enojarrr jejeje. La amo mucho mi amorcito 
Por siempre❤️‍🩹

10 de enero
05:05`,

  `DIA 3
Buen dia wawita linda o mejor dicho ya buenas tardes, esta carta va con retraso porque como tuve que salir se me fue el tiempo de las horas y como ya sabe no he podido arreglar la pagina pero creo que fue un error temporal. Hoy fui a comer a un lugar que se llama La salá pero no sala de estar salá de sal o salada KSKSKSKS nombres de mierdaa, y comi carne mechada con salsa de tomate y papas fritas y tome La casera de limón que es como la limón soda pero de españa. Ahora me encuentro en la sala de musica de mi prima cantando como si fuera experto mientras usted está tutito en la casa de esa weona. La extraño mucho amorcito mio ya quiero que llegue a su casita y podamos hacer llamada tranquilitosss jejeje. No sabe la falta que me hace y lo mucho que me gustaría que estuviera aqui conmigo mi amor. Eso pue espero que la haya pasado bien y que la siga pasando bien alla yo seguiré escuchando a mi prima tocar porque me duele la garganta de lo mal que canto, la amo mucho amorcito mio, por siempre♾️💘

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




