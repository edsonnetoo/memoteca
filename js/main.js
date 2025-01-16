import ui from "./ui.js"
import api from "./api.js"

const botaoCancelar = document.getElementById("botao-cancelar");
const pensamentoConteudoInput = document.getElementById("pensamento-conteudo");
const pensamentoAutoriaInput = document.getElementById("pensamento-autoria");


document.addEventListener("DOMContentLoaded", () => {
    ui.renderizarPensamentos();

    const formularioPensamento = document.getElementById("pensamento-form");
    formularioPensamento.addEventListener("submit", manipularSubimissaoForm)
});

async function manipularSubimissaoForm(event) {
    event.preventDefault();
    const id = document.getElementById("pensamento-id").value;
    const conteudo = document.getElementById("pensamento-conteudo").value;
    const autoria = document.getElementById("pensamento-autoria").value;

    try {
        await api.salvarPensamento({conteudo, autoria});
        ui.renderizarPensamentos();
    } 
    catch (error) {
        alert("Erro ao salvar pensamento!");
    }
}

botaoCancelar.addEventListener("click", () => {
    pensamentoConteudoInput.value = "";
    pensamentoAutoriaInput.value = "";
})