const FLOW_STEPS = [
  { number: '1', title: 'Escolher a base', note: 'Defina qual sistema responde melhor a sua pergunta.' },
  { number: '2', title: 'Definir abrangencia geografica', note: 'Decida se a comparacao principal sera por regiao, UF ou municipio.' },
  { number: '3', title: 'Selecionar variaveis', note: 'Monte a tabela com linha, coluna e conteudo.' },
  { number: '4', title: 'Definir periodo e filtros', note: 'Refine o recorte sem fragmentar demais a leitura.' },
  { number: '5', title: 'Visualizar a saida', note: 'Leia a tabela antes de exportar ou concluir.' }
];

const BASE_CARDS = [
  {
    title: 'Morbidade Hospitalar',
    when: 'Quando a pergunta gira em torno de internacoes, diagnosticos hospitalares e distribuicao territorial do evento.',
    answers: 'Quantas internacoes ocorreram, em quais locais, em quais faixas etarias e em qual periodo.',
    avoid: 'Nao confundir local de internacao com local de residencia sem conferir o recorte escolhido.'
  },
  {
    title: 'Producao Hospitalar (SIH/SUS)',
    when: 'Quando o foco e producao assistencial hospitalar, autorizacoes e uso de servicos do SUS.',
    answers: 'Volume de procedimentos, permanencia, gastos e padroes de atendimento hospitalar.',
    avoid: 'Evite tratar producao como sinonimo automatico de necessidade epidemiologica.'
  },
  {
    title: 'Producao Ambulatorial (SIA/SUS)',
    when: 'Quando a pergunta envolve procedimentos ambulatoriais, consultas, exames e fluxos fora da internacao.',
    answers: 'Quantidade de procedimentos ambulatoriais, distribuicao por servico e padroes de utilizacao.',
    avoid: 'Nao comparar producao ambulatorial com internacoes como se fossem a mesma medida.'
  },
  {
    title: 'Mortalidade',
    when: 'Quando o desfecho principal e obito, causa basica, distribuicao temporal ou diferenca territorial.',
    answers: 'Quantos obitos ocorreram, em quais grupos, por quais causas e em qual janela temporal.',
    avoid: 'Nao interpretar oscilacoes recentes sem checar atualizacao e nota metodologica da base.'
  },
  {
    title: 'Outras bases do DATASUS',
    when: 'Quando a pergunta exige nascidos vivos, informacoes demograficas, rede assistencial, indicadores ou inqueritos.',
    answers: 'Contexto populacional, oferta de servicos, bases complementares e indicadores para compor a analise.',
    avoid: 'Nao escolher a base apenas porque ela tem uma tabela pronta; escolha porque ela responde melhor a pergunta.'
  }
];

const TABNET_STEPS = [
  {
    title: '1. Comece pela pergunta e pela base',
    text: 'Antes do clique, deixe clara a pergunta central: o que quer medir, em qual populacao, em qual local e em qual periodo. Depois disso, selecione a base que mais faz sentido para o desfecho.'
  },
  {
    title: '2. Defina a abrangencia geografica',
    text: 'A abrangencia organiza o ponto de vista da tabela. O mesmo evento pode ser lido por regiao, UF, municipio, local de internacao ou local de residencia.'
  },
  {
    title: '3. Monte linha, coluna e conteudo',
    text: 'Linha e a dimensao principal da comparacao. Coluna adiciona um segundo estrato. Conteudo e a medida final exibida na tabela.'
  },
  {
    title: '4. Ajuste periodo e filtros',
    text: 'Selecione a janela temporal e os filtros necessarios para responder a pergunta. Refinar nao significa aplicar todos os filtros disponiveis.'
  },
  {
    title: '5. Gere a tabela e revise a leitura',
    text: 'Quando a tabela aparecer, pare antes da interpretacao final. Verifique base, recorte geografico, periodo, notas metodologicas e possibilidade de exportacao.'
  }
];

const TABULATION_EXPLAINERS = [
  { title: 'Linha', text: 'Use em linha a dimensao principal da comparacao. Se a pergunta e territorial, geralmente entram regiao, UF ou municipio.' },
  { title: 'Coluna', text: 'A coluna acrescenta um segundo estrato da analise, como sexo ou faixa etaria. Ela organiza a comparacao dentro de cada linha.' },
  { title: 'Conteudo', text: 'O conteudo e o valor efetivamente medido: internacoes, obitos, valor total, taxa ou outra medida oferecida pela base.' }
];

const REQUIRED_FILTERS = [
  { title: 'Recorte geografico', text: 'Regiao, UF, municipio, local de residencia ou local de internacao devem ser coerentes com a pergunta.' },
  { title: 'Periodo', text: 'Escolha a janela temporal que realmente responde a comparacao. Tendencia pede sequencia consistente; recorte pontual pede um periodo claramente definido.' },
  { title: 'Desfecho principal', text: 'Capitulo CID-10, procedimento, carater de atendimento ou outro filtro essencial devem refletir o fenomeno estudado.' }
];

const OPTIONAL_FILTERS = [
  { title: 'Estratificadores analiticos', text: 'Sexo, faixa etaria e cor/raca aprofundam a leitura quando ajudam a responder a pergunta, e nao quando so aumentam a complexidade.' },
  { title: 'Contexto assistencial', text: 'Regime, carater de atendimento e detalhes do servico podem qualificar a interpretacao de uso e acesso.' },
  { title: 'Refinamentos adicionais', text: 'Use filtros extras apenas se eles preservarem legibilidade. Filtro demais pode fragmentar a tabela e inviabilizar a interpretacao.' }
];

const AFTER_TABLE_ACTIONS = [
  { title: 'Interpretar', text: 'Leia a tabela como resposta provisoria da pergunta, e nao como conclusao automatica.' },
  { title: 'Exportar', text: 'Leve a saida para CSV ou para analise local quando precisar organizar a planilha, revisar consistencia e aprofundar o estudo.' },
  { title: 'Refinar a busca', text: 'Se a tabela ainda esta generica ou excessivamente ampla, volte um passo e refine recorte, periodo ou filtros.' }
];

const CRITICAL_QUESTIONS = [
  'Qual e a base?',
  'Qual e o recorte geografico?',
  'Qual e o periodo?',
  'Ha nota metodologica relevante?'
];

const COMMON_ERRORS = [
  'Nao confundir base com pergunta.',
  'Nao interpretar dado agregado como dado individual.',
  'Conferir se o recorte e por local de internacao ou por local de residencia.',
  'Nao ignorar notas metodologicas.',
  'Nao comparar periodos recentes sem checar atualizacao da base.',
  'Nao aplicar filtros demais a ponto de inviabilizar a interpretacao.'
];

const QUICK_GUIDE_POINTS = [
  { title: 'Linha', text: 'Dimensao principal da comparacao.' },
  { title: 'Coluna', text: 'Segundo estrato da analise.' },
  { title: 'Conteudo', text: 'Valor efetivamente medido.' }
];

const SIMULATOR_OPTIONS = {
  line: [
    { value: 'municipio', label: 'Municipio' },
    { value: 'ano', label: 'Ano' },
    { value: 'uf', label: 'UF' }
  ],
  column: [
    { value: 'nao-ativa', label: 'Nao ativa' },
    { value: 'sexo', label: 'Sexo' },
    { value: 'faixa-etaria', label: 'Faixa etaria' }
  ],
  content: [
    { value: 'internacoes', label: 'Internacoes' },
    { value: 'obitos', label: 'Obitos' },
    { value: 'valor-total', label: 'Valor total' }
  ]
};

const SIMULATOR_TEXT = {
  line: {
    municipio: 'Quando o foco e territorio, a linha costuma receber municipio, regiao ou UF.',
    ano: 'Quando o foco e tendencia, a linha costuma receber ano ou ano/mes.',
    uf: 'UF em linha funciona bem para comparacoes estaduais ou regionais resumidas.'
  },
  column: {
    'nao-ativa': 'Sem coluna ativa, a tabela fica mais direta e favorece a leitura da dimensao principal.',
    sexo: 'Sexo em coluna cria um segundo estrato simples para comparar padroes dentro de cada linha.',
    'faixa-etaria': 'Faixa etaria em coluna ajuda a separar perfis etarios sem trocar a dimensao principal.'
  },
  content: {
    internacoes: 'Internacoes costumam funcionar como medida de volume hospitalar.',
    obitos: 'Obitos funcionam como medida final quando a base central e mortalidade.',
    'valor-total': 'Valor total ajuda a ler uso de recurso ou producao financeira da base.'
  }
};

const SIMULATOR_DATA = {
  municipio: {
    rowLabel: 'Municipio',
    categories: ['Belem', 'Ananindeua', 'Santarem'],
    flat: {
      internacoes: ['1.240', '860', '490'],
      obitos: ['88', '53', '27'],
      'valor-total': ['R$ 2,4 mi', 'R$ 1,6 mi', 'R$ 0,9 mi']
    },
    breakdowns: {
      sexo: {
        headers: ['Feminino', 'Masculino'],
        internacoes: [['680', '560'], ['470', '390'], ['260', '230']],
        obitos: [['49', '39'], ['31', '22'], ['16', '11']],
        'valor-total': [['R$ 1,3 mi', 'R$ 1,1 mi'], ['R$ 0,9 mi', 'R$ 0,7 mi'], ['R$ 0,5 mi', 'R$ 0,4 mi']]
      },
      'faixa-etaria': {
        headers: ['0-19', '20-59', '60+'],
        internacoes: [['180', '710', '350'], ['120', '500', '240'], ['70', '280', '140']],
        obitos: [['3', '37', '48'], ['2', '23', '28'], ['1', '10', '16']],
        'valor-total': [['R$ 0,3 mi', 'R$ 1,4 mi', 'R$ 0,7 mi'], ['R$ 0,2 mi', 'R$ 0,9 mi', 'R$ 0,5 mi'], ['R$ 0,1 mi', 'R$ 0,5 mi', 'R$ 0,3 mi']]
      }
    }
  },
  ano: {
    rowLabel: 'Ano',
    categories: ['2021', '2022', '2023'],
    flat: {
      internacoes: ['3.420', '3.610', '3.890'],
      obitos: ['246', '254', '271'],
      'valor-total': ['R$ 5,9 mi', 'R$ 6,2 mi', 'R$ 6,8 mi']
    },
    breakdowns: {
      sexo: {
        headers: ['Feminino', 'Masculino'],
        internacoes: [['1.860', '1.560'], ['1.940', '1.670'], ['2.080', '1.810']],
        obitos: [['132', '114'], ['136', '118'], ['144', '127']],
        'valor-total': [['R$ 3,1 mi', 'R$ 2,8 mi'], ['R$ 3,3 mi', 'R$ 2,9 mi'], ['R$ 3,6 mi', 'R$ 3,2 mi']]
      },
      'faixa-etaria': {
        headers: ['0-19', '20-59', '60+'],
        internacoes: [['520', '1.960', '940'], ['540', '2.050', '1.020'], ['570', '2.170', '1.150']],
        obitos: [['11', '106', '129'], ['12', '110', '132'], ['13', '117', '141']],
        'valor-total': [['R$ 0,7 mi', 'R$ 3,4 mi', 'R$ 1,8 mi'], ['R$ 0,8 mi', 'R$ 3,5 mi', 'R$ 1,9 mi'], ['R$ 0,8 mi', 'R$ 3,8 mi', 'R$ 2,2 mi']]
      }
    }
  },
  uf: {
    rowLabel: 'UF',
    categories: ['Para', 'Amazonas', 'Maranhao'],
    flat: {
      internacoes: ['9.480', '7.230', '8.010'],
      obitos: ['702', '568', '611'],
      'valor-total': ['R$ 18,2 mi', 'R$ 13,6 mi', 'R$ 14,9 mi']
    },
    breakdowns: {
      sexo: {
        headers: ['Feminino', 'Masculino'],
        internacoes: [['5.020', '4.460'], ['3.840', '3.390'], ['4.190', '3.820']],
        obitos: [['389', '313'], ['307', '261'], ['332', '279']],
        'valor-total': [['R$ 9,5 mi', 'R$ 8,7 mi'], ['R$ 7,1 mi', 'R$ 6,5 mi'], ['R$ 7,8 mi', 'R$ 7,1 mi']]
      },
      'faixa-etaria': {
        headers: ['0-19', '20-59', '60+'],
        internacoes: [['1.460', '5.250', '2.770'], ['1.020', '4.010', '2.200'], ['1.180', '4.430', '2.400']],
        obitos: [['25', '296', '381'], ['18', '228', '322'], ['22', '251', '338']],
        'valor-total': [['R$ 2,1 mi', 'R$ 10,5 mi', 'R$ 5,6 mi'], ['R$ 1,5 mi', 'R$ 7,8 mi', 'R$ 4,3 mi'], ['R$ 1,7 mi', 'R$ 8,5 mi', 'R$ 4,7 mi']]
      }
    }
  }
};

function renderFlowSteps() {
  return FLOW_STEPS.map(step => `
    <li class="datasus-guide-progress-step">
      <span class="datasus-guide-progress-number">${step.number}</span>
      <div>
        <strong>${step.title}</strong>
        <span>${step.note}</span>
      </div>
    </li>
  `).join('');
}

function renderBaseCards() {
  return BASE_CARDS.map(card => `
    <article class="datasus-guide-base-card">
      <div class="datasus-guide-base-head">
        <span class="chip small-chip primary">${card.title}</span>
      </div>
      <div class="datasus-guide-base-body">
        <div class="datasus-guide-micro-item">
          <strong>Quando usar</strong>
          <p>${card.when}</p>
        </div>
        <div class="datasus-guide-micro-item">
          <strong>O que costuma responder</strong>
          <p>${card.answers}</p>
        </div>
        <div class="datasus-guide-micro-item">
          <strong>Qual erro evitar</strong>
          <p>${card.avoid}</p>
        </div>
      </div>
    </article>
  `).join('');
}

function renderAccordion() {
  return TABNET_STEPS.map((step, index) => `
    <details class="didactic-accordion"${index === 0 ? ' open' : ''}>
      <summary class="didactic-summary">
        <span class="didactic-summary-icon">${index + 1}</span>
        <span>${step.title}</span>
        <span class="didactic-summary-chevron">&#9662;</span>
      </summary>
      <div class="callout-grid">
        <article class="didactic-card">
          <h4>${step.title}</h4>
          <p>${step.text}</p>
        </article>
      </div>
    </details>
  `).join('');
}

function renderExplainers() {
  return TABULATION_EXPLAINERS.map(item => `
    <article class="help-card datasus-guide-explainer">
      <h4>${item.title}</h4>
      <p>${item.text}</p>
    </article>
  `).join('');
}

function renderFilterCards(items) {
  return items.map(item => `
    <article class="datasus-guide-filter-item">
      <strong>${item.title}</strong>
      <p>${item.text}</p>
    </article>
  `).join('');
}

function renderActionCards() {
  return AFTER_TABLE_ACTIONS.map((item, index) => `
    <article class="mini-card datasus-guide-action-card">
      <span class="datasus-guide-action-number">0${index + 1}</span>
      <h4>${item.title}</h4>
      <p>${item.text}</p>
    </article>
  `).join('');
}

function renderCriticalQuestions() {
  return CRITICAL_QUESTIONS.map(question => `
    <article class="datasus-guide-question-card">
      <strong>${question}</strong>
      <p>Confirme esse item antes de fechar a leitura da tabela.</p>
    </article>
  `).join('');
}

function renderChecklist() {
  return COMMON_ERRORS.map(item => `<li>${item}</li>`).join('');
}

function buildSimulatorModel(state) {
  const dataset = SIMULATOR_DATA[state.line];
  const lineLabel = dataset.rowLabel;
  const contentLabel = SIMULATOR_OPTIONS.content.find(item => item.value === state.content)?.label || 'Conteudo';
  const columnLabel = SIMULATOR_OPTIONS.column.find(item => item.value === state.column)?.label || 'Nao ativa';
  let headers = [lineLabel, contentLabel];
  let rows = dataset.categories.map((label, index) => [label, dataset.flat[state.content][index]]);

  if (state.column !== 'nao-ativa') {
    const breakdown = dataset.breakdowns[state.column];
    headers = [lineLabel, ...breakdown.headers];
    rows = dataset.categories.map((label, index) => [label, ...breakdown[state.content][index]]);
  }

  return {
    lineLabel,
    columnLabel,
    contentLabel,
    headers,
    rows,
    lineText: SIMULATOR_TEXT.line[state.line],
    columnText: SIMULATOR_TEXT.column[state.column],
    contentText: SIMULATOR_TEXT.content[state.content],
    columnRule: state.column === 'nao-ativa'
      ? 'Coluna nao ativa = voce pode comparar 2 ou mais conteudos na montagem real.'
      : 'Coluna ativa = 1 conteudo por vez na montagem real.'
  };
}

function bindScrollButtons(root) {
  root.querySelectorAll('[data-scroll-target]').forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      const targetId = button.dataset.scrollTarget;
      const target = root.querySelector(`#${targetId}`);
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

export async function renderTestModule({ root, utils }) {
  root.innerHTML = `
    <div class="module-grid datasus-guide-module">
      <section class="datasus-guide-hero">
        <div class="datasus-guide-hero-copy">
          <span class="section-kicker">Guia informativo</span>
          <h3>Aprenda DATASUS na pr&aacute;tica</h3>
          <p>Transforme uma pergunta epidemiol&oacute;gica em uma tabula&ccedil;&atilde;o utiliz&aacute;vel no DATASUS.</p>
          <p class="datasus-guide-flow-copy">Fluxo central: pergunta &rarr; base &rarr; recorte geogr&aacute;fico &rarr; linha/coluna/conte&uacute;do &rarr; filtros &rarr; tabela &rarr; exporta&ccedil;&atilde;o &rarr; interpreta&ccedil;&atilde;o.</p>
          <div class="datasus-guide-hero-actions">
            <button type="button" class="btn" data-scroll-target="visao-geral">Come&ccedil;ar pelo b&aacute;sico</button>
            <a class="btn-secondary" href="http://tabnet.datasus.gov.br/cgi/tabcgi.exe?sih/cnv/niba.def" target="_blank" rel="noopener noreferrer">Ir direto para o TABNET</a>
            <button type="button" class="btn-ghost" data-scroll-target="modo-rapido-avancado">Entender TABWIN / arquivos brutos</button>
          </div>
        </div>
      </section>

      <section class="datasus-guide-progress">
        <div class="datasus-guide-progress-head">
          <span class="section-kicker">Trilha de leitura</span>
          <p>Use esta barra como mapa mental do processo, e nao como uma sequencia de cliques soltos.</p>
        </div>
        <ol class="datasus-guide-progress-list">
          ${renderFlowSteps()}
        </ol>
      </section>

      <div class="datasus-guide-shell">
        <div class="datasus-guide-main">
          <section id="visao-geral" class="surface-card datasus-guide-section">
            <div class="datasus-guide-section-head">
              <div>
                <span class="section-kicker">1. Visao geral do DATASUS</span>
                <h4>Comece pela pergunta, nao pelo clique</h4>
              </div>
              <span class="chip chip-info">Pergunta bem formulada primeiro</span>
            </div>
            <p class="datasus-guide-lead">O usuario nao deve entrar no DATASUS procurando qualquer dado. Antes da navegacao, vale estruturar minimamente o que quer medir, em qual populacao, em qual local, em qual periodo e em qual base isso faz mais sentido.</p>
            <div class="datasus-guide-split">
              <article class="surface-card datasus-guide-subcard">
                <h4>Como pensar o DATASUS</h4>
                <div class="datasus-guide-question-list">
                  <div class="datasus-guide-question-item">
                    <strong>1.</strong>
                    <div>
                      <strong>O que quero medir?</strong>
                      <p>Desfecho, evento, procedimento ou indicador precisam estar claros antes da busca.</p>
                    </div>
                  </div>
                  <div class="datasus-guide-question-item">
                    <strong>2.</strong>
                    <div>
                      <strong>Em qual populacao e em qual local?</strong>
                      <p>Defina o recorte territorial e a populacao de interesse antes de abrir a tabela.</p>
                    </div>
                  </div>
                  <div class="datasus-guide-question-item">
                    <strong>3.</strong>
                    <div>
                      <strong>Em qual periodo e em qual base?</strong>
                      <p>O mesmo tema pode exigir bases diferentes conforme o tipo de fenomeno que voce quer observar.</p>
                    </div>
                  </div>
                </div>
              </article>
              <article class="tip-card datasus-guide-subcard datasus-guide-warning-card">
                <h4>Alerta metodologico: falacia ecologica</h4>
                <p>Dado agregado nao equivale automaticamente a conclusao individual. O fato de um municipio ou uma regiao apresentar um padrao nao significa que cada individuo daquele grupo compartilha esse mesmo comportamento.</p>
                <p class="small-note">Use o DATASUS para descrever e comparar distribuicoes populacionais, sempre com cuidado ao passar da leitura agregada para qualquer inferencia individual.</p>
              </article>
            </div>
          </section>

          <section id="escolha-base" class="surface-card datasus-guide-section">
            <div class="datasus-guide-section-head">
              <div>
                <span class="section-kicker">2. Escolha da base</span>
                <h4>Escolha a base de acordo com a pergunta</h4>
              </div>
              <span class="chip chip-primary">Cards de referencia rapida</span>
            </div>
            <p class="datasus-guide-lead">A escolha da base certa evita tabelas bonitas que nao respondem a pergunta central. Use os cards abaixo como atalho academico para a triagem inicial.</p>
            <div class="datasus-guide-base-grid">
              ${renderBaseCards()}
            </div>
          </section>

          <section id="tabulacao" class="surface-card datasus-guide-section">
            <div class="datasus-guide-section-head">
              <div>
                <span class="section-kicker">3. Como montar a tabulacao</span>
                <h4>Entenda o raciocinio de montagem antes de montar a tabela</h4>
              </div>
              <span class="chip chip-info">Linha, coluna e conteudo</span>
            </div>
            <p class="datasus-guide-lead">Quando o foco e territorio, geralmente regiao, UF ou municipio entram em linha. Quando o foco e tendencia, ano ou ano/mes costumam ocupar a linha. O conteudo representa a medida final que a tabela entrega.</p>
            <div class="datasus-guide-tabnet-block">
              <div class="datasus-guide-tabnet-head">
                <h4>Passo a passo do TABNET</h4>
                <p class="small-note">Use o acordeao para percorrer o fluxo de navegacao sem transformar o aprendizado em um amontoado de cliques.</p>
              </div>
              ${renderAccordion()}
            </div>
            <div class="datasus-guide-tab-layout">
              <div class="datasus-guide-tab-main">
                <div class="callout-grid datasus-guide-pill-grid">
                  ${renderExplainers()}
                </div>
                <div class="datasus-guide-rule-strip">
                  <article class="datasus-guide-rule-card">
                    <strong>Coluna ativa = 1 conteudo</strong>
                    <p>Ao ativar uma coluna, o tabulador passa a trabalhar com um conteudo por vez na montagem final.</p>
                  </article>
                  <article class="datasus-guide-rule-card">
                    <strong>Coluna nao ativa = voce pode comparar 2 ou mais conteudos</strong>
                    <p>Sem coluna ativa, a leitura fica mais direta e permite comparar conteudos com mais liberdade.</p>
                  </article>
                </div>
                <article class="surface-card datasus-guide-simulator">
                  <div class="datasus-guide-simulator-head">
                    <div>
                      <span class="section-kicker">Simulador visual</span>
                      <h4>Exemplo demonstrativo de linha, coluna e conteudo</h4>
                    </div>
                    <span class="small-chip info">Sem calculo real; apenas montagem-exemplo</span>
                  </div>
                  <div class="datasus-guide-simulator-controls form-grid three">
                    <div>
                      <label for="datasus-guide-line">Linha</label>
                      <select id="datasus-guide-line">
                        ${SIMULATOR_OPTIONS.line.map(option => `<option value="${option.value}">${option.label}</option>`).join('')}
                      </select>
                    </div>
                    <div>
                      <label for="datasus-guide-column">Coluna</label>
                      <select id="datasus-guide-column">
                        ${SIMULATOR_OPTIONS.column.map(option => `<option value="${option.value}">${option.label}</option>`).join('')}
                      </select>
                    </div>
                    <div>
                      <label for="datasus-guide-content">Conteudo</label>
                      <select id="datasus-guide-content">
                        ${SIMULATOR_OPTIONS.content.map(option => `<option value="${option.value}">${option.label}</option>`).join('')}
                      </select>
                    </div>
                  </div>
                  <div id="datasus-guide-simulator-meta" class="datasus-guide-simulator-meta"></div>
                  <div id="datasus-guide-simulator-preview"></div>
                </article>
              </div>
              <aside class="datasus-guide-quick-panel">
                <div>
                  <span class="section-kicker">Leitura rapida da tabela</span>
                  <h4>Painel lateral de interpretacao</h4>
                </div>
                <div class="datasus-guide-quick-list">
                  ${QUICK_GUIDE_POINTS.map(item => `
                    <div class="datasus-guide-quick-item">
                      <strong>${item.title}</strong>
                      <p>${item.text}</p>
                    </div>
                  `).join('')}
                </div>
                <div id="datasus-guide-quick-summary" class="datasus-guide-quick-summary"></div>
              </aside>
            </div>
          </section>

          <section id="filtros" class="surface-card datasus-guide-section">
            <div class="datasus-guide-section-head">
              <div>
                <span class="section-kicker">4. Filtros e refinamento</span>
                <h4>Refine progressivamente, sem perder interpretabilidade</h4>
              </div>
              <span class="chip chip-info">Refinar nao e filtrar tudo</span>
            </div>
            <p class="datasus-guide-lead">Filtros devem responder a pergunta, nao apenas deixar a tela mais preenchida. Regiao, UF, capitulo CID-10, carater de atendimento, regime, faixa etaria, sexo e cor/raca sao exemplos de refinamento possivel.</p>
            <div class="datasus-guide-filter-grid">
              <article class="surface-card datasus-guide-filter-card">
                <h4>Filtros obrigatorios para responder a pergunta</h4>
                <div class="datasus-guide-filter-list">
                  ${renderFilterCards(REQUIRED_FILTERS)}
                </div>
              </article>
              <article class="surface-card datasus-guide-filter-card">
                <h4>Filtros opcionais para aprofundar a analise</h4>
                <div class="datasus-guide-filter-list">
                  ${renderFilterCards(OPTIONAL_FILTERS)}
                </div>
              </article>
            </div>
            <article class="info-banner datasus-guide-refine-note">
              <strong>Refinamento progressivo:</strong> primeiro garanta o recorte que responde a pergunta; depois, se ainda fizer sentido, acrescente estratos adicionais. Tabela fragmentada demais costuma piorar a leitura.
            </article>
          </section>

          <section id="exportacao" class="surface-card datasus-guide-section">
            <div class="datasus-guide-section-head">
              <div>
                <span class="section-kicker">5. Exportacao e leitura critica</span>
                <h4>O que fazer depois que a tabela aparece</h4>
              </div>
              <span class="chip chip-primary">Interprete antes de concluir</span>
            </div>
            <div class="datasus-guide-action-grid">
              ${renderActionCards()}
            </div>
            <div class="datasus-guide-split">
              <article class="surface-card datasus-guide-subcard">
                <h4>Caixa fixa de interpretacao critica</h4>
                <div class="datasus-guide-question-grid">
                  ${renderCriticalQuestions()}
                </div>
              </article>
              <article class="tip-card datasus-guide-subcard datasus-guide-warning-card">
                <h4>Antes de interpretar, leia isto</h4>
                <ul>
                  <li>Cheque as notas metodologicas da base.</li>
                  <li>Confira o nivel de atualizacao do periodo escolhido.</li>
                  <li>Revise o recorte exato da tabela gerada.</li>
                  <li>Evite leitura apressada sem comparar contexto, recorte e cobertura.</li>
                </ul>
              </article>
            </div>
          </section>

          <section id="erros-boas-praticas" class="surface-card datasus-guide-section">
            <div class="datasus-guide-section-head">
              <div>
                <span class="section-kicker">6. Erros comuns e boas praticas</span>
                <h4>Use este checklist como auditoria rapida</h4>
              </div>
              <span class="chip chip-info">Checklist visual</span>
            </div>
            <ul class="datasus-guide-checklist">
              ${renderChecklist()}
            </ul>
            <div id="modo-rapido-avancado" class="datasus-guide-compare">
              <article class="surface-card datasus-guide-compare-card">
                <span class="section-kicker">Modo rapido</span>
                <h4>TABNET</h4>
                <p>Melhor para navegacao web, tabulacao imediata, revisao rapida de recortes e exportacao inicial da tabela.</p>
              </article>
              <article class="surface-card datasus-guide-compare-card">
                <span class="section-kicker">Modo avancado</span>
                <h4>Download de arquivos + TABWIN / analise local</h4>
                <p>Melhor quando a analise exige maior controle da base bruta, organizacao local, indicadores mais finos ou integracao com planilhas e analises posteriores.</p>
              </article>
            </div>
            <article class="info-banner">
              Depois do CSV, organize nomes, revise periodos, cheque zeros e so entao leve a planilha para os testes estatisticos do LACIRSTAT.
            </article>
          </section>
        </div>

        <aside class="datasus-guide-sidebar">
          <div class="datasus-guide-sidecard">
            <span class="section-kicker">Indice lateral</span>
            <h4>Navegue pelo guia</h4>
            <div class="datasus-guide-nav-list">
              <button type="button" class="datasus-guide-nav-link" data-scroll-target="visao-geral">Visao geral</button>
              <button type="button" class="datasus-guide-nav-link" data-scroll-target="escolha-base">Escolha da base</button>
              <button type="button" class="datasus-guide-nav-link" data-scroll-target="tabulacao">Como montar a tabulacao</button>
              <button type="button" class="datasus-guide-nav-link" data-scroll-target="filtros">Filtros e refinamento</button>
              <button type="button" class="datasus-guide-nav-link" data-scroll-target="exportacao">Exportacao e leitura critica</button>
              <button type="button" class="datasus-guide-nav-link" data-scroll-target="erros-boas-praticas">Erros comuns e boas praticas</button>
            </div>
          </div>
          <div class="datasus-guide-sidecard">
            <span class="section-kicker">Lembrete</span>
            <p class="small-note">Pense o DATASUS como processo: pergunta, base, recorte, montagem da tabela, filtros, exportacao e interpretacao.</p>
          </div>
        </aside>
      </div>
    </div>
  `;

  const simulatorState = {
    line: 'municipio',
    column: 'nao-ativa',
    content: 'internacoes'
  };

  const lineSelect = root.querySelector('#datasus-guide-line');
  const columnSelect = root.querySelector('#datasus-guide-column');
  const contentSelect = root.querySelector('#datasus-guide-content');
  const metaEl = root.querySelector('#datasus-guide-simulator-meta');
  const previewEl = root.querySelector('#datasus-guide-simulator-preview');
  const summaryEl = root.querySelector('#datasus-guide-quick-summary');

  const updateSimulator = () => {
    const model = buildSimulatorModel(simulatorState);

    metaEl.innerHTML = `
      <span class="small-chip primary">${model.lineLabel}: ${model.lineText}</span>
      <span class="small-chip info">${model.columnLabel}: ${model.columnText}</span>
      <span class="small-chip warning">${model.contentLabel}: ${model.contentText}</span>
    `;

    previewEl.innerHTML = `
      <div class="datasus-guide-example-note">${model.columnRule}</div>
      ${utils.renderPreviewTable(model.headers, model.rows)}
      <div class="small-note" style="margin-top: 12px;">Exemplo ilustrativo de montagem: a tabela abaixo nao executa calculo real do DATASUS; ela apenas demonstra como a estrutura da saida muda conforme linha, coluna e conteudo.</div>
    `;

    summaryEl.innerHTML = `
      <div class="datasus-guide-quick-item">
        <strong>Montagem atual</strong>
        <p>${model.lineLabel} em linha, ${model.columnLabel.toLowerCase()} em coluna e ${model.contentLabel.toLowerCase()} como medida final.</p>
      </div>
      <div class="datasus-guide-quick-item">
        <strong>Regra lembrada</strong>
        <p>${model.columnRule}</p>
      </div>
    `;
  };

  lineSelect.addEventListener('change', event => {
    simulatorState.line = event.target.value;
    updateSimulator();
  });

  columnSelect.addEventListener('change', event => {
    simulatorState.column = event.target.value;
    updateSimulator();
  });

  contentSelect.addEventListener('change', event => {
    simulatorState.content = event.target.value;
    updateSimulator();
  });

  bindScrollButtons(root);
  updateSimulator();
}
