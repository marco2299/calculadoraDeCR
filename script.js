// Função para adicionar nova disciplina
document.getElementById('adicionar').addEventListener('click', function() {
    console.log('Botão "Adicionar Disciplina" clicado');  // Log para depuração

    const disciplinaContainer = document.getElementById('disciplinas');

    // Verifica se já existem 5 disciplinas
    if (document.querySelectorAll('.disciplina').length >= 5) {
        alert('Você já adicionou o máximo de 5 disciplinas.');
        return;
    }

    // Cria um novo elemento de disciplina
    const novaDisciplina = document.createElement('div');
    novaDisciplina.classList.add('disciplina');

    // Campo de entrada de créditos
    const inputCreditos = document.createElement('input');
    inputCreditos.type = 'number';
    inputCreditos.placeholder = 'Créditos';
    inputCreditos.classList.add('creditos');
    inputCreditos.min = '1';
    inputCreditos.required = true;

    // Campo de entrada de nota
    const inputNota = document.createElement('input');
    inputNota.type = 'number';
    inputNota.placeholder = 'Nota';
    inputNota.classList.add('nota');
    inputNota.step = '0.1';
    inputNota.min = '0';
    inputNota.max = '10';
    inputNota.required = true;

    // Adiciona os campos ao elemento de disciplina
    novaDisciplina.appendChild(inputCreditos);
    novaDisciplina.appendChild(inputNota);

    // Adiciona o elemento de disciplina ao container
    disciplinaContainer.appendChild(novaDisciplina);
});

// Função para calcular o CR
document.getElementById('calcular').addEventListener('click', function() {
    console.log('Botão "Calcular CR" clicado');  // Log para depuração

    const creditos = document.getElementsByClassName('creditos');
    const notas = document.getElementsByClassName('nota');
    let somaNotasPesadas = 0;
    let somaCreditos = 0;

    // Verifica se existem disciplinas adicionadas
    if (creditos.length === 0) {
        alert('Por favor, adicione ao menos uma disciplina antes de calcular.');
        return;
    }

    // Loop através de todos os campos de créditos e notas
    for (let i = 0; i < creditos.length; i++) {
        const credito = parseInt(creditos[i].value);
        const nota = parseFloat(notas[i].value);
        
        // Verifica se os campos estão preenchidos corretamente
        if (isNaN(credito) || isNaN(nota)) {
            alert('Por favor, preencha todos os campos corretamente.');
            console.error('Campo inválido: Crédito ou Nota não preenchido corretamente.');  // Log de erro para depuração
            return;
        }

        // Realiza o cálculo do somatório de notas e créditos
        somaNotasPesadas += credito * nota;
        somaCreditos += credito;
    }

    // Verifica se a soma dos créditos é zero
    if (somaCreditos === 0) {
        alert('A soma dos créditos não pode ser zero.');
        console.error('Erro: Soma dos créditos é zero.');  // Log de erro para depuração
        return;
    }

    // Calcula o CR
    const cr = somaNotasPesadas / somaCreditos;

    // Exibe o resultado
    document.getElementById('resultado').textContent = cr.toFixed(2);
    console.log(`CR Calculado: ${cr.toFixed(2)}`);  // Log para depuração
});

// Função para limpar todos os dados
document.getElementById('limpar').addEventListener('click', function() {
    console.log('Botão "Limpar" clicado');  // Log para depuração

    // Limpa todas as disciplinas adicionadas
    const disciplinaContainer = document.getElementById('disciplinas');
    disciplinaContainer.innerHTML = '';

    // Adiciona uma disciplina vazia inicial
    const novaDisciplina = document.createElement('div');
    novaDisciplina.classList.add('disciplina');

    const inputCreditos = document.createElement('input');
    inputCreditos.type = 'number';
    inputCreditos.placeholder = 'Créditos';
    inputCreditos.classList.add('creditos');
    inputCreditos.min = '1';
    inputCreditos.required = true;

    const inputNota = document.createElement('input');
    inputNota.type = 'number';
    inputNota.placeholder = 'Nota';
    inputNota.classList.add('nota');
    inputNota.step = '0.1';
    inputNota.min = '0';
    inputNota.max = '10';
    inputNota.required = true;

    novaDisciplina.appendChild(inputCreditos);
    novaDisciplina.appendChild(inputNota);

    disciplinaContainer.appendChild(novaDisciplina);

    // Zera o resultado do CR
    document.getElementById('resultado').textContent = '0.00';
    console.log('Dados limpos e CR zerado.');  // Log para depuração
});
