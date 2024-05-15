const chatbotMessages = document.querySelector(".chatbot-messages");
const chatbotInput = document.querySelector(".chatbot-input input");
const chatbotButton = document.querySelector(".chatbot-input button");
let etapaAtual = {etapa: "mensagem-inicial"}
let input = document.querySelector("#teste");
var scrollPosition = 500;

localStorage.setItem('etapaAtual', JSON.stringify(etapaAtual));
let etapaString = localStorage.getItem('etapaAtual')

let etapaObj = JSON.parse(etapaString);



document.addEventListener("DOMContentLoaded", function () {
  console.log("Etapa atual:", localStorage.getItem("etapa-atual"));
  console.log("Histórico:", localStorage.getItem("historico-conversa"));
  addMessage(
    `Deseja comecar o jogo?\n========================\n[1] Iniciar\n[2] Fechar\n[3] Continuar`,
    "bot"
  );
});

chatbotButton.addEventListener("click", () => {
  const userMessage = `${chatbotInput.value}`;
  const botMessage = getBotMessage(userMessage);
  console.log(etapaObj.etapa)
  scrollPosition +=500;

  if (chatbotInput != "") {
    addMessage("CD:\\User> " + userMessage, "user");
    addMessage(botMessage, "bot");
  }
  if (userMessage == 3) {
    alert("Legal, vou carregar o histórico");
  }
  chatbotInput.value = "";
});

chatbotInput.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    chatbotButton.click();
  }
});

function addMessage(message, type) {
  const chatbotMessage = document.createElement("div");
  chatbotMessage.classList.add("chatbot-message", "pulsating-cursor", type);

  if (type == "bot") {
    let tempText = "";
    input.disabled = true;
    let loopDeTexto = setInterval(() => {
      tempText += message[tempText.length];
      chatbotMessage.textContent = tempText;
      document.getElementsByClassName('chatbot-messages')[0].scrollTo(0,scrollPosition)
      if (tempText == message) {
        clearInterval(loopDeTexto);
        chatbotMessage.classList.remove("pulsating-cursor");
        input.disabled = false;
        input.focus() 
      }
    }, 50);
  } else {
    chatbotMessage.textContent = message;
  }

  chatbotMessages.appendChild(chatbotMessage);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

  localStorage.setItem("etapa-atual", etapaAtual);
  localStorage.setItem(
    "historico-conversa",
    JSON.stringify(["teste", "teste"])
  );
}

function getBotMessage(message) {
  switch (etapaAtual.etapa) {
    case "mensagem-inicial":
      if (message == "1") {
        etapaAtual.etapa = "fase-1";
        return "Bora comer capim! \n[1]sim \n[2]nao";
      }
      if (message == "2") {
        etapaAtual.etapa = "fim";
        return "O jogo acabou, você perdeu";
      } 
      else {
        return "Tem parada errada ai, pfv esolha uma opção:\n---------------------------\n[1] Iniciar\n[2] Fechar\n[3] Continuar";
      }
      break;

    case "fim":
      etapaAtual.etapa = "continua"
      return "O jogo já acabou cara, supera";
      break;
    case "continua":
      etapaAtual.etapa = "desenho"
      return "voce esta insistindo muito, realmente quer continuar? [Digite sim ou nao]"  
    break

    case "desenho":
      if (message == 'sim'){
        etapaAtual.etapa = "comecar"
      return `
      ───▄█▌─▄─▄─▐█▄
      ───██▌▀▀▄▀▀▐██
      ───██▌─▄▄▄─▐██
      ───▀██▌▐█▌▐██▀
      ▄██████─▀─██████▄
         CARREGANDO...

          Voce agora se encontra dentro de uma casa, as unicas 
          encontradas são uma porta que leva para saida, outra porta
          que leva para um outro comodo, ou uma escada que leva ao andar
          de cima, onde deseja ir. Digite: [Sair] [Subir] [Direita]
         `}

        else {
          etapaAtual.etapa = "mensagem-inicial"
          return "desistiu ne? se cagou de medo... \npfv esolha uma opção:\n---------------------------\n[1] Iniciar\n[2] Fechar\n[3] Continuar"
        }
    break
    case "comecar":    
      
    break
    case "fase-1":

      if (message == "1") {
        etapaAtual.etapa = "fase-2";
        return "hmmmm capinzinho bao quer mais?";
      } 
      if (message == "2"){
        return "fela diz sim"
      }
      else{
        return "mensagem nao encontrada";
      }
    
      break;

    case "fase-2":

    if (message == "sim") {
      etapaAtual.etapa = "mensagem-inicial";
      return "hmmmmmm eita capinzinho bao \nacabou o jogo parceiro. \n esolha uma opção:\n---------------------------\n[1] Iniciar\n[2] Fechar\n[3] Continuar";
    } else {
      return "mensagem nao encontrada \nhmmmm capinzinho bao quer mais?";
    }
    break;

    case "fase-3":
      etapaAtual.etapa = "mensagem-inicial";
      return "acabou o jogo parceiro.\n esolha uma opção:\n---------------------------\n[1] Iniciar\n[2] Fechar\n[3] Continuar"
    break;
    default:
      return "eu não entendi mano";
      break;
  }
}

