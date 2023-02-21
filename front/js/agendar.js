function precherData(){
    

    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    dataAtual = dia + '/' + mes + '/' + ano;

    let vano = dataAtual.substring(6);
    let vmes = dataAtual.substring(3,5);
    let vdia = dataAtual.substring(0,2);
    
    document.getElementById("dataInicial").value = vano +'-'+vmes+'-'+vdia;
    document.getElementById("dataFinal").value = vano +'-'+vmes+'-'+vdia;
}
//Busca o solicitante por CPF no endpont do back
function buscarSolicitante() {
     const cpf = document.getElementById("cpf");

    if (cpf.value == "") {
        alert('Informar o CPF!');
    }
    if (cpf.value != "") {
        //Enviando solicitação ao backend
        fetch('http://localhost:8080/solicitante/' + cpf.value).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        })
            .then((data) => {
                
                console.log('Recebido os seguintes dados do back:');
                console.log(data);
                atribuirCampos(data);
            })
            .catch((error) => {
                console.log(error)
                alert('Usuário não encontrado!');
            });
    } 
}


//Preenche os campos nome e departamento
function atribuirCampos(data) {

    if (data == null) {
        alert('Usuário não encontrado!');
    }
    const nome = document.querySelector("#nome");
    const departamento = document.querySelector("#departamento");

    nome.value = data.nome;
    departamento.value = data.departamento;
}

function addToTable() {

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

    //Preenchendo Json    
    let _data = {
        "solicitante": {
            "cpf": cpf.value
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

    //Envio de post com os dados para o endpoint de agenda.
    console.log('Enviando ao Back o seguinte Json:')
    fetch('http://localhost:8080/agenda', {
        method: "POST",
        body: JSON.stringify(_data),
        headers: { "Content-type": "application/json;charset=UTF-8" }

    })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err))
    alert("Cadastrado com sucesso!");

    limparCampos()

}

function limparCampos() {
    document.getElementById('cpf').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('departamento').value = '';
    document.getElementById("ramal").value = '';
    document.getElementById("local").value = '';
    precherData();
    document.getElementById("horaInicial").value = '';
    document.getElementById("horaFinal").value = '';
    document.getElementById("descricao").value = '';
    projetor.checked = false;
    nenhum.checked = false;
}

function dataDiaMesAno(data) {
    let dia = data.substring(8);
    let mes = data.substring(7, 5);
    let ano = data.substring(0, 4);
    return dia + '/' + mes + '/' + ano;
}