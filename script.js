const PASSWORD = "1308";

const FECHA_INICIO = new Date("2026-01-09T09:00:00-03:00");
const FECHA_ENCUENTRO = new Date("2026-02-22T00:00:00-03:00");

const cartas = Array.from({length:45},(_,i)=>`Carta ${i+1}\n\nAquí escribes la carta del día.`);
const canciones = Array.from({length:45},()=>({
  titulo:"Te Amo",
  artista:"Franco De Vita",
  link:"https://open.spotify.com"
}));
const mensajesVideo = Array.from({length:45},()=> "Hoy quería decirle…");

const fotos = [];
for(let i=1;i<=50;i++) fotos.push(`imagenes/foto${i}.jpg`);
let indice = 0;

function verificarPassword(){
  if(inputPassword.value !== PASSWORD){
    errorPassword.innerText = "Contraseña incorrecta";
    return;
  }
  pantallaPassword.style.display="none";
  contenidoPrincipal.classList.remove("oculto");
  iniciar();
}

function iniciar(){
  actualizarCarta();
  construirSelector();
  cargarContenido();
  mostrarFoto();
  setInterval(actualizarCarta,1000);
}

function actualizarCarta(){
  const diff = FECHA_INICIO - new Date();
  if(diff > 0){
    estadoCarta.innerText = "La carta se abre en:";
    contadorDesbloqueo.innerText =
      Math.floor(diff/3600000)+"h "+
      Math.floor(diff%3600000/60000)+"m";
    bloqueCarta.onclick = null;
  } else {
    estadoCarta.innerText = "Presione para leer la carta 💌";
    contadorDesbloqueo.innerText = "";
    bloqueCarta.onclick = ()=>abrirCarta(0);
  }
  actualizarContadorFinal();
}

function abrirCarta(dia){
  bloqueCarta.classList.add("abierto");
  setTimeout(()=>{
    seccionCarta.classList.remove("oculto");
    contenidoCarta.innerText = cartas[dia];
  },600);
}

function construirSelector(){
  listaCartas.innerHTML="";
  for(let i=0;i<45;i++){
    const f=new Date(FECHA_INICIO);
    f.setDate(f.getDate()+i);
    const opt=document.createElement("option");
    opt.value=i;
    opt.text=new Date()>=f?`Carta ${i+1}`:`🔒 Carta ${i+1}`;
    opt.disabled=new Date()<f;
    listaCartas.appendChild(opt);
  }
  listaCartas.onchange=()=>abrirCarta(listaCartas.value);
}

function cargarContenido(){
  tituloCancion.innerText=canciones[0].titulo;
  artistaCancion.innerText=canciones[0].artista;
  linkCancion.href=canciones[0].link;
  textoVideo.innerText=mensajesVideo[0];
  videoDiario.src=`videos/video1.mp4`;
}

function actualizarContadorFinal(){
  const d=FECHA_ENCUENTRO-new Date();
  const s=Math.floor(d/1000);
  contadorFinal.innerText =
    Math.floor(s/86400)+"d "+
    Math.floor(s%86400/3600)+"h "+
    Math.floor(s%3600/60)+"m "+
    s%60+"s";
}

function mostrarFoto(){ imagenCarrusel.src=fotos[indice]; }
function siguiente(){ indice=(indice+1)%fotos.length; mostrarFoto(); }
function anterior(){ indice=(indice-1+fotos.length)%fotos.length; mostrarFoto(); }
