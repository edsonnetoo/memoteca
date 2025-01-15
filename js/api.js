const api = {
    async buscarPensamentos() {
        try {
            //Por padrão o fetch usa o GET
            const response = await fetch('http://localhost:3000/pensamentos');
            return await response.json();
        }
        catch {
            alert("Erro ao buscar Pensamentos!");
            throw error;
        }
    },

    async salvarPensamento(pensamento) {
        try {
            const response = await fetch('http://localhost:3000/pensamentos', {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(pensamento)
            });
            return await response.json();
        }
        catch {
            alert("Erro ao buscar Pensamentos!");
            throw error;
        }
    }
}

export default api;