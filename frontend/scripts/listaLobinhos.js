import { buscarLobinhosPaginados } from './services/lobinhoService.js';

let paginaAtual = 1;

function gerarTemplatePaginacao(atual, total) {
    const numPaginasAdj = 2;
    let listaBotoes = [];
    for(let i = 1; i <= total; i++) {
        if(i === 1) {
            listaBotoes.push(i);   
            if(1 < atual - numPaginasAdj) {
                listaBotoes.push("...");
            }
        }
        else if(i >= atual - numPaginasAdj && i <= atual + numPaginasAdj) {
            listaBotoes.push(i);
        } 
        else if(i === total) {
            if(total > atual + numPaginasAdj) {
                listaBotoes.push("...");
            }
            listaBotoes.push(i);
        }
    }

    const container = document.querySelector(".index-paginacao");
    container.innerHTML = "";

    listaBotoes.forEach((item) => {
        container.innerHTML += `<span>${item}</span>`
    })
}

async function carregarPagina(pagina) {
    
}