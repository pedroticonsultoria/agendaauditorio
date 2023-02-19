function carregarLista(){  

  fetch('http://localhost:8080/agenda')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let dados = data;    


      for(var i=0;i< dados.agendas.length; i++){
        
        var html = "<tr>";
        html +="<td>"+dados.agendas[i].id+"</td>";
        html +="<td>"+dados.agendas[i].solicitante.nome+"</td>";
        html +="<td>"+dados.agendas[i].ramal+"</td>";
        html +="<td>"+dados.agendas[i].local+"</td>";
        html +="<td>"+dados.agendas[i].dataInicial+"</td>";
        html +="<td>"+dados.agendas[i].horaInicial+"</td>";
        html +="<td>"+dados.agendas[i].dataFinal+"</td>";
        html +="<td>"+dados.agendas[i].horaFinal+"</td>";
        html +="<td>"+dados.agendas[i].descricao+"</td>";
        html +="<td>"+dados.agendas[i].equipamento+"</td>";        
        html +="<td><button onclick=redirecionar("+dados.agendas[i].id+")>Editar</button></td>";
        html +="<td><button onclick=deletar("+dados.agendas[i].id+")>Apagar</button></td>";
        html +="</tr>";
        $('table tbody').append(html);
       }
    })

}


function deletar(idAgenda){
  deletaContato(idAgenda);
  alert("Agendamento deletado!");  
  window.location.reload();
}

async function deletaContato(idAgenda) {
  let url = 'http://localhost:8080/agenda/' + idAgenda
  const retorno = await fetch(url, {
      method: 'DELETE',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS,DELETE'
      }
  }).then(response => response.json())
      .then(data => {
          console.log(data);
      });
  console.log(retorno);
  
  carregarLista();
  }

function redirecionar(idAgenda){
  window.location.href = "editar.html?agenda=" + idAgenda;
}