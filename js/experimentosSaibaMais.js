class experimentosSaibaMais {
  constructor() {
    this.experimento = null
    this.init()
  }

  async init() {
    const urlParams = new URLSearchParams(window.location.search)
    const experimentoNome = urlParams.get('nome')

    try {
      await this.carregarDetalhes(experimentoNome)
    } catch (erro) {
      alert('Ocorreu um erro ao carregar detalhes')
      console.error(erro)
    }
  }
  async carregarDetalhes(expNome) {
    try {
      const response = await fetch('../data/experimentos.json')
      const data = await response.json()

      this.experimento = data.find(exp => exp.nome === expNome)

      if (this.experimento) {
        this.renderizarDetalhes()
      } else throw new Error('Erro ao renderizar detalhes')
    } catch (erro) {
      alert('Ocorreu um erro')
      console.error(erro)
    }
  }

  renderizarDetalhes() {
    const container = document.getElementById('experimentoSaibaMais')

    /* SVG do ícone do link externo*/
    const iconeLink = `
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        <polyline points="15 3 21 3 21 9"/>
        <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
    `

    /* SVG do ícone de equipe*/
    const iconeEquipe = `
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <circle cx="9" cy="8" r="3"/>
        <path d="M3 21a6 6 0 0 1 12 0"/>
        <circle cx="17" cy="9" r="2.5"/>
        <path d="M17 15a5 5 0 0 1 4 5"/>
    </svg>
    `
    const iconeTopico = `
    <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
        >
        <path d="M9 18h6"/>
        <path d="M10 22h4"/>
        <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2.3h6c0-1.1.4-1.8 1-2.3A7 7 0 0 0 12 2z"/>
    </svg>
    `

    container.innerHTML = `
                    <section class="experimento-detalhes">
                    
                        <div class="project-main">
                            <span class="eyebrow-text">PROJETO</span>
                            <h1>${this.experimento.nome}</h1>
                            <p class="lead">${this.experimento.topicos}</p>
                            <h2>Sobre o projeto</h2>
                            <p>${this.experimento.descricao}</p>

                        <ul class="useful-links">
                            ${
                              Array.isArray(this.experimento.midia)
                                ? this.experimento.midia
                                    .map(
                                      midia => `
                                    <li>
                                        <a href="${midia.url}" target="_blank" rel="noopener noreferrer">
                                            <span class="link-label">
                                                ${iconeLink}
                                                ${midia.nome}
                                            </span>
                                            <span class="link-arrow">&rarr;</span>
                                        </a>
                                    </li>
                                `
                                    )
                                    .join('')
                                : ''
                            }
                        </ul>           
                        </div>

                        <aside class="project-aside">
                        <div class="project-aside-block">
                        <h3>
                            ${iconeEquipe}
                            Equipe
                        </h3>
                       <ul class="team-list">
                            ${this.experimento.responsaveis
                              .map(responsavel => `<li>${responsavel}</li>`)
                              .join('')}
                        </ul>
                        </div>

                        <div class="project-aside-block">
                        <h3>
                            ${iconeTopico}
                            Tópicos do projeto
                        </h3>
                       <div class="tag-list">
                            ${this.experimento.tematica
                              .map(
                                tematica1 => `
                                <span class="tag">${tematica1}</span>
                                `
                              )
                              .join('')}
                        </div>
                        </div>
                    </aside>
                    </div>
                    `
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new experimentosSaibaMais()
})
