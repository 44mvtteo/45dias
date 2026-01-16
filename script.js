document.addEventListener("DOMContentLoaded", () => {

  const PASSWORD = "1308";
  const FECHA_INICIO = new Date("2026-01-09T09:00:00-03:00");
  const FECHA_REENCUENTRO = new Date("2026-02-22T00:00:00-03:00");

  const cartas = Array.from({ length: 45 }, (_, i) =>
    `Día ${i + 1}\n\n(Este es el contenido real de tu carta ${i + 1})`
  );

  const fotos = [
    "imagenes/foto1.jpg",
    "imagenes/foto2.jpg",
    "imagenes/foto3.jpg"
  ];

  let indiceFoto = 0;

  // DOM
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

  const contadorViaje = document.getElementById("contadorViaje");
  const imagenCarrusel = document.getElementById("imagenCarrusel");

  // ===== LOGIN =====
  document.getElementById("btnEntrar").addEventListener("click", () => {
    if (inputPassword.value !== PASSWORD) {
      errorPassword.innerText = "Contraseña incorrecta";
      return;
    }
    pantallaPassword.style.display = "none";
    contenidoPrincipal.classList.remove("oculto");
    iniciar();
  });

  function iniciar() {
    construirSelector();
    actualizarEstadoCarta();
    actualizarViaje();
    setInterval(actualizarEstadoCarta, 1000);
    setInterval(actualizarViaje, 1000);
    mostrarFoto();
  }

  function obtenerDiaActual() {
    const ahora = new Date();
    const diff = ahora - FECHA_INICIO;
    if (diff < 0) return -1;
    return Math.min(Math.floor(diff / 86400000), cartas.length - 1);
  }

  function actualizarEstadoCarta() {
    const hoy = obtenerDiaActual();

    if (hoy < 0) {
      const restante = FECHA_INICIO - new Date();
      estadoCarta.innerText = "La primera carta se abre en:";
      contadorDesbloqueo.innerText = formatoTiempo(restante);
      bloqueCarta.onclick = null;
    } else {
      estadoCarta.innerText = "Presione para leer la carta de hoy 💌";
      contadorDesbloqueo.innerText = "";
      bloqueCarta.onclick = () => abrirCarta(hoy);
    }

    construirSelector();
  }

  function construirSelector() {
    const hoy = obtenerDiaActual();
    listaCartas.innerHTML = "";

    cartas.forEach((_, i) => {
      const opt = document.createElement("option");
      opt.value = i;
      opt.text = i <= hoy ? `Carta ${i + 1}` : `🔒 Carta ${i + 1}`;
      opt.disabled = i > hoy;
      listaCartas.appendChild(opt);
    });

    listaCartas.onchange = () => abrirCarta(listaCartas.value);
  }

  function abrirCarta(dia) {
    seccionCarta.classList.remove("oculto");
    numeroDia.innerText = `DÍA ${Number(dia) + 1}`;
    contenidoCarta.innerText = cartas[dia];
  }

  function actualizarViaje() {
    let restante = FECHA_REENCUENTRO - new Date();
    if (restante < 0) restante = 0;
    contadorViaje.innerText = formatoTiempo(restante, true);
  }

  function formatoTiempo(ms, dias = false) {
    const s = Math.floor(ms / 1000);
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    const seg = s % 60;
    return dias
      ? `${d}d ${h}h ${m}m ${seg}s`
      : `${h}h ${m}m`;
  }

  function mostrarFoto() {
    imagenCarrusel.src = fotos[indiceFoto];
  }

  window.siguiente = () => {
    indiceFoto = (indiceFoto + 1) % fotos.length;
    mostrarFoto();
  };

  window.anterior = () => {
    indiceFoto = (indiceFoto - 1 + fotos.length) % fotos.length;
    mostrarFoto();
  };

});
