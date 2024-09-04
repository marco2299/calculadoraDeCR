document.getElementById('adicionar').addEventListener('click', function() {
    const disciplinaContainer = document.getElementById('disciplinas');
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
});

document.getElementById('calcular').addEventListener('click', function() {
    const creditos = document.getElementsByClassName('creditos');
    const notas = document.getElementsByClassName('nota');
    let somaNotasPesadas = 0;
    let somaCreditos = 0;

    for (let i = 0; i < creditos.length; i++) {
        const credito = parseInt(creditos[i].value);
        const nota = parseFloat(notas[i].value);
        
        if (isNaN(credito) || isNaN(nota)) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        somaNotasPesadas += credito * nota;
        somaCreditos += credito;
    }

    if (somaCreditos === 0) {
        alert('A soma dos créditos não pode ser zero.');
        return;
    }

    const cr = somaNotasPesadas / somaCreditos;
    document.getElementById('resultado').textContent = cr.toFixed(2);
});
