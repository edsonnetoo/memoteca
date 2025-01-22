const URL_BASE = "http://localhost:3000";

const api = {
    async buscarPensamentos() {
        try {
            //Por padrão o fetch usa o GET
            const response = await axios.get(`${URL_BASE}/pensamentos`);
            return await response.data;
        }
        catch {
            alert("Erro ao buscar Pensamentos!");
            throw error;
        }
    },

    async salvarPensamento(pensamento) {
        try {
            const response = await axios.post(`${URL_BASE}/pensamentos`, pensamento);
            return await response.data;
        }
        catch {
            alert("Erro ao salvar Pensamentos!");
            throw error;
        }
    },

    async buscarPensamentoPorId(id) {
        try {
            const response = await axios.get(`${URL_BASE}/pensamentos/${id}`);
            return await response.data;
        }
        catch {
            alert("Erro ao buscar Pensamento!");
            throw error;
        }
    },

    async editarPensamento(pensamento) {
        try {
            const response = await axios.put(`${URL_BASE}/pensamentos/${pensamento.id}`, pensamento);
            return await response.data;
        }
        catch {
            alert("Erro ao editar Pensamento!");
            throw error;
        }
    },

    async excluirPensamento(id) {
        try {
            const response = await axios.delete(`${URL_BASE}/pensamentos/${id}`);
        }
        catch {
            alert("Erro ao excluir um Pensamento!");
            throw error;
        }
    },
}

export default api;