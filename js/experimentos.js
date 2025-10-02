const experimentosContainer = document.querySelector("#experimentosGrid");

fetch("../data/experimentos.json")
    .then(response => {
        if(!response.ok) throw new Error(`${response.status}`)
        return response.json();
    })
    .then((data) =>{
        const cardsHTML = data.map(exp => {
            return `
            <div class="experimento-card">
                <div class= "card-corpo">
                    <ul> 
                        <li><h2>${exp.nome}</h2></li>
                        <li>${exp.tematica.join(", ")}</li>
                    </ul>

                    <p class="responsaveis">Por ${exp.responsaveis.join(", ")}.</p>
                    <p class="topicos">${exp.topicos}</p>

                    <a href="components/experimentosDetalhes.html?nome=${exp.nome}" class="card-link">Ver Detalhes</a>
                </div>
            </div>
            `
        })
        .join('');

        experimentosContainer.innerHTML = cardsHTML
    })
    .catch(error =>{
        console.error("falha ao carregar os experimentos",error)
        experimentos
    })