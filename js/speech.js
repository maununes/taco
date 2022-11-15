const btnGravar = document.querySelector("#btnGravar")
const btnParar = document.querySelector("#btnParar")

class speechApi {

  constructor() {

    const SpeechToText = window.SpeechRecognition || window.webkitSpeechRecognition

    this.speechApi = new SpeechToText();
    this.speechApi.continuous = true;
    this.speechApi.lang = "pt-BR";
    
    this.speechApi.onresult = (e) => {
      var resultIndex = e.resultIndex;
      var transcript = e.results[resultIndex][0].transcript;
	  
	  if(transcript.search("pare") > -1){btnParar.click();};
	  	
		console.log('Tem que falar: '+palavras[rodada%5]);
	  	if(transcript.search(palavras[rodada%5]) > -1){//falou
			rodada++;
			console.log('Acertou:'+palavras[rodada%5]);
			pintarBackground('.palavra','white');
			document.querySelectorAll('.palavra')[rodada%5].style.backgroundColor = '#ffca2c';
			document.querySelectorAll('.btn-jogador')[rodada%jogadores.length].click();
			
			pintarBackground('.nome-jogador','white');
			document.querySelectorAll('.nome-jogador')[rodada%(jogadores.length+1)].style.backgroundColor = '#ffca2c';
		};
    }
	
	this.speechApi.onend = (e) => {
		this.speechApi.start();
	}
	
  }

  start() {
    this.speechApi.start();
	play('start');
  }

  stop() {
    this.speechApi.stop();
	play('errou');
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
  
  //setInterval(function () {document.querySelector("#btnGravar").click();}, 300);