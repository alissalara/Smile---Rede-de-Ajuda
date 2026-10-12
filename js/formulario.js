// VALIDAÇÃO DO FORMULÁRIO SMILE

function validarCampo(campo) {

    if (!campo.matches("input, select, textarea")) {
        return true;
    }

    let mensagem = campo.nextElementSibling;

    if (!mensagem || !mensagem.classList.contains("mensagem-erro")) {
        mensagem = document.createElement("small");
        mensagem.classList.add("mensagem-erro");
        campo.insertAdjacentElement("afterend", mensagem);
    }

    const valido = campo.checkValidity();

    campo.classList.toggle("valido", valido);
    campo.classList.toggle("invalido", !valido);

    if (valido) {
        mensagem.textContent = "";
    } else if (campo.validity.valueMissing) {
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

    return valido;
}

// Ativa os eventos quando o formulário estiver disponível
function iniciarFormulario() {

    const formulario = document.querySelector('form[action="#"]');

    if (!formulario || formulario.dataset.inicializado === "true") {
        return;
    }

    formulario.dataset.inicializado = "true";

    formulario.addEventListener("input", function(evento) {
        validarCampo(evento.target);
    });

    formulario.addEventListener("change", function(evento) {
        validarCampo(evento.target);
    });

    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault();

        const campos = formulario.querySelectorAll(
            "input, select, textarea"
        );

        let formularioValido = true;
        let primeiroInvalido = null;

        campos.forEach(function(campo) {
            if (!validarCampo(campo)) {
                formularioValido = false;

                if (!primeiroInvalido) {
                    primeiroInvalido = campo;
                }
            }
        });

        if (!formularioValido) {
            primeiroInvalido.focus();
            return;
        }

        const toast = document.querySelector("#toast");

        if (toast) {
            toast.textContent =
                "✓ Formulário validado! Nenhum dado foi enviado.";
            toast.classList.add("mostrar");

            setTimeout(function() {
                toast.classList.remove("mostrar");
            }, 3000);
        }

        console.log("Formulário validado com sucesso!");
    });
}

// Formulário presente desde o carregamento inicial
iniciarFormulario();

// Formulário inserido dinamicamente pela navegação SPA
document.addEventListener("smile:rotaAtualizada", function(evento) {
    if (evento.detail.rota === "engajamento") {
        iniciarFormulario();
    }
});