<<<<<<< HEAD
import { buscarLobinhos } from './services/lobinhoService.js';

const params = new URLSearchParams(window.location.search);
const idLobinho = params.get("id");

if (!idLobinho) {
    alert("ID do lobinho não foi encontrado.");
    window.location.href = "listaLobinhos.html";
}

async function carregarShowLobinho(id) {
    try {
        const response = await fetch(`http://localhost:3000/lobinhos/${id}`);
        
        if (!response.ok) throw new Error("Erro ao buscar lobinho");
        
        const lobinho = await response.json();

        document.querySelector("main h2").textContent = lobinho.nome;
        document.querySelector(".imagem img").src = lobinho.imagem;
        document.querySelector(".imagem img").alt = `Imagem do lobinho ${lobinho.nome}`;
        document.querySelector(".InformacoesLobo p").textContent = lobinho.descricao;

        if (lobinho.adotado) {
            const btnAdotar = document.querySelector(".botao_adotar");
            btnAdotar.textContent = "ADOTADO";
            btnAdotar.style.backgroundColor = "#7f8c8d";
            btnAdotar.disabled = true;
        }

    } catch (error) {
        console.error("Erro:", error);
        alert("Não foi possível carregar os dados deste lobinho.");
    }
}


const botaoAdotar = document.querySelector(".botao_adotar");
const botaoExcluir = document.querySelector(".botao_excluir");

botaoAdotar.addEventListener("click", () => {
    
    window.location.href = `adotarUmLobinho.html?id=${idLobinho}`;
});

botaoExcluir.addEventListener("click", async () => {
    const confirmacao = confirm("Tem certeza que deseja excluir este lobinho para sempre?");
    if (!confirmacao) return;

    try {
        const response = await fetch(`http://localhost:3000/lobinhos/${idLobinho}`, {
            method: "DELETE",
        });

        if (response.ok) {
            alert("Lobinho excluído com sucesso.");
            window.location.href = "listaLobinhos.html";
        }
    } catch (error) {
        alert("Erro ao excluir o lobinho.");
    }
});

carregarShowLobinho(idLobinho);
=======
>>>>>>> 58286569bd653994ae490e156c3c11ce08c3aa2c
