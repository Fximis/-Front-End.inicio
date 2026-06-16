function mascaraCPF(input) {
    let valor = input.value.replace(/\D/g, '');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    input.value = valor;
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false;
    }
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(9))) {
        return false;
    }
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(10))) {
        return false;
    }
    return true;
}

function clicarValidar() {
    // Captura o valor do campo e salva na variável local
    const inputCpf = document.getElementById('campoCpf');
    const cpfInformado = inputCpf.value;

    // Elemento onde o status será modificado
    const elementoStatus = document.getElementById('statusMensagem');
    // Passa a variável salva como parâmetro
    const resultado = validarCPF(cpfInformado);
    // Modifica as classes CSS dependendo do resultado do retorno
    if (resultado === true) {
        elementoStatus.textContent = "✓ Acesso Autorizado / CPF Válido";
        elementoStatus.className = "status-box status-valido";
    } else {
        elementoStatus.textContent = "✕ Falha Crítica / CPF Inválido";
        elementoStatus.className = "status-box status-invalido";
    }
}