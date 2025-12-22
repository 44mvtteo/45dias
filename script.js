const PASSWORD = "1308";

const canciones = [{
  titulo: "Te Amo",
  artista: "Franco De Vita",
  link: "https://open.spotify.com/"
}];

const cartas = ["Aquí escribes la carta."];

const fotos = ["imagenes/foto1.jpg"];
let indice = 0;

function verificarPassword() {
  if (document.getElementById("inputPassword").value !== PASSWORD) {
    document.getElementById("errorPassword").innerText = "Contraseña incorrecta";
    return;
  }
  document.getElementById("pantallaPassword").style.display = "none";
  document.getElementById("contenidoPrincipal").classList.remove("oculto");
  iniciar();
}

function iniciar() {
  document.getElementById("tituloCancion").innerText = canciones[0].titulo;
  document.getElementById("artistaCancion").innerText = canciones[0].artista;
  document.getElementById("linkCancion").href = canciones[0].link;
  document.getElementById("contenidoCarta").innerText = cartas[0];
  document.getElementById("imagenCarrusel").src = fotos[0];
  document.getElementById("videoDiario").src = "videos/video1.mp4";
}

function siguiente() {
  indice = (indice + 1) % fotos.length;
  document.getElementById("imagenCarrusel").src = fotos[indice];
}

function anterior() {
  indice = (indice - 1 + fotos.length) % fotos.length;
  document.getElementById("imagenCarrusel").src = fotos[indice];
}
