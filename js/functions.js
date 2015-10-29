var realClasse, idCatch, query;

var classes = document.getElementsByClassName('link-displayer');
for (var i = 0; i <classes.length; i++) {
  classes[i].addEventListener('click',displayNone);
}

function displayBlock(){
  document.getElementById('sub-tabs').style.display='block';
  document.getElementById('sub-tabs-responsive').style.display='block';
}

function displayNone(){
  limpaCampos();
  document.getElementById('sub-tabs').style.display='none';
  document.getElementById('sub-tabs-responsive').style.display='none';
}

function menuResponsive(){
  menu = document.getElementById('ulResponsive');
  if (menu.style.display == "none") {
    menu.style.display = "block";
  }

  else if (menu.style.display == "block") {
    menu.style.display = "none"
  }
}


function limpaCampos(){
  document.getElementById("tempID").innerHTML = "";
  document.getElementById('tempContatos1').innerHTML ="";
  document.getElementById('tempContatos2').innerHTML ="";
  document.getElementById('tempApaga').innerHTML ="";
  document.getElementById('tempAltera').innerHTML ="";
  document.getElementById('nomeContato').value ="";
  document.getElementById('telContato').value ="";
  document.getElementById('emailContato').value ="";
  document.getElementById('pegaClasse').value ="";
  document.getElementById('pegaNome').value ="";
  document.getElementById('idAlterar').value ="";
  document.getElementById('idApagar').value ="";
}

function valida(conteudo){
  var reg = new RegExp("^[a-zA-Z0-9]*$");
  return reg.test(conteudo);
}

function armazenaAgenda(nome,agenda){
  if (valida(nome+agenda)) {
    var AngularParse = Parse.Object.extend('usuarios');
    point = new Parse.GeoPoint({latitude: latitudeUsuario, longitude: longitudeUsuario});
    obj = new AngularParse();
    obj.set("nome", nome);
    obj.set("agenda", agenda); 
    obj.set("coordenadas",point);
    obj.save(null, {
      success: function(valor) {
        document.getElementById("tempID").innerHTML = "";
        document.getElementById("tempID").innerHTML = "Anote a ID de sua Agenda: <input type='text' value='"+obj.id+"' readonly maxlength='10'>";
      },
      error: function(valor, error) {
        alert("Falha ao criar objeto" + error.message);
      }
    });
  }
  else{
    alert('Escreva somente caracteres alfanuméricos, por favor!');
    return false;
  }
}

function confirmarAgenda(){
  realClasse = document.getElementById('nomeAgenda').value+document.getElementById('idAgenda').value;
  query = new Parse.Query(realClasse);
  query.addAscending("nome");
}

function armazenaContatos(nome,tel,email){
  var AngularParse = Parse.Object.extend(realClasse);
  obj = new AngularParse();
  obj.set("nome", nome);
  obj.set("telefone", tel);
  obj.set("email", email);
  obj.save(null, {
    success: function(valor) {
      document.getElementById('tempContatos1').innerHTML += "<span class='change'>Contato criado com sucesso!</span> <br>";
    },
    error: function(valor, error) {
      document.getElementById('tempContatos1').innerHTML += "<span class='change'>Falha ao criar contato! Você informou errado seu ID ou nome de Agenda!</span> <br>";
    }
  });
}

function retornaContatos(){
  confirmarAgenda();
  document.getElementById("tempContatos2").innerHTML ="";
  query.find({
    success: function(results) { 
      for (var i = 0; i < results.length; i++) {
        document.getElementById("tempContatos2").innerHTML += "<span class='change'>"+(i+1)+"º Contato</span><br> ID do contato: <input type='text' value='"+results[i].id+"' readonly maxlength='10'> <br> Nome: "+results[i].get("nome")+" <br> Telefone: "+results[i].get("telefone")+"<br> E-Mail:"+results[i].get("email")+"<hr><br>";
      }

    },
    error: function(error) {
      document.getElementById('tempContatos2').innerHTML += "<span class='change'>Fala ao consultar contatos!</span> <br>";
    }
  });
}

function consultaApaga(){
  document.getElementById("tempApaga").innerHTML = "";
  idCatch = document.getElementById('idApagar').value;
  query.find({
    success: function(results) {
      for (var i = 0; i < results.length; i++) {
        if (results[i].id == idCatch) {
          document.getElementById("tempApaga").innerHTML = "Nome do contato: "+results[i].get("nome")+" <br> Telefone do contato: "+results[i].get("telefone")+"<br> E-Mail do contato:"+results[i].get("email")+"<hr><br>";
          document.getElementById("tempApaga").innerHTML += "<button onclick='apagarContato()' class='btn'>Apagar</button>";
        }
      }

    },
    error: function(error) {
      document.getElementById("tempApaga").innerHTML = "<span class='change'>Não existe contato com a ID informada!</span> <br>";
    }
  });
}

function apagarContato(){
  query.get(idCatch, {
    success: function(myObj) {
      myObj.destroy({});
      document.getElementById("tempApaga").innerHTML = "<span class='change'>Contato apagado com sucesso</span>";
    },
    error: function(object, error) {
     document.getElementById("tempApaga").innerHTML = "<span class='change'>O contato não foi apagado</span>";
   }
 });
}

function consultaAltera(){
  document.getElementById("tempAltera").innerHTML = "";
  idCatch = document.getElementById('idAlterar').value;
  query.get(idCatch,{
    success: function(contato) {
      document.getElementById("tempAltera").innerHTML = "Nome do contato: <input type='text' id='atualizaNome' value='"+contato.get("nome")+"'> <br> Telefone do contato:  <input type='text' id='atualizaTel' value='"+contato.get("telefone")+"'> <br> E-Mail do contato: <input type='text' id='atualizaEmail' value='"+contato.get("email")+"'><hr><br>";
      document.getElementById("tempAltera").innerHTML+="<span class='change'>Atualize os dados e clique em confirmar</span> <br> <input type='button' value='Confirmar' class='btn' onclick='atualizaContato()'>";
    },
    error: function(error) {
      document.getElementById('tempAltera').innerHTML = "<span class='change'>Falha ao procurar contato!</span> <br>";
    }
  });
}

function atualizaContato(){
  novoNome=document.getElementById('atualizaNome').value;
  novoTel=document.getElementById('atualizaTel').value;
  novoEmail=document.getElementById('atualizaEmail').value;
  document.getElementById("tempAltera").innerHTML = "";
  query.get(idCatch,{
    success: function(contato) {
      contato.set("nome",novoNome);
      contato.set("telefone",novoTel);
      contato.set("email",novoEmail);
      contato.save();
      document.getElementById("tempAltera").innerHTML = "Nome do contato: <input type='text' id='atualizaNome' value='"+contato.get("nome")+"'> <br> Telefone do contato:  <input type='text' id='atualizaTel' value='"+contato.get("telefone")+"'> <br> E-Mail do contato: <input type='text' id='atualizaEmail' value='"+contato.get("email")+"'><hr><br>";
      document.getElementById("tempAltera").innerHTML+="<span class='change'>Atualize os dados e clique em confirmar</span> <br> <input type='button' value='Confirmar' class='btn' onclick='atualizaContato()'> <br><hr>"
      document.getElementById("tempAltera").innerHTML+="Contato atualizado com sucesso!";
    },
    error: function(error) {
      document.getElementById('tempAltera').innerHTML = "<span class='change'>Falha ao procurar contato!</span> <br>";
    }
  });
}