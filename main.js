let url_partidos = 'https://dadosabertos.camara.leg.br/api/v2/partidos?itens=100&ordem=ASC&ordenarPor=sigla'

async function getPartidos() {
    const response = await fetch(url_partidos)
    const data = await response.json()
    let partidos = data.dados
         
    partidos.forEach(function(dados, index) {        
        let partidoId = dados.id        
        let partidoSigla = dados.sigla

        var partidosSelect = document.getElementById("partidos-select");
        var opt = document.createElement("option");
        opt.value = partidoId;
        opt.text = partidoSigla;
        partidosSelect.add(opt, partidosSelect.options[0]); 
    });
}

function criaLinha(usuario) {

    linha = document.createElement("tr")
    tdNome = document.createElement("td")
    tdSiglaPartido = document.createElement("td")
    tdSiglaUf = document.createElement("td")
    tdEmail = document.createElement("td")

    tdNome.innerHTML = usuario.nome
    tdSiglaPartido.innerHTML = usuario.siglaPartido
    tdSiglaUf.innerHTML = usuario.siglaUf
    tdEmail.innerHTML = usuario.email


    linha.appendChild(tdNome)
    linha.appendChild(tdSiglaPartido)
    linha.appendChild(tdSiglaUf)
    linha.appendChild(tdEmail)

    return linha;
}

async function getParlamentar() {
    
    let partido = document.getElementById("partidos-select").value;

    const response = await fetch('https://dadosabertos.camara.leg.br/api/v2/partidos/'+ partido +'/membros?itens=500')
    const data = await response.json()
    let parlamentares = data.dados


    let tabela = document.getElementById("tabela");
    parlamentares.forEach(element => {
        let linha = criaLinha(element);
        tabela.appendChild(linha);
    });
}


function main() {
    getPartidos()
}

main()