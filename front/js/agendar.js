//Busca o solicitante por CPF no endpont do back
function buscarSolicitante(){
    const cpf = document.getElementById("cpf");
    
    const equipamento = document.getElementById("projetor");

/*   fetch('http://localhost:8080/solicitante/' + cpf.value).then(response =>{
    return response.json();
        })
    .then(data =>{
          atribuirCampos(data);
          console.log(data);
    }) */

    fetch('http://localhost:8080/solicitante/' + cpf.value).then((response) => {
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
        alert('Usuário não encontrado');
        document.getElementById('nome').value='';
        document.getElementById('departamento').value='';
        
        console.log(data);
      });
} 


//Preenche os campos nome e departamento
function atribuirCampos(data)
    {

    if(data == null){
        alert('Usuário não encontrado!');
    }
    const nome = document.querySelector("#nome");
    const departamento = document.querySelector("#departamento");

    nome.value = data.nome;
    departamento.value = data.departamento;
    }

//Envio de post com os dados para o endpoint de agenda.
function addToTable(){

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



        let _data = {
            "solicitante": {
                "cpf": cpf.value
            },
            "ramal": ramal.value,
            "local": local.valuee,
            "dataInicial": dataInicial.value,
            "dataFinal": dataFinal.value,
            "horaInicial": horaInicial.value,
            "horaFinal": horaFinal.value,
            "descricao": descricao.value,
            "equipamento": equipamento.value
        }
        
        fetch('http://localhost:8080/agenda', {
            method: "POST",
            body: JSON.stringify(_data),
            headers: {"Content-type": "application/json;charset=UTF-8"}
            
        })
        .then(response => response.json()) 
        .then(json => console.log(json))
        .catch(err => console.log(err));
    
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