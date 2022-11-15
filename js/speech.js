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
			console.log('Acertou:'+palavras[rodada%5]);
			document.querySelectorAll('.btn-jogador')[rodada%jogadores.length].click();
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
	pintarBackground('.nome-jogador','white');
	document.querySelectorAll('.nome-jogador')[rodada%(jogadores.length)].style.backgroundColor = '#ffca2c';
	
	pintarBackground('.palavra','white');
	document.querySelectorAll('.palavra')[rodada%5].style.backgroundColor = '#ffca2c';  
	  
	btnGravar.style.display = 'none';
    speech.start();
	
  })
  
  //setInterval(function () {document.querySelector("#btnGravar").click();}, 300);