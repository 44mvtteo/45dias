const PASSWORD = "1308";

const FECHA_INICIO = new Date("2026-01-09T09:00:00");
const FECHA_ENCUENTRO = new Date("2026-02-22T00:00:00");

function verificarPassword() {
  const input = document.getElementById("inputPassword").value;

  if (input !== PASSWORD) {
    document.getElementById("errorPassword").innerText = "Contraseña incorrecta";
    return;
  }

  document.getElementById("pantallaPassword").style.display = "none";
  document.getElementById("contenido").classList.remove("oculto");

  iniciar();
}

function iniciar() {
  actualizarCarta();
  actualizarEncuentro();
  setInterval(actualizarCarta, 60000);
  setInterval(actualizarEncuentro, 1000);
}

function actualizarCarta() {
  const ahora = new Date();
  const diff = FECHA_INICIO - ahora;

  if (diff > 0) {
    document.getElementById("estadoCarta").innerText = "La carta se abre en:";
    const horas = Math.floor(diff / 3600000);
    const minutos = Math.floor((diff % 3600000) / 60000);
    document.getElementById("contadorCarta").innerText =
      horas + "h " + minutos + "m";
    document.getElementById("textoCarta").innerText = "";
  } else {
    document.getElementById("estadoCarta").innerText = "Carta disponible 💌";
    document.getElementById("contadorCarta").innerText = "";
    document.getElementById("textoCarta").innerText =
      "Aquí escribes la carta del día.";
  }

  // Canción de prueba
  document.getElementById("tituloCancion").innerText =
    "Te Amo – Franco De Vita";
  document.getElementById("linkCancion").href =
    "https://open.spotify.com/";
}

function actualizarEncuentro() {
  const diff = FECHA_ENCUENTRO - new Date();

  if (diff <= 0) {
    document.getElementById("contadorEncuentro").innerText = "Hoy 💞";
    return;
  }

  const dias = Math.floor(diff / 86400000);
  const horas = Math.floor((diff % 86400000) / 3600000);
  const minutos = Math.floor((diff % 3600000) / 60000);
  const segundos = Math.floor((diff % 60000) / 1000);

  document.getElementById("contadorEncuentro").innerText =
    dias + "d " + horas + "h " + minutos + "m " + segundos + "s";
}
