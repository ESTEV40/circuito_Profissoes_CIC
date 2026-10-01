const container = document.querySelector('#experimentosContainer')
const proximo = document.querySelector('.proximo')
const anterior = document.querySelector('.anterior')
const indicadoresContainer = document.querySelector('#carouselIndicators')

let paginaAtual = 0
let totalPaginas = 0

fetch('./data/experimentos.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`)
    }

    return response.json()
  })
  .then(data => {
    container.innerHTML = data
      .map(
        (exp, index) => `
            <article class="experimento-card">

                <div class="projeto-topo">
                    <span class="projeto-numero">
                        ${String(index + 1).padStart(2, '0')}
                    </span>

                    <h3>${exp.nome}</h3>
                </div>

                <div class="projeto-conteudo">
                    <p>${exp.topicos}</p>

                    <a
                        href="components/experimentosDetalhes.html?nome=${encodeURIComponent(exp.nome)}"
                        class="projeto-btn"
                    >
                        Ver detalhes
                    </a>
                </div>

            </article>
        `
      )
      .join('')

    atualizarPaginas()
    criarIndicadores()
    atualizarCarousel()
  })
  .catch(error => {
    console.error('Falha ao carregar os experimentos:', error)
  })

function quantidadeVisivel() {
  return window.innerWidth <= 768 ? 1 : 2
}

function atualizarPaginas() {
  const quantidade = quantidadeVisivel()

  totalPaginas = Math.ceil(container.children.length / quantidade)

  if (paginaAtual >= totalPaginas) {
    paginaAtual = totalPaginas - 1
  }
}

function criarIndicadores() {
  indicadoresContainer.innerHTML = ''

  for (let i = 0; i < totalPaginas; i++) {
    const indicador = document.createElement('span')

    indicador.classList.add('indicator')

    if (i === paginaAtual) {
      indicador.classList.add('ativo')
    }

    indicador.addEventListener('click', () => {
      paginaAtual = i
      atualizarCarousel()
    })

    indicadoresContainer.appendChild(indicador)
  }
}

function atualizarCarousel() {
  const cards = container.children

  if (cards.length === 0) {
    return
  }

  const quantidade = quantidadeVisivel()

  const card = cards[0]

  const larguraCard = card.getBoundingClientRect().width

  const gap = parseFloat(getComputedStyle(container).gap)

  const deslocamento = paginaAtual * quantidade * (larguraCard + gap)

  container.style.transform = `translateX(-${deslocamento}px)`

  document.querySelectorAll('.indicator').forEach((indicador, index) => {
    indicador.classList.toggle('ativo', index === paginaAtual)
  })
}

proximo.addEventListener('click', () => {
  if (paginaAtual < totalPaginas - 1) {
    paginaAtual++
    atualizarCarousel()
  }
})

anterior.addEventListener('click', () => {
  if (paginaAtual > 0) {
    paginaAtual--
    atualizarCarousel()
  }
})

window.addEventListener('resize', () => {
  const paginaAnterior = paginaAtual

  atualizarPaginas()

  if (paginaAtual !== paginaAnterior) {
    criarIndicadores()
  }

  atualizarCarousel()
})
