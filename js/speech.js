const btnGravar = document.querySelector("#btnGravar")
const btnParar = document.querySelector("#btnParar")

class speechApi {

  constructor() {

    const SpeechToText = window.SpeechRecognition || window.webkitSpeechRecognition

    this.speechApi = new SpeechToText()
    this.speechApi.continuous = true
    this.speechApi.lang = "pt-BR"
    
    this.speechApi.onresult = (e) => {
      var resultIndex = e.resultIndex;
      var transcript = e.results[resultIndex][0].transcript;
	  
	  if(transcript.search("pare") > -1){btnParar.click();};
	  	
		console.log('Tem que falar: '+palavras[rodada%5]);
	  	if(transcript.search(palavras[rodada%5]) > -1){//falou
			console.log('Acertou:'+palavras[rodada%5]);
			pintarBackground('.palavra','white');
			console.log('Rodada: '+rodada);
			document.querySelectorAll('.palavra')[rodada%5].style.backgroundColor = '#ffca2c';
			document.querySelectorAll('.btn-jogador')[rodada%jogadores.length].click();
		};
    }
  }

  start() {
    this.speechApi.start()
  }

  stop() {
    this.speechApi.stop()
  }
}

  var speech = new speechApi()

  btnGravar.addEventListener("click", e => {
    btnGravar.disabled = true
    btnParar.disabled = false
    speech.start()
  })

  btnParar.addEventListener("click", () => {
    btnGravar.disabled = false
    btnParar.disabled = true
    speech.stop()
  })