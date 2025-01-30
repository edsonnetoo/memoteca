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

    try {
        if (id) {
            await api.editarPensamento({ id, conteudo, autoria});
            ui.renderizarPensamentos();
        } else {
            await api.salvarPensamento({conteudo, autoria});
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

botaoCancelar.addEventListener("click", () => {
    pensamentoConteudoInput.value = "";
    pensamentoAutoriaInput.value = "";
})