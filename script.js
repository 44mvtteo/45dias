document.addEventListener("DOMContentLoaded", () => {

  const PASSWORD = "1308";
  const FECHA_INICIO = new Date("2026-01-09T09:00:00-03:00");
  const FECHA_REENCUENTRO = new Date("2026-02-22T00:00:00-03:00");

  const cartas = [
    `Dia 1\n(Tu carta real 1)`,
    `Dia 2\n(Tu carta real 2)`,
    `Dia 3\n(Tu carta real 3)`,
    `Dia 4\n(Tu carta real 4)`,
    `Dia 5\n(Tu carta real 5)`,
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

  const fotos = ["imagenes/foto1.jpg","imagenes/foto2.jpg","imagenes/foto3.jpg"];
  let indice = 0;

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
    if(inputPassword.value !== PASSWORD){
      errorPassword.innerText="Contraseña incorrecta";
      return;
    }
    pantallaPassword.style.display="none";
    contenidoPrincipal.classList.remove("oculto");
    iniciar();
  });

  // ===== INICIO =====
  function iniciar(){
    construirSelector();
    actualizarCarta();
    setInterval(actualizarCarta,1000);
    mostrarFoto();
  }

  function obtenerDiaActual() {
    const diff = new Date() - FECHA_INICIO;
    return Math.min(Math.max(Math.floor(diff / 86400000),0),44);
  }

  function actualizarCarta(){
    const diff = FECHA_INICIO - new Date();
    if(diff>0){
      estadoCarta.innerText="La carta se abre en:";
      contadorDesbloqueo.innerText=Math.floor(diff/3600000)+"h "+Math.floor((diff%3600000)/60000)+"m";
      bloqueCarta.onclick=null;
    }else{
      estadoCarta.innerText="Presione para leer la carta 💌";
      contadorDesbloqueo.innerText="";
      bloqueCarta.onclick=()=>abrirCarta(obtenerDiaActual());
    }
    actualizarViaje();
  }

  function construirSelector(){
    listaCartas.innerHTML="";
    const hoy = obtenerDiaActual();
    for(let i=0;i<45;i++){
      const opt=document.createElement("option");
      opt.value=i;
      opt.text=i<=hoy?`Carta ${i+1}`:`🔒 Carta ${i+1}`;
      opt.disabled=i>hoy;
      listaCartas.appendChild(opt);
    }
    listaCartas.onchange=()=>abrirCarta(listaCartas.value);
  }

  function abrirCarta(dia){
    seccionCarta.classList.remove("oculto");
    numeroDia.innerText=`DÍA ${Number(dia)+1}`;
    contenidoCarta.innerText=cartas[dia];
  }

  function actualizarViaje(){
    const s=Math.floor((FECHA_REENCUENTRO-new Date())/1000);
    const dias=Math.floor(s/86400);
    const horas=Math.floor((s%86400)/3600);
    const minutos=Math.floor((s%3600)/60);
    const segundos=s%60;
    contadorViaje.innerText=`${dias}d ${horas}h ${minutos}m ${segundos}s`;
  }

  function mostrarFoto(){
    imagenCarrusel.src=fotos[indice];
  }
  window.siguiente=function(){
    indice=(indice+1)%fotos.length;
    mostrarFoto();
  }
  window.anterior=function(){
    indice=(indice-1+fotos.length)%fotos.length;
    mostrarFoto();
  }

}); 