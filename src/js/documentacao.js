const paginas = {
  cores: paginaCores,
  tipografia: paginaTipografia,
  espacamento: paginaEspacamento,
  grid: paginaGrid,
  containers: paginaContainers,
  botoes: paginaBotoes,
  badges: paginaBadges,
  alertas: paginaAlertas,
  cards: paginaCards,
  accordion: paginaAccordion,
  modais: paginaModais,
  tooltips: paginaTooltips,
  progress: paginaProgress,
  spinners: paginaSpinners,
  toasts: paginaToasts,
  inputs: paginaInputs,
  selects: paginaSelects,
  checkboxes: paginaCheckboxes,
  switches: paginaSwitches,
  'input-group': paginaInputGroup,
  navbar: paginaNavbar,
  breadcrumb: paginaBreadcrumb,
  tabs: paginaTabs,
  pagination: paginaPagination,
  dropdown: paginaDropdown,
  tabelas: paginaTabelas,
  'list-group': paginaListGroup,
  helpers: paginaHelpers
};

document.addEventListener('DOMContentLoaded', function() {
  carregarPagina('cores');

  const botoesNav = document.querySelectorAll('.nav-link[data-pagina]');
  botoesNav.forEach(botao => {
    botao.addEventListener('click', function() {
      const pagina = this.dataset.pagina;
      
      // Remove active de todos os botões
      botoesNav.forEach(b => {
        b.classList.remove('active', 'text-primary', 'fw-bold');
        b.classList.add('text-body');
      });
      
      // Adiciona active ao clicado
      this.classList.add('active', 'text-primary', 'fw-bold');
      this.classList.remove('text-body');
      
      carregarPagina(pagina);
    });
  });
});

function carregarPagina(pagina) {
  const conteudo = document.getElementById('conteudo-pagina');
  if (paginas[pagina]) {
    conteudo.innerHTML = paginas[pagina]();
    inicializarComponentesBootstrap();
  }
}

function inicializarComponentesBootstrap() {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
}

function toggleCodigo(botao) {
  const card = botao.closest('.card');
  const codigoArea = card.querySelector('.card-footer');
  
  if (codigoArea.classList.contains('d-none')) {
    codigoArea.classList.remove('d-none');
    botao.innerHTML = '<i class="bi bi-code-slash me-1"></i> Ocultar';
    botao.classList.add('active');
  } else {
    codigoArea.classList.add('d-none');
    botao.innerHTML = '<i class="bi bi-code-slash me-1"></i> Código';
    botao.classList.remove('active');
  }
}

function trocarAba(botaoAba, abaAlvo) {
  const codigoArea = botaoAba.closest('.card-footer');
  
  // Remove active de todas as abas
  codigoArea.querySelectorAll('.nav-link').forEach(aba => aba.classList.remove('active'));
  botaoAba.classList.add('active');
  
  // Esconde todos os conteúdos e mostra o alvo
  codigoArea.querySelectorAll('.tab-pane').forEach(conteudo => {
    if(conteudo.id === abaAlvo) {
      conteudo.classList.add('show', 'active');
    } else {
      conteudo.classList.remove('show', 'active');
    }
  });
}

function componenteComCodigo(titulo, preview, codigoEasyjur, codigoLegalops, descricao = '') {
  const idUnico = 'code-' + Math.random().toString(36).substr(2, 9);
  
  return `
    <div class="card mb-4 shadow-sm">
      <div class="card-header d-flex justify-content-between align-items-center bg-body-tertiary">
        <h6 class="mb-0 text-uppercase small fw-bold text-body-secondary">${titulo}</h6>
        <button class="btn btn-sm btn-outline-secondary d-flex align-items-center" onclick="toggleCodigo(this)">
          <i class="bi bi-code-slash me-1"></i> Código
        </button>
      </div>
      <div class="card-body p-4 border-bottom">
        ${preview}
      </div>
      ${descricao ? `<div class="card-body bg-body-tertiary py-2 px-4 border-bottom small text-muted">${descricao}</div>` : ''}
      <div class="card-footer p-0 d-none">
        <ul class="nav nav-tabs nav-fill bg-body-tertiary border-bottom-0" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active rounded-0 border-top-0 border-start-0 py-2 small" onclick="trocarAba(this, '${idUnico}-easyjur')" type="button">EasyJur (SaaS)</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link rounded-0 border-top-0 border-end-0 py-2 small" onclick="trocarAba(this, '${idUnico}-legalops')" type="button">LegalOps (React)</button>
          </li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane fade show active" id="${idUnico}-easyjur" role="tabpanel">
            <pre class="m-0 p-3 bg-dark text-light small overflow-auto" style="max-height: 300px;"><code>${escapeHtml(codigoEasyjur)}</code></pre>
          </div>
          <div class="tab-pane fade" id="${idUnico}-legalops" role="tabpanel">
            <pre class="m-0 p-3 bg-dark text-light small overflow-auto" style="max-height: 300px;"><code>${escapeHtml(codigoLegalops)}</code></pre>
          </div>
        </div>
      </div>
    </div>
  `;
}

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ===================== PÁGINAS =====================

function paginaCores() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Cores</h2>
      <p class="lead text-muted mb-5">Sistema de cores do EasyJur. São 3 cores principais que customizam o Bootstrap: Primária, Secundária e Terciária.</p>

      <h3 class="h6 text-uppercase text-muted fw-bold mb-3 ls-1">Paleta Principal</h3>
      <div class="row g-4 mb-5">
        <div class="col-md-4">
          <div class="card h-100 border">
            <div class="card-img-top" style="height: 120px; background-color: #e5293f;"></div>
            <div class="card-body">
              <h5 class="card-title fw-bold mb-1">Primária</h5>
              <code class="text-primary small">$primary / --bs-primary</code>
              <div class="mt-2"><span class="badge bg-dark font-monospace">#E5293F</span></div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card h-100 border">
            <div class="card-img-top" style="height: 120px; background-color: #acbac2;"></div>
            <div class="card-body">
              <h5 class="card-title fw-bold mb-1">Secundária</h5>
              <code class="text-secondary small">$secondary / --bs-secondary</code>
              <div class="mt-2"><span class="badge bg-dark font-monospace">#ACBAC2</span></div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card h-100 border">
            <div class="card-img-top" style="height: 120px; background-color: #7f919a;"></div>
            <div class="card-body">
              <h5 class="card-title fw-bold mb-1">Terciária</h5>
              <code class="text-tertiary small">$tertiary / .bg-tertiary</code>
              <div class="mt-2"><span class="badge bg-dark font-monospace">#7F919A</span></div>
            </div>
          </div>
        </div>
      </div>

      <h3 class="h6 text-uppercase text-muted fw-bold mb-3 ls-1">Cores Semânticas (Bootstrap Padrão)</h3>
      <div class="row g-4 mb-5">
        <div class="col-md-3 col-6">
          <div class="card border h-100">
            <div class="card-img-top" style="height: 80px; background-color: #198754;"></div>
            <div class="card-body p-3">
              <div class="fw-bold small">Success</div>
              <div class="small font-monospace text-muted">#198754</div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="card border h-100">
            <div class="card-img-top" style="height: 80px; background-color: #dc3545;"></div>
            <div class="card-body p-3">
              <div class="fw-bold small">Danger</div>
              <div class="small font-monospace text-muted">#DC3545</div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="card border h-100">
            <div class="card-img-top" style="height: 80px; background-color: #ffc107;"></div>
            <div class="card-body p-3">
              <div class="fw-bold small">Warning</div>
              <div class="small font-monospace text-muted">#FFC107</div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="card border h-100">
            <div class="card-img-top" style="height: 80px; background-color: #0dcaf0;"></div>
            <div class="card-body p-3">
              <div class="fw-bold small">Info</div>
              <div class="small font-monospace text-muted">#0DCAF0</div>
            </div>
          </div>
        </div>
      </div>

      <h3 class="h6 text-uppercase text-muted fw-bold mb-3 ls-1">Neutros</h3>
      <div class="row g-4">
        <div class="col-md-3 col-6">
          <div class="card border h-100">
            <div class="card-img-top border-bottom" style="height: 80px; background-color: #f8f9fa;"></div>
            <div class="card-body p-3">
              <div class="fw-bold small">Light</div>
              <div class="small font-monospace text-muted">#F8F9FA</div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="card border h-100">
            <div class="card-img-top" style="height: 80px; background-color: #212529;"></div>
            <div class="card-body p-3">
              <div class="fw-bold small">Dark</div>
              <div class="small font-monospace text-muted">#212529</div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="card border h-100">
            <div class="card-img-top border-bottom" style="height: 80px; background-color: #ffffff;"></div>
            <div class="card-body p-3">
              <div class="fw-bold small">White</div>
              <div class="small font-monospace text-muted">#FFFFFF</div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="card border h-100">
            <div class="card-img-top" style="height: 80px; background-color: #6c757d;"></div>
            <div class="card-body p-3">
              <div class="fw-bold small">Gray</div>
              <div class="small font-monospace text-muted">#6C757D</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function paginaTipografia() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Tipografia</h2>
      <p class="lead text-muted mb-5">Fonte Borna para toda a interface. Classes de texto e utilitários tipográficos.</p>

      ${componenteComCodigo('Headings',
        `<div class="d-flex flex-column gap-2">
          <h1>h1. Heading</h1>
          <h2>h2. Heading</h2>
          <h3>h3. Heading</h3>
          <h4>h4. Heading</h4>
          <h5>h5. Heading</h5>
          <h6>h6. Heading</h6>
        </div>`,
        `<div class="rebranding">
  <h1>h1. Heading</h1>
  <h2>h2. Heading</h2>
  <h3>h3. Heading</h3>
  <h4>h4. Heading</h4>
  <h5>h5. Heading</h5>
  <h6>h6. Heading</h6>
</div>`,
        `<h1>h1. Heading</h1>
<h2>h2. Heading</h2>
<h3>h3. Heading</h3>`,
        'Tags h1-h6 com tamanhos padrão do Bootstrap'
      )}

      ${componenteComCodigo('Display Headings',
        `<div class="d-flex flex-column gap-2">
          <h1 class="display-1">Display 1</h1>
          <h1 class="display-2">Display 2</h1>
          <h1 class="display-3">Display 3</h1>
        </div>`,
        `<div class="rebranding">
  <h1 class="display-1">Display 1</h1>
  <h1 class="display-2">Display 2</h1>
  <h1 class="display-3">Display 3</h1>
</div>`,
        `<Text variant="display1">Display 1</Text>
<Text variant="display2">Display 2</Text>`,
        'Headings maiores para destaque'
      )}

      ${componenteComCodigo('Texto',
        `<div class="d-flex flex-column gap-2">
          <p class="lead">Parágrafo de destaque (lead).</p>
          <p>Parágrafo normal com <strong>texto em negrito</strong>, <em>itálico</em> e <a href="#">link</a>.</p>
          <p><small>Texto pequeno (small)</small></p>
          <p class="text-muted">Texto secundário (muted)</p>
        </div>`,
        `<div class="rebranding">
  <p class="lead">Parágrafo de destaque.</p>
  <p>Parágrafo normal com <strong>negrito</strong>, <em>itálico</em>.</p>
  <p><small>Texto pequeno</small></p>
  <p class="text-muted">Texto secundário</p>
</div>`,
        `<Text variant="lead">Parágrafo de destaque</Text>
<Text>Parágrafo normal</Text>
<Text size="sm">Texto pequeno</Text>`,
        ''
      )}
    </section>
  `;
}

function paginaEspacamento() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Espaçamento</h2>
      <p class="lead text-muted mb-5">Classes utilitárias para margin (m) e padding (p).</p>

      <div class="row g-4">
        <div class="col-md-6">
          <div class="card mb-4 shadow-sm">
            <div class="card-header bg-body-tertiary fw-bold">Escala</div>
            <div class="card-body">
              <table class="table table-borderless mb-0">
                <thead><tr><th>Classe</th><th>Valor</th><th>Exemplo</th></tr></thead>
                <tbody>
                  <tr><td><code>*-0</code></td><td>0</td><td>m-0, p-0</td></tr>
                  <tr><td><code>*-1</code></td><td>0.25rem (4px)</td><td>m-1, p-1</td></tr>
                  <tr><td><code>*-2</code></td><td>0.5rem (8px)</td><td>m-2, p-2</td></tr>
                  <tr><td><code>*-3</code></td><td>1rem (16px)</td><td>m-3, p-3</td></tr>
                  <tr><td><code>*-4</code></td><td>1.5rem (24px)</td><td>m-4, p-4</td></tr>
                  <tr><td><code>*-5</code></td><td>3rem (48px)</td><td>m-5, p-5</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card mb-4 shadow-sm">
            <div class="card-header bg-body-tertiary fw-bold">Direções</div>
            <div class="card-body">
              <table class="table table-borderless mb-0">
                <thead><tr><th>Prefixo</th><th>Direção</th><th>Exemplo</th></tr></thead>
                <tbody>
                  <tr><td><code>t</code></td><td>Top</td><td>mt-3, pt-3</td></tr>
                  <tr><td><code>b</code></td><td>Bottom</td><td>mb-3, pb-3</td></tr>
                  <tr><td><code>s</code></td><td>Start (left)</td><td>ms-3, ps-3</td></tr>
                  <tr><td><code>e</code></td><td>End (right)</td><td>me-3, pe-3</td></tr>
                  <tr><td><code>x</code></td><td>Horizontal</td><td>mx-3, px-3</td></tr>
                  <tr><td><code>y</code></td><td>Vertical</td><td>my-3, py-3</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function paginaGrid() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Grid System</h2>
      <p class="lead text-muted mb-5">Sistema de grid de 12 colunas do Bootstrap.</p>

      ${componenteComCodigo('Colunas Básicas',
        `<div class="container-fluid border rounded p-3 bg-light">
          <div class="row mb-2">
            <div class="col"><div class="bg-primary text-white p-3 text-center rounded">col</div></div>
            <div class="col"><div class="bg-primary text-white p-3 text-center rounded">col</div></div>
            <div class="col"><div class="bg-primary text-white p-3 text-center rounded">col</div></div>
          </div>
          <div class="row">
            <div class="col-6"><div class="bg-secondary text-white p-3 text-center rounded">col-6</div></div>
            <div class="col-6"><div class="bg-secondary text-white p-3 text-center rounded">col-6</div></div>
          </div>
        </div>`,
        `<div class="container">
  <div class="row">
    <div class="col">col</div>
    <div class="col">col</div>
    <div class="col">col</div>
  </div>
  <div class="row">
    <div class="col-6">col-6</div>
    <div class="col-6">col-6</div>
  </div>
</div>`,
        `import { Grid, Row, Col } from '@legalops/ui';

<Grid>
  <Row>
    <Col>col</Col>
    <Col>col</Col>
    <Col>col</Col>
  </Row>
</Grid>`,
        'row + col para criar layouts flexíveis'
      )}

      <div class="card mb-4 shadow-sm">
        <div class="card-header bg-body-tertiary fw-bold">Breakpoints</div>
        <div class="card-body">
          <table class="table">
            <thead><tr><th>Breakpoint</th><th>Classe</th><th>Largura</th></tr></thead>
            <tbody>
              <tr><td>Extra small</td><td><code>col-*</code></td><td>&lt;576px</td></tr>
              <tr><td>Small</td><td><code>col-sm-*</code></td><td>≥576px</td></tr>
              <tr><td>Medium</td><td><code>col-md-*</code></td><td>≥768px</td></tr>
              <tr><td>Large</td><td><code>col-lg-*</code></td><td>≥992px</td></tr>
              <tr><td>Extra large</td><td><code>col-xl-*</code></td><td>≥1200px</td></tr>
              <tr><td>XXL</td><td><code>col-xxl-*</code></td><td>≥1400px</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;
}

function paginaContainers() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Containers</h2>
      <p class="lead text-muted mb-5">Elementos de layout para centralizar e limitar largura.</p>

      <div class="card mb-4 shadow-sm">
        <div class="card-header bg-body-tertiary fw-bold">Tipos de Container</div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead><tr><th>Classe</th><th>Small</th><th>Medium</th><th>Large</th><th>XL</th><th>XXL</th></tr></thead>
              <tbody>
                <tr><td><code>.container</code></td><td>540px</td><td>720px</td><td>960px</td><td>1140px</td><td>1320px</td></tr>
                <tr><td><code>.container-fluid</code></td><td colspan="5">100% em todos</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  `;
}

function paginaBotoes() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Botões</h2>
      <p class="lead text-muted mb-5">Botões interativos com as cores do design system.</p>

      ${componenteComCodigo('Botões Sólidos',
        `<div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-primary">Primário</button>
          <button class="btn btn-secondary">Secundário</button>
          <button class="btn btn-tertiary text-white">Terciário</button>
        </div>`,
        `<button class="btn btn-primary">Primário</button>
<button class="btn btn-secondary">Secundário</button>
<button class="btn btn-tertiary">Terciário</button>`,
        `<Button variant="primary">Primário</Button>
<Button variant="secondary">Secundário</Button>
<Button variant="tertiary">Terciário</Button>`,
        'Primária (#E5293F) | Secundária (#ACBAC2) | Terciária (#7F919A)'
      )}

      ${componenteComCodigo('Botões Outline',
        `<div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-outline-primary">Outline Primário</button>
          <button class="btn btn-outline-secondary">Outline Secundário</button>
          <button class="btn btn-outline-tertiary">Outline Terciário</button>
        </div>`,
        `<button class="btn btn-outline-primary">Outline Primário</button>
<button class="btn btn-outline-secondary">Outline Secundário</button>
<button class="btn btn-outline-tertiary">Outline Terciário</button>`,
        `<Button variant="outline-primary">Outline Primário</Button>
<Button variant="outline-secondary">Outline Secundário</Button>
<Button variant="outline-tertiary">Outline Terciário</Button>`,
        ''
      )}

      ${componenteComCodigo('Tamanhos',
        `<div class="d-flex gap-2 align-items-center flex-wrap">
          <button class="btn btn-primary btn-sm">Pequeno</button>
          <button class="btn btn-primary">Normal</button>
          <button class="btn btn-primary btn-lg">Grande</button>
        </div>`,
        `<button class="btn btn-primary btn-sm">Pequeno</button>
<button class="btn btn-primary">Normal</button>
<button class="btn btn-primary btn-lg">Grande</button>`,
        `<Button size="sm">Pequeno</Button>
<Button>Normal</Button>
<Button size="lg">Grande</Button>`,
        'btn-sm | padrão | btn-lg'
      )}

      ${componenteComCodigo('Estados',
        `<div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-primary">Normal</button>
          <button class="btn btn-primary active">Ativo</button>
          <button class="btn btn-primary" disabled>Desabilitado</button>
        </div>`,
        `<button class="btn btn-primary">Normal</button>
<button class="btn btn-primary" disabled>Desabilitado</button>`,
        `<Button>Normal</Button>
<Button disabled>Desabilitado</Button>`,
        ''
      )}
    </section>
  `;
}

function paginaBadges() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Badges</h2>
      <p class="lead text-muted mb-5">Indicadores visuais para contadores e status.</p>

      ${componenteComCodigo('Badges Sólidos',
        `<div class="d-flex gap-2 flex-wrap">
          <span class="badge bg-primary">Primário</span>
          <span class="badge bg-secondary">Secundário</span>
          <span class="badge bg-tertiary">Terciário</span>
        </div>`,
        `<span class="badge bg-primary">Primário</span>
<span class="badge bg-secondary">Secundário</span>
<span class="badge bg-tertiary">Terciário</span>`,
        `<Badge variant="primary">Primário</Badge>
<Badge variant="secondary">Secundário</Badge>
<Badge variant="tertiary">Terciário</Badge>`,
        ''
      )}

      ${componenteComCodigo('Badge Pill',
        `<div class="d-flex gap-2 flex-wrap">
          <span class="badge rounded-pill bg-primary">Pill Primário</span>
          <span class="badge rounded-pill bg-secondary">Pill Secundário</span>
          <span class="badge rounded-pill bg-tertiary">Pill Terciário</span>
        </div>`,
        `<span class="badge rounded-pill bg-primary">Pill Primário</span>`,
        `<Badge pill variant="primary">Pill Primário</Badge>`,
        ''
      )}
    </section>
  `;
}

function paginaAlertas() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Alertas</h2>
      <p class="lead text-muted mb-5">Mensagens de feedback contextuais.</p>

      ${componenteComCodigo('Alertas do Design System',
        `<div class="alert alert-primary" role="alert">Alerta primário — usando a cor principal do EasyJur.</div>
         <div class="alert alert-secondary" role="alert">Alerta secundário — informação neutra.</div>
         <div class="alert alert-tertiary" role="alert">Alerta terciário — destaque sutil.</div>`,
        `<div class="alert alert-primary" role="alert">Alerta primário</div>
<div class="alert alert-secondary" role="alert">Alerta secundário</div>
<div class="alert alert-tertiary" role="alert">Alerta terciário</div>`,
        `import { Alert } from '@legalops/ui';

<Alert variant="primary">Alerta primário</Alert>`,
        ''
      )}

      ${componenteComCodigo('Alerta com Ícone e Dismiss',
        `<div class="alert alert-primary alert-dismissible fade show d-flex align-items-center" role="alert">
          <i class="bi bi-info-circle-fill me-2"></i>
          <div>
            Alerta com ícone e botão de fechar.
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`,
        `<div class="alert alert-primary alert-dismissible fade show" role="alert">
  Alerta que pode ser fechado.
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>`,
        `<Alert variant="primary" dismissible>Alerta...</Alert>`,
        ''
      )}
    </section>
  `;
}

function paginaCards() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Cards</h2>
      <p class="lead text-muted mb-5">Containers flexíveis para agrupar conteúdo.</p>

      ${componenteComCodigo('Card Básico',
        `<div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">Título do Card</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">Subtítulo</h6>
            <p class="card-text">Conteúdo do card com informações relevantes.</p>
            <a href="#" class="card-link">Link 1</a>
            <a href="#" class="card-link">Link 2</a>
          </div>
        </div>`,
        `<div class="card">
  <div class="card-body">
    <h5 class="card-title">Título</h5>
    <p class="card-text">Conteúdo.</p>
    <a href="#" class="btn btn-primary">Ação</a>
  </div>
</div>`,
        `<Card>
  <Card.Body>
    <Card.Title>Título</Card.Title>
    <Card.Text>Conteúdo.</Card.Text>
  </Card.Body>
</Card>`,
        ''
      )}

      ${componenteComCodigo('Card com Header e Footer',
        `<div class="card text-center" style="width: 18rem;">
          <div class="card-header">Destaque</div>
          <div class="card-body">
            <h5 class="card-title">Tratamento Especial</h5>
            <p class="card-text">Conteúdo com header e footer.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
          <div class="card-footer text-body-secondary">2 dias atrás</div>
        </div>`,
        `<div class="card">
  <div class="card-header">Header</div>
  <div class="card-body">...</div>
  <div class="card-footer">Footer</div>
</div>`,
        `<Card>
  <Card.Header>Header</Card.Header>
  <Card.Body>...</Card.Body>
</Card>`,
        ''
      )}
    </section>
  `;
}

function paginaAccordion() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Accordion</h2>
      <p class="lead text-muted mb-5">Painéis expansíveis para organizar conteúdo.</p>

      ${componenteComCodigo('Accordion Básico',
        `<div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                Item #1
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
              <div class="accordion-body">Conteúdo do primeiro item.</div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                Item #2
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div class="accordion-body">Conteúdo do segundo item.</div>
            </div>
          </div>
        </div>`,
        `<div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" data-bs-toggle="collapse" data-bs-target="#c1">
        Item 1
      </button>
    </h2>
    <div id="c1" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div class="accordion-body">Conteúdo...</div>
    </div>
  </div>
</div>`,
        `import { Accordion } from '@legalops/ui';

<Accordion>
  <Accordion.Item title="Item 1">Conteúdo...</Accordion.Item>
</Accordion>`,
        ''
      )}
    </section>
  `;
}

function paginaModais() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Modais</h2>
      <p class="lead text-muted mb-5">Diálogos modais para interações focadas.</p>

      ${componenteComCodigo('Modal Básico',
        `<div>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Abrir Modal
          </button>

          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Título do Modal</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  Corpo do modal com texto e informações.
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                  <button type="button" class="btn btn-primary">Salvar</button>
                </div>
              </div>
            </div>
          </div>
        </div>`,
        `<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal1">Abrir</button>

<div class="modal fade" id="modal1" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Título</h5>
        <button class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">Conteúdo...</div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
      </div>
    </div>
  </div>
</div>`,
        `import { Modal } from '@legalops/ui';

<Modal isOpen={isOpen} onClose={close}>
  <Modal.Header>Título</Modal.Header>
  <Modal.Body>Conteúdo...</Modal.Body>
</Modal>`,
        'Clique no botão para abrir o modal.'
      )}
    </section>
  `;
}

function paginaTooltips() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Tooltips e Popovers</h2>
      <p class="lead text-muted mb-5">Dicas contextuais flutuantes.</p>

      ${componenteComCodigo('Tooltips',
        `<div class="d-flex gap-2 flex-wrap py-3">
          <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip no topo">
            Tooltip Topo
          </button>
          <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Tooltip na direita">
            Tooltip Direita
          </button>
          <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Tooltip embaixo">
            Tooltip Baixo
          </button>
          <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Tooltip na esquerda">
            Tooltip Esquerda
          </button>
        </div>`,
        `<button data-bs-toggle="tooltip" data-bs-title="Texto">Hover</button>`,
        `<Tooltip content="Texto"><Button>Hover</Button></Tooltip>`,
        'Requer inicialização via JS (new bootstrap.Tooltip)'
      )}
    </section>
  `;
}

function paginaProgress() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Progress</h2>
      <p class="lead text-muted mb-5">Barras de progresso customizadas.</p>

      ${componenteComCodigo('Barras de Progresso',
        `<div class="d-flex flex-column gap-3">
          <div class="progress" role="progressbar">
            <div class="progress-bar bg-primary" style="width: 25%">25%</div>
          </div>
          <div class="progress" role="progressbar">
            <div class="progress-bar bg-secondary" style="width: 50%">50%</div>
          </div>
          <div class="progress" role="progressbar">
            <div class="progress-bar bg-tertiary" style="width: 75%">75%</div>
          </div>
        </div>`,
        `<div class="progress">
  <div class="progress-bar bg-primary" style="width: 25%"></div>
</div>`,
        `<Progress value={25} variant="primary" />`,
        ''
      )}
    </section>
  `;
}

function paginaSpinners() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Spinners</h2>
      <p class="lead text-muted mb-5">Indicadores de carregamento.</p>

      ${componenteComCodigo('Spinners Coloridos',
        `<div class="d-flex gap-3">
          <div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>
          <div class="spinner-border text-secondary" role="status"><span class="visually-hidden">Loading...</span></div>
          <div class="spinner-border text-tertiary" role="status"><span class="visually-hidden">Loading...</span></div>
        </div>`,
        `<div class="spinner-border text-primary"></div>
<div class="spinner-border text-secondary"></div>
<div class="spinner-border text-tertiary"></div>`,
        `<Spinner variant="primary" />`,
        ''
      )}
    </section>
  `;
}

function paginaToasts() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Toasts</h2>
      <p class="lead text-muted mb-5">Notificações estilo push.</p>

      ${componenteComCodigo('Toast Estático',
        `<div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header">
            <div class="rounded me-2 bg-primary" style="width: 20px; height: 20px;"></div>
            <strong class="me-auto">EasyJur</strong>
            <small>11 mins ago</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body">
            Olá! Esta é uma notificação toast.
          </div>
        </div>`,
        `<div class="toast show">
  <div class="toast-header">
    <strong class="me-auto">Título</strong>
    <button class="btn-close"></button>
  </div>
  <div class="toast-body">Mensagem...</div>
</div>`,
        `const { showToast } = useToast();
showToast({ title: 'Título', message: '...' })`,
        ''
      )}
    </section>
  `;
}

function paginaInputs() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Inputs</h2>
      <p class="lead text-muted mb-5">Campos de formulário estilizados.</p>

      ${componenteComCodigo('Campos de Texto',
        `<div class="row g-3">
          <div class="col-12">
            <label class="form-label">Email address</label>
            <input type="email" class="form-control" placeholder="name@example.com">
          </div>
          <div class="col-12">
            <label class="form-label">Textarea</label>
            <textarea class="form-control" rows="3"></textarea>
          </div>
        </div>`,
        `<label class="form-label">Email</label>
<input type="email" class="form-control" placeholder="name@example.com">`,
        `<Input label="Email" placeholder="..." />`,
        ''
      )}
    </section>
  `;
}

function paginaSelects() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Selects</h2>
      <p class="lead text-muted mb-5">Menus de seleção nativos.</p>

      ${componenteComCodigo('Form Select',
        `<select class="form-select" aria-label="Default select example">
          <option selected>Abra o menu de seleção</option>
          <option value="1">Opção Um</option>
          <option value="2">Opção Dois</option>
          <option value="3">Opção Três</option>
        </select>`,
        `<select class="form-select">
  <option>Opção 1</option>
</select>`,
        `<Select options={[{label: 'Opção 1', value: 1}]} />`,
        ''
      )}
    </section>
  `;
}

function paginaCheckboxes() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Checkboxes e Radios</h2>
      <p class="lead text-muted mb-5">Seleção múltipla e única.</p>

      ${componenteComCodigo('Checkbox',
        `<div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">Checkbox padrão</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
            <label class="form-check-label" for="flexCheckChecked">Checkbox marcado</label>
          </div>
        </div>`,
        `<div class="form-check">
  <input class="form-check-input" type="checkbox" id="c1">
  <label class="form-check-label" for="c1">Label</label>
</div>`,
        `<Checkbox label="Label" />`,
        ''
      )}
    </section>
  `;
}

function paginaSwitches() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Switches</h2>
      <p class="lead text-muted mb-5">Interruptores toggle.</p>

      ${componenteComCodigo('Switch',
        `<div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
          <label class="form-check-label" for="flexSwitchCheckDefault">Switch padrão</label>
        </div>
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
          <label class="form-check-label" for="flexSwitchCheckChecked">Switch ativado</label>
        </div>`,
        `<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch">
  <label class="form-check-label">Switch</label>
</div>`,
        `<Switch label="Switch" />`,
        ''
      )}
    </section>
  `;
}

function paginaInputGroup() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Input Group</h2>
      <p class="lead text-muted mb-5">Agrupamento de inputs e botões.</p>

      ${componenteComCodigo('Input Group',
        `<div class="input-group mb-3">
          <span class="input-group-text">@</span>
          <input type="text" class="form-control" placeholder="Username">
        </div>
        <div class="input-group">
          <span class="input-group-text">R$</span>
          <input type="text" class="form-control">
          <span class="input-group-text">,00</span>
        </div>`,
        `<div class="input-group">
  <span class="input-group-text">@</span>
  <input type="text" class="form-control">
</div>`,
        `<InputGroup prefix="@">
  <Input />
</InputGroup>`,
        ''
      )}
    </section>
  `;
}

function paginaNavbar() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Navbar</h2>
      <p class="lead text-muted mb-5">Barra de navegação responsiva.</p>

      ${componenteComCodigo('Navbar Primary',
        `<nav class="navbar navbar-expand-lg bg-primary navbar-dark rounded">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">EasyJur</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav1">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="nav1">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
                <li class="nav-item"><a class="nav-link" href="#">Features</a></li>
              </ul>
            </div>
          </div>
        </nav>`,
        `<nav class="navbar bg-primary navbar-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Logo</a>
  </div>
</nav>`,
        `<Navbar brand="Logo" variant="primary" />`,
        ''
      )}
    </section>
  `;
}

function paginaBreadcrumb() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Breadcrumb</h2>
      <p class="lead text-muted mb-5">Navegação estrutural.</p>

      ${componenteComCodigo('Breadcrumb',
        `<nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item"><a href="#">Library</a></li>
            <li class="breadcrumb-item active" aria-current="page">Data</li>
          </ol>
        </nav>`,
        `<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item active">Data</li>
  </ol>
</nav>`,
        `<Breadcrumb items={['Home', 'Data']} />`,
        ''
      )}
    </section>
  `;
}

function paginaTabs() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Tabs</h2>
      <p class="lead text-muted mb-5">Navegação em abas.</p>

      ${componenteComCodigo('Nav Tabs',
        `<ul class="nav nav-tabs mb-3">
          <li class="nav-item"><a class="nav-link active" href="#">Active</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Link</a></li>
          <li class="nav-item"><a class="nav-link disabled">Disabled</a></li>
        </ul>`,
        `<ul class="nav nav-tabs">
  <li class="nav-item"><a class="nav-link active">Active</a></li>
</ul>`,
        `<Tabs>
  <Tab title="Active">...</Tab>
</Tabs>`,
        ''
      )}
    </section>
  `;
}

function paginaPagination() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Pagination</h2>
      <p class="lead text-muted mb-5">Paginação de resultados.</p>

      ${componenteComCodigo('Pagination',
        `<nav aria-label="Page navigation">
          <ul class="pagination">
            <li class="page-item disabled"><a class="page-link">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item active"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav>`,
        `<ul class="pagination">
  <li class="page-item"><a class="page-link">1</a></li>
</ul>`,
        `<Pagination total={10} current={2} />`,
        ''
      )}
    </section>
  `;
}

function paginaDropdown() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Dropdowns</h2>
      <p class="lead text-muted mb-5">Menus flutuantes.</p>

      ${componenteComCodigo('Dropdown Button',
        `<div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown button
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>`,
        `<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">
    Dropdown
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item">Action</a></li>
  </ul>
</div>`,
        `<Dropdown title="Dropdown">
  <Dropdown.Item>Action</Dropdown.Item>
</Dropdown>`,
        ''
      )}
    </section>
  `;
}

function paginaTabelas() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Tabelas</h2>
      <p class="lead text-muted mb-5">Exibição de dados tabulares.</p>

      ${componenteComCodigo('Tabela Striped',
        `<table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr><th scope="row">1</th><td>Mark</td><td>Otto</td><td>@mdo</td></tr>
            <tr><th scope="row">2</th><td>Jacob</td><td>Thornton</td><td>@fat</td></tr>
            <tr><th scope="row">3</th><td>Larry</td><td>the Bird</td><td>@twitter</td></tr>
          </tbody>
        </table>`,
        `<table class="table table-striped">
  <thead>...</thead>
  <tbody>...</tbody>
</table>`,
        `<Table striped data={...} />`,
        ''
      )}
    </section>
  `;
}

function paginaListGroup() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">List Group</h2>
      <p class="lead text-muted mb-5">Listas flexíveis e poderosas.</p>

      ${componenteComCodigo('Lista Simples',
        `<ul class="list-group" style="max-width: 400px;">
          <li class="list-group-item active" aria-current="true">An active item</li>
          <li class="list-group-item">A second item</li>
          <li class="list-group-item">A third item</li>
          <li class="list-group-item">A fourth item</li>
        </ul>`,
        `<ul class="list-group">
  <li class="list-group-item active">Active</li>
  <li class="list-group-item">Item</li>
</ul>`,
        `<ListGroup>
  <ListGroup.Item active>Active</ListGroup.Item>
</ListGroup>`,
        ''
      )}
    </section>
  `;
}

function paginaHelpers() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Utilitários</h2>
      <p class="lead text-muted mb-5">Classes utilitárias de uso comum.</p>

      <div class="row g-4">
        <div class="col-md-6">
          <div class="card h-100">
            <div class="card-header fw-bold">Text Colors</div>
            <div class="card-body">
              <p class="text-primary">.text-primary</p>
              <p class="text-secondary">.text-secondary</p>
              <p class="text-tertiary">.text-tertiary (custom)</p>
              <p class="text-success">.text-success</p>
              <p class="text-danger">.text-danger</p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card h-100">
            <div class="card-header fw-bold">Backgrounds</div>
            <div class="card-body">
              <div class="p-2 mb-2 bg-primary text-white">.bg-primary</div>
              <div class="p-2 mb-2 bg-secondary text-white">.bg-secondary</div>
              <div class="p-2 mb-2 bg-tertiary text-white">.bg-tertiary (custom)</div>
              <div class="p-2 mb-2 bg-light text-dark">.bg-light</div>
              <div class="p-2 mb-2 bg-dark text-white">.bg-dark</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
