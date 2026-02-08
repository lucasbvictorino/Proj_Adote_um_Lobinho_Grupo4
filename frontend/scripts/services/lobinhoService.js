export async function buscarLobinhos() {
    try{
        const response = await fetch("http://localhost:3000/lobinhos");
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        const lobinhos = await response.json();
        console.log("Lobinhos encontrados:", lobinhos);
        return lobinhos;

    } catch(error) {
        console.log("Erro ao buscar lobinhos:" + error);
        throw error;
    } 
}


export async function buscarLobinhosPaginados(pagina = 1, limite = 4) {

    try {
        const response = await fetch(`http://localhost:3000/lobinhos?_page=${pagina}&_limit=${limite}`);

        if(!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        const lobinhos = await response.json();

        const totalItens = response.headers.get("X-Total-Count");

        console.log(`Página ${pagina} (${limite} por página):`, lobinhos);
        console.log(`Total de lobinhos: ${totalItens}`);

        return {
            dados: lobinhos,
            pagina,
            limite,
            total: parseInt(totalItens),
            totalPaginas: Math.ceil(parseInt(totalItens) / limite)
        };
    } catch(error) {
        console.error("Erro ao buscar lobinhos paginados:", error);
        throw error;
    }
    
}

// buscarLobinhos();
buscarLobinhosPaginados(2);