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
            alert("Erro ao salvar Pensamentos!");
            throw error;
        }
    },

    async buscarPensamentoPorId(id) {
        try {
            const response = await fetch(`http://localhost:3000/pensamentos/${id}`);
            return await response.json();
        }
        catch {
            alert("Erro ao buscar Pensamento!");
            throw error;
        }
    },

    async editarPensamento(pensamento) {
        try {
            const response = await fetch(`http://localhost:3000/pensamentos/${pensamento.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(pensamento)
            });
            return await response.json();
        }
        catch {
            alert("Erro ao editar Pensamento!");
            throw error;
        }
    },

    async excluirPensamento(id) {
        try {
            const response = await fetch(`http://localhost:3000/pensamentos/${id}`, {
                method: "DELETE",
            });
        }
        catch {
            alert("Erro ao excluir um Pensamento!");
            throw error;
        }
    },
}

export default api;