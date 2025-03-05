import ui from "./ui.js"
import api from "./api.js"

const botaoCancelar = document.getElementById("botao-cancelar");
const pensamentoConteudoInput = document.getElementById("pensamento-conteudo");
const pensamentoAutoriaInput = document.getElementById("pensamento-autoria");


document.addEventListener("DOMContentLoaded", () => {
    ui.renderizarPensamentos();

    const formularioPensamento = document.getElementById("pensamento-form");
    const inputBusca = document.getElementById("campo-busca");

    inputBusca.addEventListener("input", manipularBusca);
    formularioPensamento.addEventListener("submit", manipularSubimissaoForm)
});

async function manipularSubimissaoForm(event) {
    event.preventDefault();
    const id = document.getElementById("pensamento-id").value;
    const conteudo = document.getElementById("pensamento-conteudo").value;
    const autoria = document.getElementById("pensamento-autoria").value;
    const data = document.getElementById("pensamento-data").value;

    if(!validarData(data)) {
        alert("Não é permitido o cadastro de datas futuras");
    }

    try {
        if (id) {
            await api.editarPensamento({ id, conteudo, autoria, data});
            ui.renderizarPensamentos();
        } else {
            await api.salvarPensamento({conteudo, autoria, data});
            ui.renderizarPensamentos();
        }
    } 
    catch (error) {
        alert("Erro ao salvar pensamento!");
    }
}

async function manipularBusca() {
    const termoBusca = document.getElementById("campo-busca").value;
    try {
        const pensamentosFiltrados = await api.buscarPensamentosPorTermo(termoBusca);
        ui.renderizarPensamentos(pensamentosFiltrados);
    } catch (error) {
        alert("Erro ao realizar busca");
    }
}

function validarData(data) {
    const dataAtual = new Date();
    const dataInserida = new Date(data);
    return dataInserida <= dataAtual;
}

botaoCancelar.addEventListener("click", () => {
    pensamentoConteudoInput.value = "";
    pensamentoAutoriaInput.value = "";
})