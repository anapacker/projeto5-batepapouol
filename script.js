let boxMsgHTML = "";
buscarMsgServidor();
setInterval(buscarMsgServidor, 3000);


function buscarMsgServidor() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(construirMsgNaTela);
}

function construirMsgNaTela(resposta) {
    const listaMensagens = resposta.data;
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
    document.querySelector(".box-mesages").innerHTML += boxMsgHTML
}
