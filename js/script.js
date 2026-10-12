const botaoMenu = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

if (botaoMenu && menu) {

    botaoMenu.addEventListener("click", function () {

        menu.classList.toggle("ativo");

        const menuAberto = menu.classList.contains("ativo");

botaoMenu.setAttribute("aria-expanded", String(menuAberto));

    });

}

// Localiza o formulário de cadastro
const formulario = document.querySelector('form[action="#"]');
const toast = document.querySelector("#toast");

// Função reutilizável para validar cada campo
function validarCampo(campo) {

    if (!campo.matches("input, select, textarea")) {
        return true;
    }

    // Procura uma mensagem de erro existente
    let mensagem = campo.nextElementSibling;

    if (!mensagem || !mensagem.classList.contains("mensagem-erro")) {
        mensagem = document.createElement("small");
        mensagem.classList.add("mensagem-erro");
        campo.insertAdjacentElement("afterend", mensagem);
    }

    const valido = campo.checkValidity();

    if (valido) {

        campo.classList.remove("invalido");
        campo.classList.add("valido");

        mensagem.textContent = "";

    } else {

        campo.classList.remove("valido");
        campo.classList.add("invalido");

        if (campo.validity.valueMissing) {
            mensagem.textContent = "Este campo é obrigatório.";
        } else if (campo.validity.tooShort) {
            mensagem.textContent = "Informe pelo menos " +
                campo.minLength + " caracteres.";
        } else if (campo.validity.typeMismatch) {
            mensagem.textContent = "Digite um valor no formato correto.";
        } else if (campo.validity.patternMismatch) {
            mensagem.textContent = "O formato informado é inválido.";
        } else {
            mensagem.textContent = "Verifique este campo.";
        }

    }

    return valido;
}

if (formulario) {

    // Validação durante o preenchimento
    formulario.addEventListener("input", function(evento) {
        validarCampo(evento.target);
    });

    // Validação ao alterar seleções
    formulario.addEventListener("change", function(evento) {
        validarCampo(evento.target);
    });

    // Validação ao tentar enviar o formulário
    formulario.addEventListener("submit", function(evento) {

        evento.preventDefault();

        const campos = formulario.querySelectorAll(
            "input, select, textarea"
        );

        let formularioValido = true;
        let primeiroInvalido = null;

        campos.forEach(function(campo) {

            const valido = validarCampo(campo);

            if (!valido) {
                formularioValido = false;

                if (!primeiroInvalido) {
                    primeiroInvalido = campo;
                }
            }

        });

        if (formularioValido) {

            if (toast) {
                toast.classList.add("mostrar");

                setTimeout(function() {
                    toast.classList.remove("mostrar");
                }, 3000);
            }

            console.log("Formulário validado com sucesso!");

        } else {

            // Leva o usuário ao primeiro campo incorreto
            primeiroInvalido.focus();

        }

    });

}

// Seleciona todos os links que possuem data-rota
const links = document.querySelectorAll("[data-rota]");

// Percorre cada link encontrado
links.forEach(function(link) {

    // Identifica quando o usuário clica no link
    link.addEventListener("click", function(evento) {

        // Impede a navegação tradicional
        evento.preventDefault();

        // Identifica a rota escolhida
        const rota = link.dataset.rota;

        // Mostra a rota no console
        if (window.location.hash === "#" + rota)
        {
            mostrarConteudo(rota);
        } else {
            window.location.hash = rota;
        }

    });

});

// Localiza a área principal do site
const conteudoPrincipal = document.getElementById("conteudo-principal");

// Guarda o conteúdo original da página inicial
const paginaInicial = 
conteudoPrincipal ?
conteudoPrincipal.innerHTML:"";

// Função responsável pela navegação
async function mostrarConteudo(rota) {
    if (!conteudoPrincipal) {
        return;
    }

    if (rota === "inicio") {

        conteudoPrincipal.innerHTML = paginaInicial;

    } else if (rota === "sobre") {

        conteudoPrincipal.innerHTML = paginaInicial;

        document.getElementById("sobre")?.scrollIntoView();

    } else if (rota === "contato") {

        conteudoPrincipal.innerHTML = paginaInicial;

        document.getElementById("contato")?.scrollIntoView();

    } else if (rota === "iniciativas") {

        conteudoPrincipal.innerHTML = `
            <section id="acoes"
    class="grid">
                <h2 class="col-12">Nossas iniciativas</h2>
                <p class="col-12">Conheça as ações sociais desenvolvidas pela Smile.</p>
                ${criarCards()}
            </section>
        `;

    } else if (rota === "engajamento") {

        conteudoPrincipal.innerHTML = `
            <section>
                <h2>Faça parte da Smile</h2>
                <p>Participe como voluntário ou contribua
                com nossas campanhas de doação.</p>
            </section>
        `;

    }
}

// Identifica mudanças na rota do navegador
window.addEventListener("hashchange", function() {

    const rota = window.location.hash.substring(1) || "inicio";

    mostrarConteudo(rota);

});

// Exibe a rota inicial quando a página é aberta
const rotaInicial = window.location.hash.substring(1) || "inicio";

// Dados das ações sociais da Smile
const acoesSociais = [
    {
        titulo: "Saúde",
        descricao: "Avaliações e triagens realizadas por profissionais voluntários."
    },
    {
        titulo: "Saúde bucal",
        descricao: "Atendimento e orientações odontológicas."
    },
    {
        titulo: "Alimentação",
        descricao: "Preparação de refeições e atividades de alimentação."
    },
    {
        titulo: "Doações",
        descricao: "Arrecadação de roupas, brinquedos e alimentos."
    },
    {
        titulo: "Medicamentos",
        descricao: "Apoio na aquisição de medicamentos necessários."
    },
    {
        titulo: "Acolhimento",
        descricao: "Atividades de companhia, leitura e convivência."
    }
];

// Cria os cartões das ações sociais
function criarCards() {

    return acoesSociais.map(function(acao) {

        return `
            <article class="col-4">
                <h3>${acao.titulo}</h3>
                <p>${acao.descricao}</p>
            </article>
        `;

    }).join("");

}

// Inicializa a navegação após carregar os dados
mostrarConteudo(rotaInicial);

// Salva a rota e o histórico de navegação
function salvarNavegacao() {

    const rota = window.location.hash.substring(1) || "inicio";

    localStorage.setItem("ultimaRotaSmile", rota);

    let historico = JSON.parse(
        localStorage.getItem("historicoSmile") || "[]"
    );

    historico.push(rota);

    if (historico.length > 10) {
        historico.shift();
    }

    localStorage.setItem(
        "historicoSmile",
        JSON.stringify(historico)
    );
}

// Salva os dados quando a rota muda
window.addEventListener("hashchange", salvarNavegacao);

// Recupera a última rota ao abrir a página
const ultimaRotaSalva = localStorage.getItem("ultimaRotaSmile");

if (conteudoPrincipal && ultimaRotaSalva && !window.location.hash) {
    window.location.hash = ultimaRotaSalva;
}

// Recupera o histórico salvo
const historicoSalvo = JSON.parse(
    localStorage.getItem("historicoSmile") || "[]"
);

console.log("Histórico Smile:", historicoSalvo);

// Integração com a biblioteca Chart.js
function criarGraficoSmile() {

    const graficoExistente = document.getElementById("graficoSmile");

    if (graficoExistente) {
        graficoExistente.remove();
    }

    const secao = document.querySelector("#acoes");

    if (!secao || typeof Chart === "undefined") {
        return;
    }

    const titulo = document.createElement("h3");
    titulo.textContent = "Distribuição ilustrativa das ações sociais";

    const canvas = document.createElement("canvas");
    canvas.id = "graficoSmile";

    secao.appendChild(titulo);
    secao.appendChild(canvas);

    new Chart(canvas, {
        type: "bar",
        data: {
            labels: acoesSociais.map(acao => acao.titulo),
            datasets: [{
                label: "Atividades demonstrativas",
                data: [12, 9, 15, 20, 8, 14],
                backgroundColor: "#2E7D6E"
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Atualiza o gráfico após mudanças de rota
window.addEventListener("hashchange", function() {
    if (window.location.hash === "#iniciativas") {
        criarGraficoSmile();
    }
});

// Inicializa o gráfico quando a página já abre em Iniciativas
if (window.location.hash === "#iniciativas") {
    criarGraficoSmile();
}