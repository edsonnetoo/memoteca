import api from "./api.js"

const ui = {

    async preencherFormulario(pensamnetoId) {
        const pensamento = await api.buscarPensamentoPorId(pensamnetoId);
        document.getElementById("pensamento-id").value = pensamento.id;
        document.getElementById("pensamento-conteudo").value = pensamento.conteudo;
        document.getElementById("pensamento-autoria").value = pensamento.autoria;
        document.getElementById("pensamento-data").value = pensamento.data.toISOString().split("T")[0];

        document.getElementById("form-container").scrollIntoView();
    },

    async renderizarPensamentos(pensamentosFiltrados = null) {
        const listaPensamentos = document.getElementById("lista-pensamentos");
        const mensagemVazia = document.getElementById("lista-pensamentos-vazia");
        listaPensamentos.innerHTML = ""

        try {
            let pensamentoParaRenderizar;

            if(pensamentosFiltrados) {
                pensamentoParaRenderizar = pensamentosFiltrados;
            } else {
                pensamentoParaRenderizar = await api.buscarPensamentos();
            }
            
            if (pensamentoParaRenderizar.length === 0) {
                mensagemVazia.style.display = "block"
            } else {
                mensagemVazia.style.display = "none";
                pensamentoParaRenderizar.forEach(ui.adicionarPensamentoNalista);
            }
            
        } 
        catch (error) {
            
        }
    },

    adicionarPensamentoNalista(pensamento) {
        const listaPensamentos = document.getElementById("lista-pensamentos");
        const li = document.createElement("li");
        li.setAttribute("data-id", pensamento.id);
        li.classList.add("li-pensamento");

        const iconeAspas = document.createElement("img");
        iconeAspas.src = "assets/imagens/aspas-azuis.png";
        iconeAspas.alt = "Aspas azuis";
        iconeAspas.classList.add("icone-aspas");

        const pensamentoAutoria = document.createElement("div");
        pensamentoAutoria.textContent = pensamento.autoria;
        pensamentoAutoria.classList.add("pensamento-autoria");

        const pensamentoData = document.createElement("div");

        var options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC'
        }

        const dataFormatada = pensamento.data.toLocaleDateString('pt-BR', options);
        const dataRegex = dataFormatada.replace(/^(\w)/, (match) => match.toUpperCase()); // Coloca o primeiro parametro Maiusculo com REGEX

        pensamentoData.textContent = dataRegex;
        pensamentoData.classList.add("pensamento-data");

        const pensamentoConteudo = document.createElement("div");
        pensamentoConteudo.textContent = pensamento.conteudo;
        pensamentoConteudo.classList.add("pensamento-conteudo");

        const botaoEditar = document.createElement("button");
        botaoEditar.classList.add("botao-editar");
        botaoEditar.onclick = () => {
            ui.preencherFormulario(pensamento.id);
            document.getElementById("pensamento-conteudo").focus();
        }

        const botaoExcluir = document.createElement("button");
        botaoExcluir.classList.add("botao-excluir");
        botaoExcluir.onclick = async () => {
            try {
                await api.excluirPensamento(pensamento.id);
                ui.renderizarPensamentos;
            } catch (error) {
                alert("Erro ao excluir pensamento")
            }
        }

        const botaoFavorito = document.createElement("button");
        botaoFavorito.classList.add("botao-favorito");
        botaoFavorito.onclick = async () => {
            try {
                api.atualizarFavorito(pensamento.id, !pensamento.favorito);
                ui.renderizarPensamentos()
            } catch (error) {
                alert("Erro ao atualizar pensamento");
            }
        }

        const iconeEditar = document.createElement("img");
        iconeEditar.src = "assets/imagens/icone-editar.png";
        iconeEditar.alt = "editar";
        botaoEditar.appendChild(iconeEditar);

        const iconeExcluir = document.createElement("img");
        iconeExcluir.src = "assets/imagens/icone-excluir.png";
        iconeExcluir.alt = "excluir";
        botaoExcluir.appendChild(iconeExcluir);

        const iconeFavorito = document.createElement("img");
        iconeFavorito.src = pensamento.favorito ? "assets/imagens/favorite.png" : "assets/imagens/favorite_outline.png";
        iconeFavorito.alt = "favoritar";
        botaoFavorito.appendChild(iconeFavorito);


        const icones = document.createElement("div");
        icones.classList.add("icones");
        icones.appendChild(botaoFavorito);
        icones.appendChild(botaoEditar);
        icones.appendChild(botaoExcluir);

        li.appendChild(iconeAspas);
        li.appendChild(pensamentoConteudo);
        li.appendChild(pensamentoAutoria);
        li.appendChild(pensamentoData);
        li.appendChild(icones);

        listaPensamentos.appendChild(li);
        
    }
}

export default ui;