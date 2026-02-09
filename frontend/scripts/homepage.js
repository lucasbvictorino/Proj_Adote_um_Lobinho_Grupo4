async function buscarHome() {
  try {
    const response = await fetch("http://localhost:3000/lobinhos");
    if (!response.ok) throw new Error("Erro ao buscar lobinhos");

    const lobinhos = await response.json();

    const i1 = Math.floor(Math.random() * lobinhos.length);
    let i2 = Math.floor(Math.random() * lobinhos.length);

    showHome(lobinhos[i1], lobinhos[i2]);

  } catch (error) {
    console.error(error);
    throw error;
  }
}

function showHome(lobo1, lobo2) {
  const container = document.getElementById("lobinhosInfo");

  container.innerHTML = `
    <div class="exemplar1">
      <div class="imagens">
        <img src="${lobo1.imagem}">
      </div>
      <div class="exemplo-content">
        <h3>${lobo1.nome}</h3>
        <span>Idade: ${lobo1.idade} anos</span>
        <p>${lobo1.descricao}</p>
      </div>
    </div>

    <div class="exemplar2">
      <div class="exemplo-content">
        <h3>${lobo2.nome}</h3>
        <span>Idade: ${lobo2.idade} anos</span>
        <p>${lobo2.descricao}</p>
      </div>
      <div class="imagens">
        <img src="${lobo2.imagem}">
      </div>
    </div>
  `;
}

buscarHome();