const PASSWORD = "1308";

// Fechas
const FECHA_INICIO = new Date("2026-01-09T09:00:00-03:00");
const FECHA_ENCUENTRO = new Date("2026-02-22T00:00:00-03:00");

// Cartas
const cartas = Array.from({ length: 45 }, (_, i) =>
  `Carta ${i + 1}\n\nAquí escribes la carta del día.`
);

// Canciones
const canciones = Array.from({ length: 45 }, () => ({
  titulo: "Canción del día",
  artista: "Artista",
  link: "https://open.spotify.com/"
}));

// Mensajes video
const mensajesVideo = Array.from({ length: 45 }, () =>
  "Hoy quería decirle…"
);

// Fotos
const fotos = [];
for (let i = 1; i <= 50; i++) {
  fotos.push(`imagenes/foto${i}.jpg`);
}
let indice = 0;

/* PASSWORD */
function verificarPassword() {
  const input = document.getElementById("inputPassword");
  const error = document.getElementById("errorPassword");

  if (input.value !== PASSWORD) {
    error.innerText = "Contraseña incorrecta";
    return;
  }

  document.getElementById("pantallaPassword").style.display = "none";
  document.getElementById("contenidoPrincipal").classList.remove("oculto");

  iniciar();
}

/* INICIO */
function iniciar() {
  actualizarEncuentro();
  actualizarEstadoCarta();
  construirSelector();
  cargarCancionDelDia();
  cargarVideoDelDia();
  mostrarFoto();

  setInterval(actualizarEncuentro, 60000);
  setInterval(actualizarEstadoCarta, 60000);
}

/* CONTADOR ENCUENTRO */
function actualizarEncuentro() {
  const diff = FECHA_ENCUENTRO - new Date();
  const dias = Math.max(0, Math.floor(diff / 86400000));
  document.getElementById("contadorEncuentroIzq").innerText = dias;
  document.getElementById("contadorEncuentroDer").innerText = dias;
}

/* BOTÓN PRINCIPAL */
function actualizarEstadoCarta() {
  const ahora = new Date();
  const diff = FECHA_INICIO - ahora;

  const estado = document.getElementById("estadoCarta");
  const contador = document.getElementById("contadorDesbloqueo");
  const boton = document.getElementById("bloqueCarta");

  if (diff > 0) {
    estado.innerText = "La carta se abre en:";
    contador.innerText =
      Math.floor(diff / 3600000) + "h " +
      Math.floor((diff % 3600000) / 60000) + "m";
    boton.onclick = null;
    return;
  }

  estado.innerText = "Presione para leer la carta 💌";
  contador.innerText = "";
  boton.onclick = () => abrirCarta(0);
}

/* SELECTOR */
function construirSelector() {
  const lista = document.getElementById("listaCartas");
  lista.innerHTML = "";

  const hoy = new Date();

  for (let i = 0; i < 45; i++) {
    const f = new Date(FECHA_INICIO);
    f.setDate(FECHA_INICIO.getDate() + i);

    const opt = document.createElement("option");
    opt.value = i;
    opt.text = hoy >= f ? `Carta ${i + 1}` : `🔒 Carta ${i + 1}`;
    opt.disabled = hoy < f;

    lista.appendChild(opt);
  }

  lista.onchange = () => abrirCarta(lista.value);
}

/* ABRIR CARTA */
function abrirCarta(dia) {
  document.getElementById("seccionCarta").classList.remove("oculto");
  document.getElementById("contenidoCarta").innerText = cartas[dia];
}

/* CANCIÓN */
function cargarCancionDelDia() {
  const dia = Math.max(
    0,
    Math.floor((new Date() - FECHA_INICIO) / 86400000)
  );

  document.getElementById("tituloCancion").innerText = canciones[dia].titulo;
  document.getElementById("artistaCancion").innerText = canciones[dia].artista;
  document.getElementById("linkCancion").href = canciones[dia].link;
}

/* VIDEO */
function cargarVideoDelDia() {
  const dia = Math.max(
    0,
    Math.floor((new Date() - FECHA_INICIO) / 86400000)
  );

  document.getElementById("videoDiario").src = `videos/video${dia + 1}.mp4`;
  document.getElementById("textoVideo").innerText = mensajesVideo[dia];
}

/* CARRUSEL */
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
