// Função do SnackBar
function showSnackBar() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
  
    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  function cadastrar() {

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = nome.value;
    var emailVar = email.value;
    var telVar = tel.value;
    var senhaVar = senha.value;
  
    if (nomeVar == "" || emailVar == "" || telVar == "" || senhaVar == "") {
  
        snackbar.innerHTML = "É necessário preecher todos os campos!";
        showSnackBar();
        
        // finalizarAguardar();
        return false;
    }
  
    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nomeVar,
            emailServer: emailVar,
            telServer: telVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
  
        console.log("resposta: ", resposta);
  
        if (resposta.ok) {
  
            snackbar.innerHTML = "Cadastro realizado! Redirecionando";
            showSnackBar();
  
            setTimeout(() => {
                window.location = "login.html";
            }, "2000")
          
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        // finalizarAguardar();
    });
  
    return false;
  }
  
  function validarSessao() {
    // aguardar();
  
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
  
    if (email != null && nome != null) {
        // window.alert(`Seja bem-vindo, ${nome}!`);
        b_usuario.innerHTML = nome;
  
        // finalizarAguardar();
    } else {
        window.location = "../login.html";
    }
  }
  
  function entrar() {
    
    var emailVar = emailLog.value;
    var senhaVar = senhaLog.value;
  
    if (emailVar == "" || senhaVar == "") {
      snackbar.innerHTML = "É necessário preencher todos os campos"
      showSnackBar();  
      
      return false;
    }
  
    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);
  
    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")
  
        if (resposta.ok) {
            console.log(resposta);
  
            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
  
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;
  
                snackbar.innerHTML = "Entrando..."
                showSnackBar();
  
                setTimeout(function () {
                    window.location.href = "./logado.html";
                }, 1000); // apenas para exibir o loading
  
            });
  
        } else {
  
            console.log("Houve um erro ao tentar realizar o login!");
  
            snackbar.innerHTML = "Usuário ou senha inválidos!"
            showSnackBar();
  
            resposta.text().then(texto => {
                console.error(texto);
                // finalizarAguardar(texto);
            });
        }
  
    }).catch(function (erro) {
        console.log(erro);
    })
  
    return false;
  }