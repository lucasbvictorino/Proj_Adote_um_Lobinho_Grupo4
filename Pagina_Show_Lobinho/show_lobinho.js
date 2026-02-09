const params = new URLSearchParams(window.location.search);
const idLobinho = params.get("id");

if (!idLobinho) {
  alert("ID do lobinho não foi encontrado.");
  throw new Error("ID ausente");
}

async function carregarShowLobinho(id) {
  try {
    const response = await fetch(`http://localhost:3000/lobinhos/${id}`);

    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }

    const lobinho = await response.json();

    const titulo = document.querySelector("h2");
    const imagem = document.querySelector(".imagem img");
    const descricao = document.querySelector(".InformacoesLobo p");

    titulo.textContent = lobinho.nome;
    imagem.src = lobinho.imagem;
    imagem.alt = `Imagem do lobinho ${lobinho.nome}`;
    descricao.textContent = lobinho.descricao;

  } catch (error) {
    console.error("Erro ao carregar lobinho:", error);
    alert("Erro ao carregar dados do lobinho.");
  }
}

carregarShowLobinho(idLobinho);

const botaoAdotar = document.querySelector(".botao_adotar");

botaoAdotar.addEventListener("click", () => {
  window.location.href = `Adotar-Lobinho.html?id=${idLobinho}`;
});

const botaoExcluir = document.querySelector(".botao_excluir");

async function deleteLobinho(id) {
  try {
    const response = await fetch(`http://localhost:3000/lobinhos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Erro ao deletar lobinho:", error);
    throw error;
  }
}

botaoExcluir.addEventListener("click", async () => {
  try {
    await deleteLobinho(idLobinho);
    alert(`O lobinho do ID "${idLobinho}" foi excluído.`);
    window.location.href = "ListaDeLobinhos.html";
  } catch {
    alert("Erro ao excluir o lobinh
