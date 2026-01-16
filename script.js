/*************************************************
 * ABRIR CARTA
 *************************************************/

function abrirCarta(dia) {
  seccionCarta.classList.remove("oculto");
  numeroDia.innerText = `DÍA ${Number(dia) + 1}`;

  // ✅ Solo mostrar la carta si existe y es texto
  if (cartas[dia] && typeof cartas[dia] === "string") {
    contenidoCarta.innerText = cartas[dia];
  } else {
    contenidoCarta.innerText = "Esta carta aún no está disponible.";
  }

  // ✅ Solo cambiar el video si existe (evita errores 404)
  const videoPath = `videos/video${Number(dia) + 1}.mp4`;
  fetch(videoPath, { method: "HEAD" })
    .then(res => {
      if (res.ok) videoDiario.src = videoPath;
      else videoDiario.src = ""; // o video por defecto
    })
    .catch(() => videoDiario.src = "");
}