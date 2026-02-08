export async function buscarLobinhos() {
    try {
        const response = await fetch("http://localhost:3000/lobinhos");
        if (!response.ok) throw new Error(`Erro HTTP! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar lobinhos:", error);
        throw error;
    }
}

export async function buscarLobinhosPaginados(pagina = 1, limite = 4, nome = "", soAdotados = false) {
    try {
        let url = `http://localhost:3000/lobinhos?_page=${pagina}&_limit=${limite}`;
        if (nome) {
            url += `&nome_like=${nome}`;
        }
        if (soAdotados) {
            url += `&adotado=true`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erro HTTP! Status: ${response.status}`);
        
        const lobinhos = await response.json();
        const totalItens = response.headers.get("X-Total-Count");

        return {
            dados: lobinhos,
            pagina,
            limite,
            total: parseInt(totalItens),
            totalPaginas: Math.ceil(parseInt(totalItens) / limite)
        };
    } catch (error) {
        console.error("Erro ao buscar lobinhos paginados:", error);
        throw error;
    }
}



async function deletarLobinho(id){
    try{
        const response = await fetch(`http://localhost:3000/lobinhos/${id}`, {
            method: 'DELETE'
        });

        if(!response.ok){
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        console.log(`Lobinho com id ${id} foi deletado com sucesso`);
        return true;
    }   catch(error){
        console.error('Erro ao deletar lobinho', error);
        throw error;
    }
}

