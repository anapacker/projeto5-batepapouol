let boxMsgHTML = "";
const objName = {
    name: ""

}
let ultimaMensagem;
entrarNaSala()
buscarMsgServidor();
setInterval(continuarPegandoMsgNovas, 3000);


function buscarMsgServidor() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(construirMsgNaTela);
}


function continuarPegandoMsgNovas() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(filtrarMsgsNovas);
    // promessa.catch()
}

function filtrarMsgsNovas(resposta) {
    const todasAsMensagens = resposta.data;
    let mensagensNovas = [];
    let indexMensagem = null;
    for (let i = 0; i < todasAsMensagens.length; i++) {

        if (todasAsMensagens[i].from === ultimaMensagem.from && todasAsMensagens[i].time === ultimaMensagem.time) {
            indexMensagem = i + 1;
        }
    }

    if (indexMensagem < todasAsMensagens.length - 1) {
        for (let j = indexMensagem; j < todasAsMensagens.length; j++) {
            mensagensNovas.push(todasAsMensagens[j])
        }
    }

    if (mensagensNovas.length > 0) {
        colocarNovasMensagensNaTela(mensagensNovas)
    }
}

function colocarNovasMensagensNaTela(mensagensNovas) {

    // if (mensagensNovas.length > 0) {

    const listaMensagens = mensagensNovas;
    ultimaMensagem = listaMensagens[listaMensagens.length - 1]

    boxMsgHTML = "";
    for (let i = 0; i < listaMensagens.length; i++) {

        let objetoMsg = listaMensagens[i];
        let tipoMsg = objetoMsg.type;
        let msgHTML = "";

        if (tipoMsg === "status") {
            msgHTML =
                `
                        <li class="mensagem status">
                            <span class="horario-msg">(${objetoMsg.time})</span>
                            <span class="remetente-msg"><strong>${objetoMsg.from}</strong> </span>
                            <span class="status-msg">${objetoMsg.text}</span>
                        </li>
                  
                `
        } else if (tipoMsg === "message") {
            msgHTML =
                `<li class="mensagem">
                    <span class="horario-msg">(${objetoMsg.time})</span>
                    <span class="enviado-por">${objetoMsg.from}</strong></span>
                    <span class="remetente-msg"><strong>${objetoMsg.to}:</strong></span>
                    <span class="conteudo-msg">${objetoMsg.text}</span>
                </li>`

        }

        boxMsgHTML += msgHTML;

    }
    document.querySelector(".box-mesages").innerHTML += boxMsgHTML;
    document.querySelector(".box-mesages").lastElementChild.scrollIntoView({ behavior: "smooth", block: "center" });

    // }

}

function construirMsgNaTela(resposta) {
    const listaMensagens = resposta.data;
    ultimaMensagem = listaMensagens[listaMensagens.length - 1]


    boxMsgHTML = "";
    for (let i = 0; i < listaMensagens.length; i++) {

        let objetoMsg = listaMensagens[i];
        let tipoMsg = objetoMsg.type;
        let msgHTML = "";

        if (tipoMsg === "status") {
            msgHTML =
                `
                    <li class="mensagem status">
                        <span class="horario-msg">(${objetoMsg.time})</span>
                        <span class="remetente-msg"><strong>${objetoMsg.from}</strong> </span>
                        <span class="status-msg">${objetoMsg.text}</span>
                    </li>
              
            `
        } else if (tipoMsg === "message") {
            msgHTML =
                `<li class="mensagem">
                <span class="horario-msg">(${objetoMsg.time})</span>
                <span class="enviado-por">${objetoMsg.from}</strong></span>
                <span class="remetente-msg"><strong>${objetoMsg.to}:</strong></span>
                <span class="conteudo-msg">${objetoMsg.text}</span>
            </li>`

        }

        boxMsgHTML += msgHTML;

    }
    document.querySelector(".box-mesages").innerHTML += boxMsgHTML;
    document.querySelector(".box-mesages").lastElementChild.scrollIntoView({ behavior: "smooth", block: "center" });
}

function entrarNaSala() {
    const askName = prompt("Digite seu nome");
    objName.name = askName;
    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", objName);
    promessa.then(definirIntervaloManterConexao);
    promessa.catch(tratarErroLogin);



}

function tratarErroLogin() {
    alert("Esse nome já existe");
    entrarNaSala();
}

function definirIntervaloManterConexao() {
    setInterval(enviarNome, 4000);
}

function enviarNome() {
    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", objName);
    promessa.then();
    promessa.catch();
}

function enviarMensagem() {

}