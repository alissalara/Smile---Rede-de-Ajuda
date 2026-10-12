// ARMAZENAMENTO LOCAL DO SMILE

function salvarNavegacao() {

    const rota = window.location.hash.substring(1) || "inicio";

    // Salva a última rota visitada
    localStorage.setItem("ultimaRotaSmile", rota);

    // Recupera o histórico existente
    const historico = JSON.parse(
        localStorage.getItem("historicoSmile") || "[]"
    );

    // Acrescenta a rota atual
    historico.push(rota);

    // Mantém somente as últimas 10 rotas
    if (historico.length > 10) {
        historico.shift();
    }

    // Salva o histórico em formato de string
    localStorage.setItem(
        "historicoSmile",
        JSON.stringify(historico)
    );
}

// Registra mudanças de rota
window.addEventListener("hashchange", salvarNavegacao);

// Recupera a última rota salva
const ultimaRotaSalva = localStorage.getItem("ultimaRotaSmile");

// Restaura a navegação quando não existe rota na URL
if (
    document.getElementById("conteudo-principal") &&
    ultimaRotaSalva &&
    !window.location.hash
) {
    window.location.hash = ultimaRotaSalva;
}

// Recupera o histórico de navegação
const historicoSalvo = JSON.parse(
    localStorage.getItem("historicoSmile") || "[]"
);

console.log("Histórico de navegação Smile:", historicoSalvo);