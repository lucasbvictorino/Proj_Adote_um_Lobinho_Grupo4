import { buscarLobinhosPaginados } from './services/lobinhoService.js';

let paginaAtual = 1;

const inputBusca = document.querySelector(".input-container input");
const checkboxAdotados = document.querySelector("#checkbox");
const containerCatalogo = document.querySelector(".catalogo-container");
const containerPaginacao = document.querySelector(".index-paginacao");


function renderizarLobosNaTela(lobinhos) {
    containerCatalogo.innerHTML = "";

    lobinhos.forEach((lobo, index) => {
        
        let layout;
        if (index % 2 === 0) {
            layout = "primeiro";
        } else {
            layout = "segundo";
        }


        let textoBotao = "Adotar";
        let linkDestino = `./showLobinho.html?id=${lobo.id}`;
        let classeBotao = "";

        if (lobo.adotado === true) {
            textoBotao = "Adotado";
            linkDestino = "javascript:void(0)";
            classeBotao = "botao-adotado";
        }

        const imagemHtml = `<img src="${lobo.imagem}" alt="${lobo.nome}">`;
        const botaoHtml = `<a href="${linkDestino}" class="${classeBotao}">${textoBotao}</a>`;

        let blocoFinal = "";

        if (layout === "primeiro") {
            blocoFinal = `
                <div class="catalogo-primeiro">
                    ${imagemHtml}
                    <div class="catalogo-infos-primeiro">
                        <div class="lobo-infos-primeiro">
                            <div class="lobo-nome-primeiro">
                                <h2>${lobo.nome}</h2>
                                <p>Idade: ${lobo.idade} anos</p>
                            </div>
                            ${botaoHtml}
                        </div>
                        <p>${lobo.descricao}</p>
                    </div>
                </div>`;
        } else {
            blocoFinal = `
                <div class="catalogo-segundo">
                    <div class="catalogo-infos-segundo">
                        <div class="lobo-infos-segundo">
                            ${botaoHtml}
                            <div class="lobo-nome-segundo">
                                <h2>${lobo.nome}</h2>
                                <p>Idade: ${lobo.idade} anos</p>
                            </div>
                        </div>
                        <p>${lobo.descricao}</p>
                    </div>
                    ${imagemHtml}
                </div>`;
        }

        containerCatalogo.innerHTML += blocoFinal;
    });
}


function gerarTemplatePaginacao(atual, total) {
    containerPaginacao.innerHTML = "";
    const range = 2;

    for (let i = 1; i <= total; i++) {
        if (i === 1 || i === total || (i >= atual - range && i <= atual + range)) {
            const li = document.createElement("li");
            const botao = document.createElement("button");
            
            botao.textContent = i;
            botao.classList.add("botao-paginacao");
            
            if (i === atual) {
                botao.classList.add("botao-ativo");
            }

            botao.onclick = function() {
                paginaAtual = i;
                carregarPagina();
                window.scrollTo({ top: 400, behavior: 'smooth' });
            };

            li.appendChild(botao);
            containerPaginacao.appendChild(li);
        } 
        // Lógica dos pontinhos (elipses)
        else if (i === atual - range - 1 || i === atual + range + 1) {
            const li = document.createElement("li");
            li.innerHTML = `<span class="salto">...</span>`;
            containerPaginacao.appendChild(li);
        }
    }
}


async function carregarPagina() {
    try {
        const nomeFiltro = inputBusca.value;
        const apenasAdotados = checkboxAdotados.checked;

        const resultado = await buscarLobinhosPaginados(paginaAtual, 4, nomeFiltro, apenasAdotados);

        renderizarLobosNaTela(resultado.dados);
        gerarTemplatePaginacao(paginaAtual, resultado.totalPaginas);
    } catch (error) {
        console.error("Erro ao carregar os lobinhos:", error);
    }
}

inputBusca.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        paginaAtual = 1;
        carregarPagina();
    }
});


checkboxAdotados.addEventListener("change", function() {
    paginaAtual = 1;
    carregarPagina();
});

carregarPagina();