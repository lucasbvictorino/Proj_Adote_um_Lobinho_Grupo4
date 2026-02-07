const form = document.getElementById("forms");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const novoLobinho = {
        nome: document.getElementById("nomeNovo").value,
        idade: Number(document.getElementById("idadeNovo").value),
        descricao: document.getElementById("descricaoNovo").value,
        imagem: document.getElementById("fotoNovo").value,
        adotado: false,
        nomeDono: null,
        idadeDono: null,
        emailDono: null
    };

    try {
        const response = await fetch("http://localhost:3000/lobinhos", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(novoLobinho)
        });

        if (!response.ok) {
            throw new Error('Erro HTTP!');
        }
        const criado = await response.json();
        console.log("Lobinho criado:", criado);
        return criado;
    } catch (error) {
        console.error("Erro ao criar Lobinho");
        throw error;
    }
});
