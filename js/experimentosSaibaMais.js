class experimentosSaibaMais{
    constructor(){
        this.experimento = null
        this.init()
    }

    async init(){
        const urlParams = new URLSearchParams(window.location.search)
        const experimentoNome = urlParams.get('nome')

        try {
            await this.carregarDetalhes(experimentoNome)
        } catch (erro) {
            alert("Ocorreu um erro ao carregar detalhes")
            console.error(erro)
        }

    }
    async carregarDetalhes(expNome) {
        try {
            
            const response = await fetch('../data/experimentos.json')
            const data = await response.json()

            this.experimento = data.find(exp => exp.nome === expNome)

            if(this.experimento){
                this.renderizarDetalhes()
            }else throw new Error('Erro ao renderizar detalhes')

        } catch (erro) {
            alert('Ocorreu um erro')
            console.error(erro)
        }
    }

    renderizarDetalhes(){
        const container = document.getElementById('experimentoSaibaMais');

        let botoesMidiaHTML = ''; // 1. Começamos com uma string vazia

        // 2. Verificamos se 'midia' existe e é um array
        if (Array.isArray(this.experimento.midia) && this.experimento.midia.length > 0) {
            
            // Se for um array de links, usamos .map() para criar um botão para cada link
            botoesMidiaHTML = this.experimento.midia.map((link, index) => {
                return `<a href="${link}" class="midia" target="_blank" rel="noopener noreferrer">
                            <span class="material-icons">link <p><b>Link ${index + 1}</b></p></span> 
                        </a>`;
            }).join(''); // .join('') junta todos os botões em uma única string de HTML

        } else if (typeof this.experimento.midia === 'string' && this.experimento.midia.trim() !== '') {
            
            // Se for apenas uma string (um único link), criamos um único botão
            botoesMidiaHTML = `<a href="${this.experimento.midia}" class="midia" target="_blank" rel="noopener noreferrer">
                                    <span class="material-icons">link <p><b>Link para o Experimento</b></p></span> 
                                </a>`;
        }
        container.innerHTML = `
                    <section class="experimento-detalhes">
                    
                        <div class="detalhes-cabecalho">
                            <a href="/index.html" class="botao-paginaAnterior"> <span class = "material-icons">arrow_back_ios</span> Página Anterior</a>
                            <ul>
                                <li><h1>${this.experimento.nome}</h1></li>
                                <li><h3>${this.experimento.tematica}</h3></li>
                            </ul>
                            <h3>Responsáveis</h3>
                            <p>${this.experimento.responsaveis.join(', ')}</p>
                        </div>
                        <div class="detalhes-corpo">
                            <h2 class="descricao">Descrição do Experimento</h2>
                            <p>${this.experimento.descricao}</p>
                            <h2 class="topicos">Tópicos de Computação</h2>
                            <p>${this.experimento.topicos}</p>
                            
                            <h2 class="visualiza">Visualize o Experimento!</h2>
                            ${botoesMidiaHTML}
                        </div>
                    </section>
                    `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new experimentosSaibaMais();
})