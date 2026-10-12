// NAVEGAÇÃO SPA DO SMILE

const conteudoPrincipal = document.getElementById("conteudo-principal");

const paginaInicial = conteudoPrincipal
    ? conteudoPrincipal.innerHTML
    : "";

// Dados das iniciativas
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

// Gera os cartões das iniciativas
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

// Atualiza o conteúdo principal
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
            <section id="acoes" class="grid">
                <h2 class="col-12">Nossas iniciativas</h2>
                <p class="col-12">
                    Conheça as ações sociais desenvolvidas pela Smile.
                </p>
                ${criarCards()}
            </section>
        `;

    } else if (rota === "engajamento") {

        try {
            const resposta = await
    fetch("cadastro.html");

            if (!resposta.ok) {
                throw new Error("Não foi possível carregar o cadastro.");
            }
        
            const html = await
    resposta.text();
            const documento = new
    DOMParser()
                .parseFromString(html,"text/html");
            const cadastro = documento.querySelector("main");
            if (!cadastro) {
                throw new Error("Conteúdo do cadastro não encontrado.");
            }
    
            conteudoPrincipal.innerHTML = cadastro.innerHTML;

        } catch (erro) {
            console.error(erro);
            conteudoPrincipal.textContent = 
                "Não foi possível carregar o formulário.";
            
        }
    }

    // Avisa aos outros scripts que a interface foi atualizada
    document.dispatchEvent(new CustomEvent("smile:rotaAtualizada", {
        detail: { rota: rota }
    }));
}

// Configura os links de navegação
document.querySelectorAll("[data-rota]").forEach(function(link) {

    link.addEventListener("click", function(evento) {

        evento.preventDefault();

        const rota = link.dataset.rota;

        if (window.location.hash === "#" + rota) {
            mostrarConteudo(rota);
        } else {
            window.location.hash = rota;
        }
    });
});

// Atualiza a interface quando a rota muda
window.addEventListener("hashchange", function() {

    const rota = window.location.hash.substring(1) || "inicio";

    mostrarConteudo(rota);
});

// Inicializa a navegação
const rotaInicial = window.location.hash.substring(1) || "inicio";

mostrarConteudo(rotaInicial);