const sectionAtaque = document.getElementById("seleccionar-ataque");
const sectionReinicio = document.getElementById("reinicio");
const botonMascotaJugador = document.getElementById("boton-mascota");
const botonReiniciar = document.getElementById("boton-reiniciar");

const sectionMascota = document.getElementById("seleccionar-mascota");
const spanMascotaJugador = document.getElementById("mascota-jugador");

const spanMascotaEnemigo = document.getElementById("mascota-enemigo");

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const sectionMensaje = document.getElementById("resultado");
const ataqueDelJugador = document.getElementById("ataques-del-jugador");
const ataqueDelEnemigo = document.getElementById("ataques-del-enemigo");

const contenedorTarjetas = document.getElementById("contenedor-tarjetas");
const contenedorAtaques = document.getElementById("botones");

const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");

let mokepones = [];
let ataqueJugador = []; 
let ataqueEnemigo = [];
let inputHipodogue;
let inputCapipepo;
let inputRatigueya;
let mascotajugador;
let mascotajugadorObjeto;
let opcionDeMokepones;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let botonFuego;
let botonAgua;
let botonTierra;
let botones = [];
let indexAtaqueEnemigo;
let indexAtaqueJugador;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let vidasJugador = 3;
let vidasEnemigo = 3;
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image()
mapaBackground.src = "./assets/mokemap.png"
let alturaMapa
let anchoMapa = window.innerWidth - 40
const anchoMaxMapa = 350

if (anchoMapa > anchoMaxMapa) {
    anchoMapa = anchoMaxMapa - 40
}

alturaMapa = anchoMapa * 600 / 800

mapa.width = anchoMapa
mapa.height = alturaMapa

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio (0, mapa.width - this.ancho)
        this.y = aleatorio (0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
            )
    }
};

let hipodogue = new Mokepon("Hipodogue", "./assets/mokepons_mokepon_hipodoge_attack.png", 5, "./assets/hipodoge.png");

let capipepo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5, "./assets/capipepo.png");

let ratigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5, "./assets/ratigueya.png");

let hipodogueEnemigo = new Mokepon("Hipodogue", "./assets/mokepons_mokepon_hipodoge_attack.png", 5, "./assets/hipodoge.png");

let capipepoEnemigo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5, "./assets/capipepo.png");

let ratigueyaEnemigo = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5, "./assets/ratigueya.png");

hipodogue.ataques.push(
    { nombre: "AGUA 💧", id: "boton-agua"},
    { nombre: "AGUA 💧", id: "boton-agua"},
    { nombre: "AGUA 💧", id: "boton-agua"},
    { nombre: "FUEGO 🔥", id: "boton-fuego"},
    { nombre: "TIERRA 🌱", id: "boton-tierra"},
);

hipodogueEnemigo.ataques.push(
    { nombre: "AGUA 💧", id: "boton-agua"},
    { nombre: "AGUA 💧", id: "boton-agua"},
    { nombre: "AGUA 💧", id: "boton-agua"},
    { nombre: "FUEGO 🔥", id: "boton-fuego"},
    { nombre: "TIERRA 🌱", id: "boton-tierra"},
);

capipepo.ataques.push(
    { nombre: "TIERRA 🌱", id: "boton-tierra"},
    { nombre: "TIERRA 🌱", id: "boton-tierra"},
    { nombre: "TIERRA 🌱", id: "boton-tierra"},
    { nombre: "AGUA 💧", id: "boton-agua"},
    { nombre: "FUEGO 🔥", id: "boton-fuego"},
);

capipepoEnemigo.ataques.push(
    { nombre: "TIERRA 🌱", id: "boton-tierra"},
    { nombre: "TIERRA 🌱", id: "boton-tierra"},
    { nombre: "TIERRA 🌱", id: "boton-tierra"},
    { nombre: "AGUA 💧", id: "boton-agua"},
    { nombre: "FUEGO 🔥", id: "boton-fuego"},
);

ratigueya.ataques.push(
    { nombre: "FUEGO 🔥", id: "boton-fuego"},
    { nombre: "FUEGO 🔥", id: "boton-fuego"},
    { nombre: "FUEGO 🔥", id: "boton-fuego"},
    { nombre: "AGUA 💧", id: "boton-agua"},
    { nombre: "TIERRA 🌱", id: "boton-tierra"},
);

ratigueyaEnemigo.ataques.push(
    { nombre: "FUEGO 🔥", id: "boton-fuego"},
    { nombre: "FUEGO 🔥", id: "boton-fuego"},
    { nombre: "FUEGO 🔥", id: "boton-fuego"},
    { nombre: "AGUA 💧", id: "boton-agua"},
    { nombre: "TIERRA 🌱", id: "boton-tierra"},
);

mokepones.push(hipodogue,capipepo,ratigueya);


//INICIAR JUEGO
function iniciarJuego() {

    sectionAtaque.style.display = "none";
    sectionReinicio.style.display = "none";
    sectionVerMapa.style.display = "none";

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre}>
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodogue = document.getElementById("Hipodogue");
        inputCapipepo = document.getElementById("Capipepo");
        inputRatigueya = document.getElementById("Ratigueya");
    })

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
    botonReiniciar.addEventListener("click", reiniciarJuego);
};

//SELECCIONAR MASCOTA DEL JUGADOR
function seleccionarMascotaJugador() {
    
    sectionMascota.style.display = "none";
   
    if (inputHipodogue.checked) {
        spanMascotaJugador.innerHTML = inputHipodogue.id;
        mascotajugador = inputHipodogue.id;
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id;
        mascotajugador = inputCapipepo.id;
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id;
        mascotajugador = inputRatigueya.id;
    } else {
        alert("Debes seleccionar una mascota");
    };
    

    extraerataques(mascotajugador);

    sectionVerMapa.style.display = "flex";
    iniciarMapa()
};

function extraerataques(mascotajugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotajugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques;
        }
        
    };
    mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `<button id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon;
    })

    botonFuego = document.getElementById("boton-fuego");
    botonAgua = document.getElementById("boton-agua");
    botonTierra = document.getElementById("boton-tierra");
    botones = document.querySelectorAll(".BAtaque")

}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) =>{
            if (e.target.textContent === "FUEGO 🔥") {
                ataqueJugador.push("FUEGO 🔥")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true;
            } else if (e.target.textContent === "AGUA 💧") {
                ataqueJugador.push("AGUA 💧")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true;
            } else {
                ataqueJugador.push("TIERRA 🌱")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true;
            }
            ataqueAleatorioEnemigo()
        })
    })
}

//SELECCIONAR MASCOTA DEL ENEMIGO
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
};

function seleccionarMascotaEnemigo(enemigo) {
    
    spanMascotaEnemigo.innerHTML = enemigo.nombre;
    ataquesMokeponEnemigo = enemigo.ataques;
    secuenciaAtaque()
};

//ATAQUE ALEATORIO ENEMIGO

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push(ataquesMokeponEnemigo[0].nombre)
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 2) {
        ataqueEnemigo.push(ataquesMokeponEnemigo[3].nombre)
    } else {
        ataqueEnemigo.push(ataquesMokeponEnemigo[4].nombre)
    }

    console.log(ataqueEnemigo);
    iniciarPelea()
};

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        ganadorRonda()
    }
}

//GANADOR RONDA

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}
 
function ganadorRonda() {

    for (let i = 0; i < ataqueJugador.length; i++) {
        if(ataqueJugador[i] === ataqueEnemigo[i]) {
            indexAmbosOponentes(i, i)
            crearMensaje("EMPATE")
        } else if(ataqueJugador[i] == "FUEGO 🔥" && ataqueEnemigo[i] == "TIERRA 🌱" || ataqueJugador[i] == "AGUA 💧" && ataqueEnemigo[i] == "FUEGO 🔥" || ataqueJugador[i] == "TIERRA 🌱" && ataqueEnemigo[i] == "AGUA 💧") {
            indexAmbosOponentes(i, i)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(i, i)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
        
    }

    revisarVidas();
};

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("ESTO FUE UN EMPATE")
    } else if (vidasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES, GANASTE LA BATALLA")
    } else {
        crearMensajeFinal("LO SIENTO, PERDISTE LA BATALLA")
    };
};



//MENSAJE DE ATAQUES, GANADOR Y PERDEDOR

function crearMensaje(resultado) {
    let nuevoAtaqueJugador = document.createElement("p");
    let nuevoAtaqueEnemigo = document.createElement("p");

    sectionMensaje.innerHTML = resultado;
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo;

    ataqueDelJugador.appendChild(nuevoAtaqueJugador);
    ataqueDelEnemigo.appendChild(nuevoAtaqueEnemigo);
};


function crearMensajeFinal(resultadoFinal) {
    sectionReinicio.style.display = "block";
    
    sectionMensaje.innerHTML = resultadoFinal;
}

function reiniciarJuego() {
    location.reload();
}

function pintarCanvas() {
    mascotajugadorObjeto.x = mascotajugadorObjeto.x + mascotajugadorObjeto.velocidadX
    mascotajugadorObjeto.y = mascotajugadorObjeto.y + mascotajugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground, 
        0, 
        0, 
        mapa.width, 
        mapa.height
    )
    mascotajugadorObjeto.pintarMokepon()
    hipodogueEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()

    if (mascotajugadorObjeto.velocidadX !== 0 || mascotajugadorObjeto.velocidadY !== 0) {
        revisarColision(hipodogueEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
    }
}

function moverDerecha() {
    mascotajugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
    mascotajugadorObjeto.velocidadX = -5
}

function moverArriba() {
    mascotajugadorObjeto.velocidadY = -5
}

function moverAbajo() {
    mascotajugadorObjeto.velocidadY = 5
}

function detenerMovimiento() {
    mascotajugadorObjeto.velocidadX = 0
    mascotajugadorObjeto.velocidadY = 0
}

function presionaTecla(event) {
     switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break
        case "ArrowDown":
            moverAbajo()
            break
        case "ArrowLeft":
            moverIzquierda()
            break
        case "ArrowRight":
            moverDerecha()
            break
        default:
            break
     }
}

function iniciarMapa() {

    mascotajugadorObjeto = obtenerMascota(mascotajugador)
    intervalo = setInterval(pintarCanvas, 50);

    window.addEventListener("keydown", presionaTecla)
    window.addEventListener("keyup", detenerMovimiento)
}

function obtenerMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotajugador === mokepones[i].nombre) {
            return mokepones[i]
        } 
    };
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x 

    const arribaMascota = mascotajugadorObjeto.y
    const abajoMascota = mascotajugadorObjeto.y + mascotajugadorObjeto.alto
    const derechaMascota = mascotajugadorObjeto.x + mascotajugadorObjeto.ancho
    const izquierdaMascota = mascotajugadorObjeto.x 

    if(abajoMascota < arribaEnemigo || arribaMascota > abajoEnemigo || derechaMascota < izquierdaEnemigo || izquierdaMascota > derechaEnemigo) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    sectionAtaque.style.display = "flex";
    sectionVerMapa.style.display = "none";
    seleccionarMascotaEnemigo(enemigo);

}

window.addEventListener("load", iniciarJuego);
