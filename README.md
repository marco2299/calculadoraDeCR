# Calculadora de CRA

Este projeto é uma **calculadora de CR/CRA** que permite calcular:

- **CR do Período (por disciplinas)**: você informa **créditos** e **nota final (NE)** de cada disciplina do semestre.
- **CR Geral (por períodos)**: você informa, para cada período, o **total de créditos do período** e o **CR daquele período**, e o sistema calcula o **CR Geral** por **média ponderada**.

## Base normativa (fórmula utilizada)

As informações e a fórmula utilizada neste projeto foram baseadas no **Art. 113 da Resolução CEPE nº 473, de 12 de dezembro de 2018**, que define o CRA como:

> **CRA = Σ (NE × CS) / Σ CS**  
> Onde: **NE** é a nota final e **CS** é a carga horária semanal do componente curricular (em número de aulas).

Referência para consulta:  
https://kb.ufla.br/books/duvidas-frequentes-faq/page/duvida-sobre-calculo-de-cra-de-discente-de-graduacao-no-sig

> Observação: esta calculadora é uma ferramenta de apoio e **não substitui** os sistemas oficiais da instituição.

## Funcionalidades

### Modo 1 — CR do Período (por disciplinas)

- Adicionar disciplinas
- **Excluir disciplina** (caso tenha adicionado sem querer)
- Calcula o CR do período usando média ponderada: `Σ(créditos × nota) / Σ(créditos)`

**Campos:**

- **Quantidade de Créditos**: créditos da disciplina (ex.: 4)
- **Nota Final (NE)**: nota final da disciplina (ex.: 8,5)

### Modo 2 — CR Geral (por períodos)

- Adicionar períodos
- **Excluir período**
- Calcula o CR Geral como **média ponderada dos CRs por período**, usando como peso o **total de créditos cursados em cada período**.

**Campos:**

- **Período**: ex.: `2024/2`
- **Créditos do Período**: soma dos créditos das disciplinas cursadas no período.  
  Ex.: Matemática: 4, Grafos: 6, Redes: 4 ⇒ **Total = 14**
- **CR do Período**: o CR que aparece no seu boletim/sistema para aquele período (ex.: 68,91)

## Tecnologias utilizadas

- **HTML5**
- **CSS3**
- **JavaScript**

## Como usar

### Opção 1 — Usar online (GitHub Pages)

1. Acesse: https://marco2299.github.io/calculadoraDeCR
2. Selecione o **Modo de cálculo**
3. Preencha os campos e clique em **Calcular**

### Opção 2 — Rodar no seu computador

1. Baixe/clon​e este repositório
2. Abra o arquivo `index.html` no navegador (Chrome, Edge, Firefox etc.)
3. Selecione o **Modo de cálculo**, preencha e clique em **Calcular**

## Estrutura do projeto

- `index.html` — interface do usuário
- `style.css` — estilos e responsividade
- `script.js` — lógica de cálculo, adicionar/excluir linhas e troca de modos

## Autor

LinkedIn: https://www.linkedin.com/in/marco-antonio-b092691b4/
