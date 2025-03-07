const URL_BASE = "http://localhost:3000";

const converterStringParaData = (dataString) => {
    const [ano, mes, dia] = dataString.split("-");
    return new Date(Date.UTC(ano, mes - 1, dia));
}

const api = {
    async buscarPensamentos() {
        try {
            //Por padrão o fetch usa o GET
            const response = await axios.get(`${URL_BASE}/pensamentos`);
            const pensamentos =  await response.data;

            return pensamentos.map(pensamento => {
                return {
                    ...pensamento,
                    data: new Date(pensamento.data)
                }
            })
        }
        catch {
            alert("Erro ao buscar Pensamentos!");
            throw error;
        }
    },

    async salvarPensamento(pensamento) {
        try {
            const data = converterStringParaData(pensamento.data);
            const response = await axios.post(`${URL_BASE}/pensamentos`, {
                ...pensamento,
                data: data.toISOString()
            });
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
            const pensamento = await response.data;

            return {
                ...pensamento,
                data: new Date(pensamento.data)
            }
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

    async buscarPensamentosPorTermo(termo) {
        try {
            const pensamentos = await this.buscarPensamentos();
            const termoMinusculo = termo.toLowerCase();
    
            const pensamentosFiltrados = pensamentos.filter(pensamento => {
                return (pensamento.conteudo.toLowerCase().includes(termoMinusculo)) || 
                pensamento.autoria.toLowerCase().includes(termoMinusculo);
            });
    
            return pensamentosFiltrados; 
        } catch (error) {
            alert("Erro ao filtrar pensamentos!");
            throw error;
        }    
    },

    async atualizarFavorito(id, favorito) {
        try {
            const response = await axios.patch(`${URL_BASE}/pensamentos/${id}`, { favorito });
            return response.data
        } catch (error) {
            alert("Erro ao atualizar favorito");
            throw error;
        }
    }
}

export default api;