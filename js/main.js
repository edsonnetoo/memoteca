import ui from "./ui.js"
import api from "./api.js"

const pensamentosSet = new Set();

async function adicionarChaveAoPensamento() {
    try {
        const pensamentos = await api.buscarPensamentos();
        pensamentos.forEach(pensamento => {
            const chavePensamento = `${pensamento.conteudo.trim().toLowerCase()}-${pensamento.autoria.trim().toLowerCase()}`;
            pensamentosSet.add(chavePensamento);
        })
    } catch (error) {
        alert("erro ao adiconar chave ao pensamento")
    }
}


function removerEspacos(string) {
    return string.replaceAll(/\s+/g, '');
}

const regexConteudo = /^[A-Za-z\s]{10,}$/
const regexAutoria = /^[A-Za-z]{3,15}$/

function validarConteudo(conteudo) {
    return regexConteudo.test(conteudo);
}

function validarAutoria(autoria) {
    return regexAutoria.test(autoria);
}

const botaoCancelar = document.getElementById("botao-cancelar");
const pensamentoConteudoInput = document.getElementById("pensamento-conteudo");
const pensamentoAutoriaInput = document.getElementById("pensamento-autoria");


document.addEventListener("DOMContentLoaded", () => {
    ui.renderizarPensamentos();

    adicionarChaveAoPensamento();

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

    const conteudoSemEspacos = removerEspacos(conteudo);
    const autoriaSemEspacos = removerEspacos(autoria);


    if(!validarConteudo(conteudoSemEspacos)) {
        alert("É permitida a inclusão apenas de letras e espaços com no minímo 10 caracteres");
        return
    }

    if(!validarAutoria(autoriaSemEspacos)) {
        alert("É permitida a inclusão de autoria com no minimo 3 caracteres e sem espaços");
        return
    }

    if(!validarData(data)) {
        alert("Não é permitido o cadastro de datas futuras");
    }

    const chaveNovoPensamento = `${conteudo.trim().toLowerCase()}-${autoria.trim().toLowerCase()}`;

    if(pensamentosSet.has(chaveNovoPensamento)) {
        alert("Esse pensamento já existe");
        return
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