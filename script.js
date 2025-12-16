// ===============================
// Calculadora de CR
// - Modo "Período": disciplinas (créditos + nota)
// - Modo "Geral": períodos (período + créditos do período + CR do período)
// - Excluir linha (disciplina/período)
// ===============================

const MAX_DISCIPLINAS = 10;
const MAX_PERIODOS = 20;

const modoSelect = document.getElementById("modo");

const secPeriodo = document.getElementById("sec-periodo");
const secGeral = document.getElementById("sec-geral");

const disciplinasContainer = document.getElementById("disciplinas");
const periodosContainer = document.getElementById("periodos");

const btnAdicionarDisciplina = document.getElementById("adicionar");
const btnAdicionarPeriodo = document.getElementById("adicionarPeriodo");

const btnCalcular = document.getElementById("calcular");
const btnLimpar = document.getElementById("limpar");

const tituloResultado = document.getElementById("tituloResultado");
const resultadoEl = document.getElementById("resultado");

function ensureAtLeastOneRow(container, type) {
  const count = container.querySelectorAll(`.${type}`).length;
  if (count > 0) return;

  if (type === "disciplina") container.appendChild(createDisciplinaRow());
  if (type === "periodo") container.appendChild(createPeriodoRow());
}

function createDisciplinaRow() {
  const row = document.createElement("div");
  row.className = "disciplina linha";

  const inputCreditos = document.createElement("input");
  inputCreditos.type = "number";
  inputCreditos.placeholder = "Quantidade de Créditos (ex: 4)";
  inputCreditos.classList.add("creditos");
  inputCreditos.min = "1";
  inputCreditos.required = true;

  const inputNota = document.createElement("input");
  inputNota.type = "number";
  inputNota.placeholder = "Nota Final (ex: 8.5)";
  inputNota.classList.add("nota");
  inputNota.step = "0.1";
  inputNota.min = "0";
  inputNota.max = "10";
  inputNota.required = true;

  const btnExcluir = document.createElement("button");
  btnExcluir.type = "button";
  btnExcluir.className = "excluir";
  btnExcluir.title = "Excluir disciplina";
  btnExcluir.setAttribute("aria-label", "Excluir disciplina");
  btnExcluir.innerHTML = '<i class="fas fa-trash"></i>';

  row.appendChild(inputCreditos);
  row.appendChild(inputNota);
  row.appendChild(btnExcluir);

  return row;
}

function createPeriodoRow() {
  const row = document.createElement("div");
  row.className = "periodo linha";

  const inputPeriodo = document.createElement("input");
  inputPeriodo.type = "text";
  inputPeriodo.placeholder = "Período (ex: 2024/2)";
  inputPeriodo.classList.add("periodoNome");
  inputPeriodo.maxLength = 12;
  inputPeriodo.required = true;

  const inputCreditos = document.createElement("input");
  inputCreditos.type = "number";
  inputCreditos.placeholder = "Créditos do Período (ex: 14)";
  inputCreditos.classList.add("periodoCreditos");
  inputCreditos.min = "1";
  inputCreditos.required = true;

  const inputCR = document.createElement("input");
  inputCR.type = "number";
  inputCR.placeholder = "CR do Período (ex: 68.91)";
  inputCR.classList.add("periodoCR");
  inputCR.step = "0.01";
  inputCR.min = "0";
  inputCR.max = "1000";
  inputCR.required = true;

  const btnExcluir = document.createElement("button");
  btnExcluir.type = "button";
  btnExcluir.className = "excluir";
  btnExcluir.title = "Excluir período";
  btnExcluir.setAttribute("aria-label", "Excluir período");
  btnExcluir.innerHTML = '<i class="fas fa-trash"></i>';

  row.appendChild(inputPeriodo);
  row.appendChild(inputCreditos);
  row.appendChild(inputCR);
  row.appendChild(btnExcluir);

  return row;
}

// Alternar modo
modoSelect.addEventListener("change", () => {
  const modo = modoSelect.value;

  if (modo === "periodo") {
    secPeriodo.classList.remove("hidden");
    secGeral.classList.add("hidden");
    tituloResultado.childNodes[0].textContent = "Seu CR: ";
  } else {
    secPeriodo.classList.add("hidden");
    secGeral.classList.remove("hidden");
    tituloResultado.childNodes[0].textContent = "Seu CR Geral: ";
  }

  resultadoEl.textContent = "0.00";
});

// Adicionar disciplina
btnAdicionarDisciplina.addEventListener("click", () => {
  const total = disciplinasContainer.querySelectorAll(".disciplina").length;
  if (total >= MAX_DISCIPLINAS) {
    alert(`Você já adicionou o máximo de ${MAX_DISCIPLINAS} disciplinas.`);
    return;
  }
  disciplinasContainer.appendChild(createDisciplinaRow());
});

// Adicionar período
btnAdicionarPeriodo.addEventListener("click", () => {
  const total = periodosContainer.querySelectorAll(".periodo").length;
  if (total >= MAX_PERIODOS) {
    alert(`Você já adicionou o máximo de ${MAX_PERIODOS} períodos.`);
    return;
  }
  periodosContainer.appendChild(createPeriodoRow());
});

// Excluir disciplina (delegação)
disciplinasContainer.addEventListener("click", (event) => {
  const btn = event.target.closest(".excluir");
  if (!btn) return;

  const row = btn.closest(".disciplina");
  if (!row) return;

  row.remove();
  ensureAtLeastOneRow(disciplinasContainer, "disciplina");
});

// Excluir período (delegação)
periodosContainer.addEventListener("click", (event) => {
  const btn = event.target.closest(".excluir");
  if (!btn) return;

  const row = btn.closest(".periodo");
  if (!row) return;

  row.remove();
  ensureAtLeastOneRow(periodosContainer, "periodo");
});

// Calcular
btnCalcular.addEventListener("click", () => {
  const modo = modoSelect.value;
  if (modo === "periodo") calcularCRPeriodo();
  else calcularCRGeral();
});

function calcularCRPeriodo() {
  const creditos = disciplinasContainer.getElementsByClassName("creditos");
  const notas = disciplinasContainer.getElementsByClassName("nota");

  let somaNotasPesadas = 0;
  let somaCreditos = 0;

  if (creditos.length === 0) {
    alert("Por favor, adicione ao menos uma disciplina antes de calcular.");
    return;
  }

  for (let i = 0; i < creditos.length; i++) {
    const credito = parseInt(creditos[i].value, 10);
    const nota = parseFloat(notas[i].value);

    if (isNaN(credito) || isNaN(nota)) {
      alert(
        "Por favor, preencha todos os campos corretamente (créditos e nota)."
      );
      return;
    }

    somaNotasPesadas += credito * nota;
    somaCreditos += credito;
  }

  if (somaCreditos === 0) {
    alert("A soma dos créditos não pode ser zero.");
    return;
  }

  const cr = somaNotasPesadas / somaCreditos;
  resultadoEl.textContent = cr.toFixed(2);
}

function calcularCRGeral() {
  const rows = periodosContainer.querySelectorAll(".periodo");
  let somaPesos = 0;
  let somaPonderada = 0;

  if (!rows.length) {
    alert("Por favor, adicione ao menos um período antes de calcular.");
    return;
  }

  for (const row of rows) {
    const periodoNome = row.querySelector(".periodoNome").value.trim();
    const creditosPeriodo = parseInt(
      row.querySelector(".periodoCreditos").value,
      10
    );
    const crPeriodo = parseFloat(row.querySelector(".periodoCR").value);

    if (!periodoNome) {
      alert('Preencha o campo "Período" (ex: 2024/2).');
      return;
    }

    if (isNaN(creditosPeriodo) || isNaN(crPeriodo)) {
      alert('Preencha corretamente "Créditos do Período" e "CR do Período".');
      return;
    }

    somaPonderada += creditosPeriodo * crPeriodo;
    somaPesos += creditosPeriodo;
  }

  if (somaPesos === 0) {
    alert("A soma dos créditos dos períodos não pode ser zero.");
    return;
  }

  const crGeral = somaPonderada / somaPesos;
  resultadoEl.textContent = crGeral.toFixed(2);
}

// Limpar
btnLimpar.addEventListener("click", () => {
  const modo = modoSelect.value;

  if (modo === "periodo") {
    disciplinasContainer.innerHTML = "";
    disciplinasContainer.appendChild(createDisciplinaRow());
    tituloResultado.childNodes[0].textContent = "Seu CR: ";
  } else {
    periodosContainer.innerHTML = "";
    periodosContainer.appendChild(createPeriodoRow());
    tituloResultado.childNodes[0].textContent = "Seu CR Geral: ";
  }

  resultadoEl.textContent = "0.00";
});
