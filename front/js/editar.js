 src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.21.0/moment.min.js";
//Busca o solicitante por CPF no endpont do back
function buscarAgenda(){

    var url_ = location.href;
    var idAgenda = url_.substring(url_.lastIndexOf("=")+1,url_.length);

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
        document.getElementById('nome').value='';
        document.getElementById('departamento').value='';
      });
} 

//Preenche os campos nome e departamento
function atribuirCampos(data)
{

    if(data == null){
        alert('Agenda não encontrada!');
    }
     
    cpf.value = data.solicitante.cpf;
    nome.value = data.solicitante.nome;
    departamento.value = data.solicitante.departamento;
	local.value = data.local;
    dataInicial.value = formataData(data.dataInicial);
    dataFinal.value = formataData(data.dataFinal) ;
    horaInicial.value = data.horaInicial;
    horaFinal.value = data.horaFinal;
    descricao.value = data.descricao;
    projetor.checked = data.equipamento;
    console.log(data);
}

//Envio de post com os dados para o endpoint de agenda.
function salvarAlteracoes(){

    // dados a serem enviados pela solicitação POST
    const cpf = document.getElementById("cpf");
    const nome = document.querySelector("#nome");
    const departamento = document.querySelector("#departamento");
    const ramal = document.getElementById("ramal");
	const local = document.getElementById("local");
    const dataInicial = document.getElementById("dataInicial");
    const dataFinal = document.getElementById("dataFinal");
    const horaInicial = document.getElementById("horaInicial");
    const horaFinal = document.getElementById("horaFinal");
    const descricao = document.getElementById("descricao");
    const equipamento = document.getElementById("projetor");

    

    var url_ = location.href;
    var idAgenda = url_.substring(url_.lastIndexOf("=")+1,url_.length);


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
            "dataInicial": dataInicial.value,
            "dataFinal": dataFinal.value,
            "horaInicial": horaInicial.value,
            "horaFinal": horaFinal.value,
            "descricao": descricao.value,
            "equipamento": equipamento.value
        }

        console.log(_data)
        
        fetch('http://localhost:8080/agenda/'+ idAgenda, {
            method: "PUT",
            body: JSON.stringify(_data),
            headers: {"Content-type": "application/json;charset=UTF-8"}
            
        })
        .then(response => response.json()) 
        .then(json => console.log(json))
        .catch(err => console.log(err))
        alert("Alterações Salvas com sucesso!");

    
}

function limparCampos()
    {
        document.getElementById('cpf').value='';
        document.getElementById("ramal").value='';
        document.getElementById("local").value='';
        document.getElementById("dataInicial").value='';
        document.getElementById("dataFinal").value='';
        document.getElementById("horaInicial").value='';
        document.getElementById("horaFinal").value='';
        document.getElementById("descricao").value='';
        document.getElementById("equipamento").value="false";
    }  

  
function formataData(data){
    let ano = data.substring(6);
    let mes = data.substring(3,5);
    let dia = data.substring(0,2);
    return ano +'-'+mes+'-'+dia;
}