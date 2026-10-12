// GRÁFICO DAS INICIATIVAS SMILE
// Integração com a biblioteca Chart.js

let instanciaGraficoSmile = null;

function criarGraficoSmile() {

    const secao = document.querySelector("#acoes");

    if (!secao || typeof Chart === "undefined") {
        return;
    }

    // Evita criar o gráfico duas vezes na mesma seção
    if (document.getElementById("graficoSmile")) {
        return;
    }

    const titulo = document.createElement("h3");
    titulo.textContent = "Distribuição ilustrativa das ações sociais";

    const canvas = document.createElement("canvas");
    canvas.id = "graficoSmile";

    secao.appendChild(titulo);
    secao.appendChild(canvas);

    // Libera a instância anterior, se existir
    if (instanciaGraficoSmile) {
        instanciaGraficoSmile.destroy();
    }

    instanciaGraficoSmile = new Chart(canvas, {
        type: "bar",
        data: {
            labels: [
                "Saúde",
                "Saúde bucal",
                "Alimentação",
                "Doações",
                "Medicamentos",
                "Acolhimento"
            ],
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

// Escuta o evento enviado pelo arquivo navegacao.js
document.addEventListener("smile:rotaAtualizada", function(evento) {

    if (evento.detail.rota === "iniciativas") {
        criarGraficoSmile();
    }
});

// Exibe o gráfico se a página já estiver em Iniciativas
if (window.location.hash === "#iniciativas") {
    criarGraficoSmile();
}