import { buscarLobinhosPaginados } from './services/lobinhoService.js';

let paginaAtual = 1;

function gerarTemplatePaginacao(atual, total) {
    const numPaginasAdj = 2;
    let listaBotoes = [];
    for(let i = 1; i <= total; i++) {
        if(i === 1) {
            listaBotoes.push(i);   
            if(1 < atual - (numPaginasAdj + 1)) {
                listaBotoes.push("...");
            }
        }
        else if(i >= atual - numPaginasAdj && i <= atual + numPaginasAdj) {
            listaBotoes.push(i);
        } 
        else if(i === total) {
            if(total > atual + (numPaginasAdj + 1)) {
                listaBotoes.push("...");
            }
            listaBotoes.push(i);
        }
    }

    const container = document.querySelector(".index-paginacao");
    container.innerHTML = "";

    listaBotoes.forEach((item) => {
        const li = document.createElement("li");

        if(item === "..."){
            li.innerHTML = `<span class="salto">...</span>`;
        } else {
            const botao = document.createElement("button");
            botao.textContent = item;
            botao.classList.add("botao-paginacao");

            if(item === atual) {
                botao.classList.add("botao-ativo");
            }
            botao.onclick = (() => {
                paginaAtual = item;
                carregarPagina(paginaAtual);
            });
            li.append(botao);
        }
        container.append(li);
    });
}

async function carregarPagina(pagina) {
    try {
        const lobinhosPaginados =  await buscarLobinhosPaginados(pagina);
        gerarTemplatePaginacao(pagina, lobinhosPaginados.totalPaginas);
    } catch(error) {
        console.error("Erro ao carregar.", error);
    }
    
}

carregarPagina(paginaAtual);