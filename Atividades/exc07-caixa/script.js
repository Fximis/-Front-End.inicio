const produto = {
    "123":{"nome": "lepo", "preco":9.90},
    "456":{"nome": "vapo", "preco":19.90},
    "789":{"nome": "la-ele", "preco":29.90},
    "147":{"nome": "ai dentu", "preco":39.90},
};

let carrinho = [];

const audio = new Audio("sound-track.mp3");

window.onload = () => {
    document.getElementById("cod").focus();
};


function addproduto(){

    const codelement = document.getElementById("cod");
    const qtdelement = document.getElementById("qtd");

    const codValue = codelement.value;
    const qtdValue = qtdelement.value;

    if(!produto[codValue]){
        alert("produto nao cadastrado");
        return;
    }
    const produtocase = produto[codValue];

    const item={
        nome: produto.nome,
        preco: produto.preco,
        quantidade: qtdValue,
        subtot: produto.preco * qtdValue 
    };

    carrinho.push(item);

    audio.currentTime = 0;
    audio.play();

    codelement.value="";
    qtdelement.value= 1;

    atualizartela();

}


function atualizartela(){
    const list = document.getElementById("lista");

    let total = 0;

    carrinho.forEach((item, index) => {
        total += item.subtot;

        const li = document.createElement("li");
        li.className = "list-group-item";

        li.innerHTML = `<div class="d-flex">  <strong>${item.nome}
        </strong> <small>${item.quantidade} X ${item.valor} =
        <strong> ${item.subtot}</strong></small></div>`;
          lista.appendChild(li);
    });
  
}