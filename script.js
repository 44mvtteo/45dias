const PASSWORD = "1308";

const FECHA_INICIO = new Date("2026-01-09T09:00:00-03:00");
const FECHA_ENCUENTRO = new Date("2026-02-22T00:00:00-03:00");

// CARTAS
const cartas = Array.from({ length: 45 }, (_, i) =>
  `Carta ${i + 1}\n\nAquí escribes la carta del día.`
);

// CANCIÓN (ejemplo real)
const canciones = [
  {
    titulo: "Te Amo",
    artista: "Franco De Vita",
    link: "https://open.spotify.com/track/5OcnF9C1E5d6R2R8Zt0E8L",
    cover: "https://i.scdn.co/image/ab67616d0000b273b6e1b7a1a1cfe9a7a1f5c9a5"
  }
];

// FOTOS
const fotos = [];
for (let i = 1; i <= 50; i++) fotos.push(`imagenes/foto${i}.jpg`);
let indice = 0;

/* PASSWORD */
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
  actualizarCarta();
  cargarCancion();
  mostrarFoto();
  cargarVideo();
  actualizarContador();
  setInterval(actualizarContador, 1000);
}

/* CARTA */
function actualizarCarta() {
  const diff = FECHA_INICIO - new Date();
  if (diff > 0) {
    estadoCarta.innerText = "La carta se abre en:";
    contadorDesbloqueo.innerText =
      Math.floor(diff / 3600000) + "h " +
      Math.floor((diff % 3600000) / 60000) + "m";
    bloqueCarta.onclick = null;
  } else {
    estadoCarta.innerText = "Abrir carta 💌";
    contadorDesbloqueo.innerText = "";
    bloqueCarta.onclick = () => {
      seccionCarta.classList.remove("oculto");
      contenidoCarta.innerText = cartas[0];
    };
  }
}

/* CANCIÓN */
function cargarCancion() {
  const c = canciones[0];
  tituloCancion.innerText = c.titulo;
  artistaCancion.innerText = c.artista;
  linkCancion.href = c.link;
  coverSpotify.src = c.cover;
}

/* GALERÍA */
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

/* VIDEO */
function cargarVideo() {
  textoVideo.innerText = "Hoy quería decirle…";
  videoDiario.src = "videos/video1.mp4";
}

/* CONTADOR */
function actualizarContador() {
  const d = FECHA_ENCUENTRO - new Date();
  const dias = Math.floor(d / 86400000);
  const horas = Math.floor((d % 86400000) / 3600000);
  const min = Math.floor((d % 3600000) / 60000);
  const sec = Math.floor((d % 60000) / 1000);
  contadorEncuentro.innerText = `${dias}d ${horas}h ${min}m ${sec}s`;
}
