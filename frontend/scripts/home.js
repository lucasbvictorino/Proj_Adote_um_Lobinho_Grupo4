import { buscarLobinhos } from './services/lobinhoService.js';

async function carregarHome() {
    const lobinhos = await buscarLobinhos();
    let i1 = Math.floor((Math.random() * lobinhos.length));
    let i2 = Math.floor((Math.random() * lobinhos.length));

    while (i1 === i2) {
        i2 = Math.floor((Math.random() * lobinhos.length));
    }

    let lobo1 = lobinhos[i1];
    let lobo2 = lobinhos[i2];

    const imagemLobo1 = document.querySelector(".exemplar1-img");
    const nomeLobo1 = document.querySelector(".exemplar1-nome");
    const idadeLobo1 = document.querySelector(".exemplar1-idade");
    const descLobo1 = document.querySelector(".exemplar1-descricao");

    const imagemLobo2 = document.querySelector(".exemplar2-img");
    const nomeLobo2 = document.querySelector(".exemplar2-nome");
    const idadeLobo2 = document.querySelector(".exemplar2-idade");
    const descLobo2 = document.querySelector(".exemplar2-descricao");

    imagemLobo1.src = lobo1.imagem;
    imagemLobo1.alt = `Foto do lobinho ${lobo1.nome}`;
    nomeLobo1.textContent = `${lobo1.nome}`;
    idadeLobo1.textContent = `Idade: ${lobo1.idade} anos`
    descLobo1.textContent = `${lobo1.descricao}`

    imagemLobo2.src = lobo2.imagem;
    imagemLobo2.alt = `Foto do lobinho ${lobo2.nome}`;
    nomeLobo2.textContent = `${lobo2.nome}`;
    idadeLobo2.textContent = `Idade: ${lobo2.idade} anos`
    descLobo2.textContent = `${lobo2.descricao}`
}

carregarHome();