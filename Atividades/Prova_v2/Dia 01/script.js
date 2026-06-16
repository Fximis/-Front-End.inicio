const caminhos = { 
    imagem1: "img/Tabela_Jogos.png" 
};

let exibindo = false; 
let elementoImg = null; 

function apertarBotao() {
    if (exibindo === false) {
        
        elementoImg = document.createElement('img');
        elementoImg.src = caminhos.imagem1;
        elementoImg.alt = "Tabela de Jogos";
        
        
        document.body.appendChild(elementoImg);
        
        exibindo = true;
    } else {
        
        if (elementoImg) {
            elementoImg.remove(); 
            elementoImg = null;
        }
        exibindo = false;
    }
}