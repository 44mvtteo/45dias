const PASSWORD = "1308";

const FECHA_INICIO = new Date("2026-01-09T09:00:00-03:00");
const FECHA_ENCUENTRO = new Date("2026-02-22T00:00:00-03:00");

// CARTAS
const cartas = Array.from({length:45},(_,i)=>`Carta ${i+1}\n\nAquí escribes la carta.`);

// FOTOS
const fotos = [];
for(let i=1;i<=50;i++){ fotos.push(`imagenes/foto${i}.jpg`); }
let indice = 0;

/* PASSWORD */
function verificarPassword(){
  if(inputPassword.value!==PASSWORD){
    errorPassword.innerText="Contraseña incorrecta";
    return;
  }
  pantallaPassword.style.display="none";
  contenidoPrincipal.classList.remove("oculto");
  iniciar();
}

/* INICIO */
function iniciar(){
  actualizarEncuentro();
  actualizarEstadoCarta();
  construirSelector();
  cargarVideo();
  mostrarFoto();
  actualizarRelojEncuentro();
  setInterval(actualizarRelojEncuentro,1000);
}

/* CONTADOR */
function actualizarEncuentro(){
  const d=Math.floor((FECHA_ENCUENTRO-new Date())/86400000);
  contadorEncuentroIzq.innerText=d+" días";
  contadorEncuentroDer.innerText=d+" días";
}

/* RELOJ */
function actualizarRelojEncuentro(){
  const diff=FECHA_ENCUENTRO-new Date();
  const d=Math.floor(diff/86400000);
  const h=Math.floor(diff/3600000)%24;
  const m=Math.floor(diff/60000)%60;
  const s=Math.floor(diff/1000)%60;
  relojEncuentro.innerText=`${d}d ${h}h ${m}m ${s}s`;
}

/* CARTA */
function actualizarEstadoCarta(){
  const diff=FECHA_INICIO-new Date();
  if(diff>0){
    estadoCarta.innerText="La carta se abre en:";
    contadorDesbloqueo.innerText=
      Math.floor(diff/3600000)+"h "+
      Math.floor(diff/60000)%60+"m";
    return;
  }
  estadoCarta.innerText="Presione para leer la carta 💌";
  bloqueCarta.onclick=()=>abrirCarta(0);
}

/* SELECTOR */
function construirSelector(){
  for(let i=0;i<45;i++){
    const opt=document.createElement("option");
    opt.value=i;
    opt.text=`Carta ${i+1}`;
    listaCartas.appendChild(opt);
  }
  listaCartas.onchange=()=>abrirCarta(listaCartas.value);
}

/* ABRIR CARTA */
function abrirCarta(i){
  seccionCarta.classList.remove("oculto");
  contenidoCarta.innerText=cartas[i];
}

/* VIDEO */
function cargarVideo(){
  videoDiario.src="videos/video1.mp4";
}

/* CARRUSEL */
function mostrarFoto(){
  imagenCarrusel.src=fotos[indice];
}
function siguiente(){indice=(indice+1)%fotos.length;mostrarFoto();}
function anterior(){indice=(indice-1+fotos.length)%fotos.length;mostrarFoto();}
