const PASSWORD = "1308";

const FECHA_INICIO = new Date("2026-01-09T09:00:00-03:00");
const FECHA_ENCUENTRO = new Date("2026-02-22T00:00:00-03:00");

const cartas = [
  "Carta 1\n\nAquí escribes la carta del día."
];

const canciones = [{
  titulo: "Te Amo",
  artista: "Franco De Vita",
  link: "https://open.spotify.com/"
}];

const mensajesVideo = ["Hoy quería decirle…"];

const fotos = [];
for (let i = 1; i <= 50; i++) {
  fotos.push(`imagenes/foto${i}.jpg`);
}
let indice = 0;

function verificarPassword() {
  const input = document.getElementById("inputPassword").value;
  if (input !== PASSWORD) {
    document.getElementById("errorPassword").innerText = "Contraseña incorrecta";
    return;
  }
  document.getElementById("pantallaPassword").style.display = "none";
  document.getElementById("contenidoPrincipal").classList.remove("oculto");
  iniciar();
}

function iniciar() {
  actualizarCarta();
  cargarCancion();
  cargarVideo();
  mostrarFoto();
  actualizarEncuentro();
  setInterval(actualizarCarta, 60000);
  setInterval(actualizarEncuentro, 1000);
}

function actualizarCarta() {
  const diff = FECHA_INICIO - new Date();
  if (diff > 0) {
    document.getElementById("estadoCarta").innerText = "La carta se abre en:";
    document.getElementById("contadorDesbloqueo").innerText =
      Math.floor(diff / 3600000) + "h " +
      Math.floor((diff % 3600000) / 60000) + "m";
  } else {
    document.getElementById("estadoCarta").innerText = "Leer carta 💌";
    document.getElementById("contadorDesbloqueo").innerText = "";
    document.getElementById("bloqueCarta").onclick = () => {
      document.getElementById("seccionCarta").classList.remove("oculto");
      document.getElementById("contenidoCarta").innerText = cartas[0];
    };
  }
}

function cargarCancion() {
  document.getElementById("tituloCancion").innerText = canciones[0].titulo;
  document.getElementById("artistaCancion").innerText = canciones[0].artista;
  document.getElementById("linkCancion").href = canciones[0].link;
}

function cargarVideo() {
  document.getElementById("videoDiario").src = "videos/video1.mp4";
  document.getElementById("textoVideo").innerText = mensajesVideo[0];
}

function mostrarFoto() {
  document.getElementById("imagenCarrusel").src = fotos[indice];
}

function siguiente() {
  indice = (indice + 1) % fotos.length;
  mostrarFoto();
}

function anterior() {
  indice = (indice - 1 + fotos.length) % fotos.length;
  mostrarFoto();
}

function actualizarEncuentro() {
  const diff = FECHA_ENCUENTRO - new Date();
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById("contadorEncuentro").innerText =
    `${d}d ${h}h ${m}m ${s}s`;
}
