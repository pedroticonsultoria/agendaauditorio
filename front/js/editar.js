src = "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.21.0/moment.min.js";
//Busca o solicitante por CPF no endpont do back
function buscarAgenda() {

    var url_ = location.href;
    var idAgenda = url_.substring(url_.lastIndexOf("=") + 1, url_.length);

    fetch('http://localhost:8080/agenda/' + idAgenda).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Something went wrong');
    })
        .then((data) => {
            atribuirCampos(data);
        })
        .catch((error) => {
            console.log(error)
            document.getElementById('nome').value = '';
            document.getElementById('departamento').value = '';
        });
}

//Preenche os campos nome e departamento
function atribuirCampos(data) {

    if (data == null) {
        alert('Agenda não encontrada!');
    }

    console.log('Dados recebidos do back')
    console.log(data)

    cpf.value = data.solicitante.cpf;
    nome.value = data.solicitante.nome;
    departamento.value = data.solicitante.departamento;
    ramal.value = data.ramal;
    local.value = data.local;
    dataInicial.value = dataAnoMesDia(data.dataInicial);
    dataFinal.value = dataAnoMesDia(data.dataFinal);
    horaInicial.value = data.horaInicial;
    horaFinal.value = data.horaFinal;
    descricao.value = data.descricao;
    if (data.equipamento == 'Sim') {
        projetor.checked = true;
    }
    if (data.equipamento == 'Não') {
        nenhum.checked = true;
    }
}

//Envio de post com os dados para o endpoint de agenda.
function salvarAlteracoes() {

    // dados a serem enviados pela solicitação POST
    const cpf = document.getElementById("cpf");
    const ramal = document.getElementById("ramal");
    const local = document.getElementById("local");
    const dataInicial = document.getElementById("dataInicial");
    const dataFinal = document.getElementById("dataFinal");
    const horaInicial = document.getElementById("horaInicial");
    const horaFinal = document.getElementById("horaFinal");
    const descricao = document.getElementById("descricao");
    const equipamento = document.getElementById("projetor");

    //Validando campos
    if (cpf.value == "") { return alert('Informar o CPF!'); }
    if (ramal.value == "") { document.getElementById("ramal").focus(); return alert('Informar o Ramal!'); }
    if (local.value == "") { document.getElementById("local").focus(); return alert('Informar o Local!'); }
    if (dataInicial.value == "") { document.getElementById("dataInicial").focus(); return alert('Informar a Data Inicial!'); }
    if (dataFinal.value == "") { document.getElementById("dataFinal").focus(); return alert('Informar a Data Final!'); }
    if (horaInicial.value == "") { document.getElementById("horaInicial").focus(); return alert('Informar a Hora Inicial!'); }
    if (horaFinal.value == "") { document.getElementById("horaFinal").focus(); return alert('Informar a Hora Final!'); }
    if (!document.getElementById("projetor").checked && !document.getElementById("nenhum").checked) {
        return alert('Selecionar a opção se precisa de projetor!');
    }
    if (document.getElementById("projetor").checked && document.getElementById("nenhum").checked) {
        return alert('Selecionar somente uma opção do projetor!');
    }




    var url_ = location.href;
    var idAgenda = url_.substring(url_.lastIndexOf("=") + 1, url_.length);


    let _data = {
        "id": idAgenda,
        "solicitante": {
            "id": 1,
            "cpf": cpf.value,
            "nome": nome.value,
            "departamento": departamento.value
        },
        "ramal": ramal.value,
        "local": local.value,
        "dataInicial": dataDiaMesAno(dataInicial.value),
        "dataFinal": dataDiaMesAno(dataFinal.value),
        "horaInicial": horaInicial.value,
        "horaFinal": horaFinal.value,
        "descricao": descricao.value,
        "equipamento": projetor.checked
    }

    console.log('Enviando ao back o seguinte Json:')

    fetch('http://localhost:8080/agenda/' + idAgenda, {
        method: "PUT",
        body: JSON.stringify(_data),
        headers: { "Content-type": "application/json;charset=UTF-8" }

    })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err))
    alert("Alterações Salvas com sucesso!");


}

function limparCampos() {
    document.getElementById('cpf').value = '';
    document.getElementById("ramal").value = '';
    document.getElementById("local").value = '';
    document.getElementById("dataInicial").value = '';
    document.getElementById("dataFinal").value = '';
    document.getElementById("horaInicial").value = '';
    document.getElementById("horaFinal").value = '';
    document.getElementById("descricao").value = '';
    document.getElementById("equipamento").value = "false";
    document.getElementById("nenhum").value = "false";
}


function dataAnoMesDia(data) {
    let ano = data.substring(6);
    let mes = data.substring(3, 5);
    let dia = data.substring(0, 2);
    return ano + '-' + mes + '-' + dia;
}


function dataDiaMesAno(data) {
    let dia = data.substring(8);
    let mes = data.substring(7, 5);
    let ano = data.substring(0, 4);
    return dia + '/' + mes + '/' + ano;
}