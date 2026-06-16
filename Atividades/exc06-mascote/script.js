const cria = document.getElementById("normal")
const feliz = document.getElementById("feliz")
const fundoDia = "Imagens-Mascote/Compactada/planeta.png"
const fundoNoite = "Imagens-Mascote/Compactada/background_noturno"

const estados = {
    normal: "Imagens-Mascote/Compactada/Mascote.png",
    feliz: "Imagens-Mascote/Compactada/mascote-feliz.png",
    irritado:"Imagens-Mascote/Compactada/Mascote-odio.png",
    comendo: "Imagens-Mascote/Compactada/Mascote-Comendo.png",
    comida: "Imagens-Mascote/Compactada/mascote-comida-favorita.png",
    morto: "Imagens-Mascote/Compactada/Mascote-morto.png",

}

let contador = 0
let horas =0
let intervalo = null
let time_out = null
let time_click = null
let timeoutClique = null
let timeoutBack = null

function controlador(){
    if(intervalo) clearInterval(intervalo)

        intervalo = setInterval(() =>{
            contador++;
            console.log("tempo sem comer: ", contador)

            if(contador == 10){
                cria.src = estados.irritado
            }
            if (contador == 20){
                cria.src= estados.morto
                clearInterval(intervalo)
                console.log("O mascote morreu.")
            }
        }, 1000)
}

function alimentar(){

    if (contador >= 20) return

    contador = 0
    console.log("Comendo")

    clearTimeout(timeoutClique)
    clearTimeout(timeoutBack)

    cria.src = estados.comendo

    if(timeoutClique) clearTimeout(timeoutClique)

        timeoutClique = setTimeout(() =>{
            cria.src = estados.feliz

            timeoutBack = setTimeout(() =>{
                cria.src = estados.normal
            }, 2000)
        }, 1000)
}

controlador();
