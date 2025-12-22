const PASSWORD = "1308";

const FECHA_INICIO = new Date("2026-01-09T09:00:00-03:00");
const FECHA_ENCUENTRO = new Date("2026-02-22T00:00:00-03:00");

const cartas = Array.from({ length: 45 }, (_, i) =>
  `Carta ${i + 1}\n\nAquí escribes la carta del día.`
);

const canciones = Array.from({ length: 45 }, () => ({
  titulo: "Canción del día",
  artista: "Artista",
  link: "https://open.spotify.com/"
}));

const mensajesVideo = Array.from({ length: 45 }, () =>
  "Hoy quería decirle…"
);

const fotos = [];
for (let i = 1; i <= 50; i++) fotos.push(`imagenes/foto${i}.jpg`);
let indice = 0;

const mensajesEspeciales = {
  "2026-01-13": "Hoy no es solo una carta… es un día especial 🤍",
  "2026-02-13": "Falta poco… y mi corazón ya está contigo 💌",
  "2026-02-14": "Feliz día del amor. Siempre usted 💖"
};

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
  actualizarEncuentro();
  actualizarEstadoCarta();
  construirSelector();
  cargarCancion();
  cargarVideo();
  mostrarFoto();
  mensajeEspecial();
  modoNoche();
  setInterval(actualizarEncuentro, 60000);
  setInterval(actualizarEstadoCarta, 60000);
}

/* CONTADORES */
function actualizarEncuentro() {
  const dias = Math.max(0, Math.floor((FECHA_ENCUENTRO - new Date()) / 86400000));
  contadorEncuentroIzq.innerText = dias;
  contadorEncuentroDer.innerText = dias;
}

/* BOTÓN CARTA */
function actualizarEstadoCarta() {
  const diff = FECHA_INICIO - new Date();
  if (diff > 0) {
    estadoCarta.innerText = "La carta se abre en:";
    contadorDesbloqueo.innerText = `${Math.floor(diff / 3600000)}h`;
    bloqueCarta.onclick = null;
  } else {
    estadoCarta.innerText = "Presione para leer la carta 💌";
    contadorDesbloqueo.innerText = "";
    bloqueCarta.onclick = () => abrirCarta(0);
  }
}

/* SELECTOR */
function construirSelector() {
  listaCartas.innerHTML = "";
  for (let i = 0; i < 45; i++) {
    const f = new Date(FECHA_INICIO);
    f.setDate(FECHA_INICIO.getDate() + i);
    const opt = document.createElement("option");
    opt.text = new Date() >= f ? `Carta ${i + 1}` : `🔒 Carta ${i + 1}`;
    opt.disabled = new Date() < f;
    opt.value = i;
    listaCartas.appendChild(opt);
  }
  listaCartas.onchange = () => abrirCarta(listaCartas.value);
}

/* CARTA */
function abrirCarta(dia) {
  seccionCarta.classList.remove("oculto");
  contenidoCarta.innerText = cartas[dia];
  document.querySelector(".sobre").classList.add("abierta");
}

/* CANCIÓN */
function cargarCancion() {
  const d = Math.max(0, Math.floor((new Date() - FECHA_INICIO) / 86400000));
  tituloCancion.innerText = canciones[d].titulo;
  artistaCancion.innerText = canciones[d].artista;
  linkCancion.href = canciones[d].link;
}

/* VIDEO */
function cargarVideo() {
  const d = Math.max(0, Math.floor((new Date() - FECHA_INICIO) / 86400000));
  videoDiario.src = `videos/video${d + 1}.mp4`;
  textoVideo.innerText = mensajesVideo[d];
}

/* MENSAJE ESPECIAL */
function mensajeEspecial() {
  const hoy = new Date().toISOString().split("T")[0];
  if (mensajesEspeciales[hoy]) {
    mensajeEspecial.classList.remove("oculto");
    textoMensajeEspecial.innerText = mensajesEspeciales[hoy];
  }
}

/* MODO NOCHE */
function modoNoche() {
  const h = new Date().getHours();
  if (h >= 21 || h <= 7) document.body.classList.add("noche");
}

/* CARRUSEL */
function mostrarFoto() { imagenCarrusel.src = fotos[indice]; }
function siguiente() { indice = (indice + 1) % fotos.length; mostrarFoto(); }
function anterior() { indice = (indice - 1 + fotos.length) % fotos.length; mostrarFoto(); }

/* MENSAJE SECRETO */
let clicks = 0;
tituloSecreto.onclick = () => {
  clicks++;
  if (clicks === 5) alert("Siempre usted 🤍");
};
