const PASSWORD = "1308";

const FECHA_INICIO = new Date("2026-01-09T09:00:00-03:00");

const cartas = Array.from({ length: 45 }, (_, i) =>
  `Aquí escribes la carta del día ${i + 1}.`
);

// ELEMENTOS
const inputPassword = document.getElementById("inputPassword");
const pantallaPassword = document.getElementById("pantallaPassword");
const contenidoPrincipal = document.getElementById("contenidoPrincipal");
const errorPassword = document.getElementById("errorPassword");

const bloqueCarta = document.getElementById("bloqueCarta");
const estadoCarta = document.getElementById("estadoCarta");
const contadorDesbloqueo = document.getElementById("contadorDesbloqueo");

const seccionCarta = document.getElementById("seccionCarta");
const numeroDia = document.getElementById("numeroDia");
const contenidoCarta = document.getElementById("contenidoCarta");

function verificarPassword() {
  if (inputPassword.value !== PASSWORD) {
    errorPassword.innerText = "Contraseña incorrecta";
    return;
  }
  pantallaPassword.style.display = "none";
  contenidoPrincipal.classList.remove("oculto");
  actualizarCarta();
  setInterval(actualizarCarta, 1000);
}

function actualizarCarta() {
  const ahora = new Date();
  const diff = FECHA_INICIO - ahora;

  if (diff > 0) {
    estadoCarta.innerText = "La carta se abre en:";
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    contadorDesbloqueo.innerText = `${h}h ${m}m`;
    bloqueCarta.onclick = null;
  } else {
    estadoCarta.innerText = "Presione para leer la carta 💌";
    contadorDesbloqueo.innerText = "";
    bloqueCarta.onclick = () => abrirCarta(0);
  }
}

function abrirCarta(dia) {
  seccionCarta.classList.remove("oculto");
  numeroDia.innerText = `DÍA ${dia + 1}`;
  contenidoCarta.innerText = cartas[dia];
}
