

let jogadores = [];
let monte_cartas = [];
let vez_jogador=0;
let ultimoVencedor = -1;
let rodada = 1;

function iniciar(){
	configurarJogadores();
	distribuirCartas();
}

function configurarJogadores(){
	
	
		let jogador = {
			nome:'AAA',
			cartas:[],
			vitorias:0
		};
		jogadores.push(jogador);
		
		
		jogador = {
			nome:'BBB',
			cartas:[],
			vitorias:0
		};
		jogadores.push(jogador);
		
		
		jogador = {
			nome:'CCC',
			cartas:[],
			vitorias:0
		};
		jogadores.push(jogador);
		
		jogador = {
			nome:'DDD',
			cartas:[],
			vitorias:0
		};
		jogadores.push(jogador);
	
	/*
	console.log('Configurando jogadores');
	let qtd_jogadores = parseInt(window.prompt('Quantos jogadores?'));
	if(!(qtd_jogadores > 0 && qtd_jogadores <= 10)){
		location.reload();
		return;
	}	
	console.log('Serão criados '+qtd_jogadores+' jogadores');
	for(j=0;j<qtd_jogadores;j++){
		let nome = window.prompt('Nome do jogador '+(j+1));
		let jogador = {
			nome:nome.toUpperCase(),
			cartas:[],
			vitorias:0
		}
		jogadores.push(jogador);
		console.log('Criou jogador: '+nome);
	}
	*/
	
}

function embaralhar(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function distribuirCartas(){
	rodada = 1;
	console.log('Distribuindo cartas');
	
	for(j=0;j<jogadores.length;j++){
		jogadores[j].cartas = [];	
	}
	
	let qtd_carta = 10;
	let total_cartas = 0;
	monte_cartas = [];
	
	if(jogadores.length > 5){qtd_carta = 20;}
	
	//criar castas de cada tipo
	while(qtd_carta>0){
		monte_cartas.push('taco');
		total_cartas++;
		monte_cartas.push('cabra');
		total_cartas++;
		monte_cartas.push('pizza');
		total_cartas++;
		monte_cartas.push('queijo');
		total_cartas++;
		monte_cartas.push('gato');
		total_cartas++;
		qtd_carta--;
	}
	
	monte_cartas.push('baleia');
	total_cartas++;
	monte_cartas.push('gorila');
	total_cartas++;
	monte_cartas.push('rena');
	total_cartas++;
	monte_cartas.push('marmota');
	total_cartas++;
	
	//embaralhar cartas
	monte_cartas = embaralhar(monte_cartas);

	//distribuir cartas	
	for(j=0;j<jogadores.length;j++){
		jogadores[j].cartas = [];
	}
	
	let auxj = 0;
	while (monte_cartas.length > 0){
		jogadores[auxj].cartas.push(monte_cartas.pop());
		auxj++;
		if(auxj >= jogadores.length){auxj = 0;}
	}
	
	for(j=0;j<jogadores.length;j++){
		console.log('Cartas de: '+jogadores[j].nome);
		console.log(jogadores[j].cartas);
	}
	
	monte_cartas = [];
	
	desenharTela();
	play('start');
}

let acoes = ['dar carta','reportar'];
let acao = 0;
function desenharTela(){
	console.log('Desenhando tela');
	let tela = document.getElementById("tela");
	let viewHTML = '';
	viewHTML = viewHTML +'Monte: <b>'+monte_cartas.length+'</b> cartas';
	viewHTML = viewHTML +'<table style="margin:0 auto;" class="table table-bordered border-default"><thead class="table-light">';
	viewHTML = viewHTML +'<tr>';
	viewHTML = viewHTML +'<th><img height="35" src="img/coroa.JPG"    style="border-radius:10px"></th>';
	viewHTML = viewHTML +'<th><img height="35" src="img/jogador.JPG"  style="border-radius:10px"></th>';
	viewHTML = viewHTML +'<th><img height="35" src="img/cartas.JPG"   style="border-radius:10px"></th>';
	viewHTML = viewHTML +'</thead></tr><tbody class="table-group-divider">';
	for(j=0;j<jogadores.length;j++){
		viewHTML = viewHTML +'<tr>';
		viewHTML = viewHTML +'<td >'+jogadores[j].vitorias+'</td>';
		viewHTML = viewHTML +'<td class="nome-jogador"><button class="btn btn-light" onclick="acaoJogador('+j+')">'+jogadores[j].nome+'</button> </td>';
		viewHTML = viewHTML +'<td>'+jogadores[j].cartas.length+'</td>';
		viewHTML = viewHTML +'</tr>';
	}
	viewHTML = viewHTML +'</tbody></table><br>';
	viewHTML = viewHTML +'<button onclick="reportarPerdedor();play(\'beep\')" class="btn btn-warning"> Quem perdeu? </button> <br>';
	console.log(viewHTML);
	tela.innerHTML = viewHTML;
}

function reportarPerdedor(){
	if(acao == 1){
		acao = 0;
		play('start');
		pintarBackground(".nome-jogador","transparent");
		alert('Segue o jogo!');
	}else{
		acao = 1;
		pintarBackground(".nome-jogador","red");
	}
	
	//alert('Indique quem perdeu');
}

function acaoJogador(j){
	//dar carta
	if(acao == 0 ){
		porCartaNaMesa(j);
		if(temVencedor()){
			encerrarJogo();
		}
	}
	
	//reportar
	if(acao == 1){
		indicarPerdedorRodada(j);
		desenharTela();
		acao = 0;
	}
}

function temVencedor(){
	for(j=0;j<jogadores.length;j++){
		if(jogadores[j].cartas.length == 0){
			ultimoVencedor = j;
			return true;
		}	
	}
	return false;
}

function encerrarJogo(){
	play('win');
	alert('Vencedor: '+ jogadores[ultimoVencedor].nome);
	jogadores[ultimoVencedor].vitorias = jogadores[ultimoVencedor].vitorias+1;
	distribuirCartas();
}

function porCartaNaMesa(j){
	let carta = jogadores[j].cartas.pop();
	monte_cartas.push(carta);
	desenharTela();
	console.log('Jogador '+jogadores[j].nome+' puxou carta: '+carta);
	console.log('Tem '+monte_cartas.length+' cartas na mesa');
	mostrarCarta(carta);
}

function mostrarCarta(carta){
	document.getElementById("carta_imagem").src='img/'+carta+'.JPG';
	document.getElementById("carta").style.display='block';
	play('beep');
	setTimeout(function(){
		document.getElementById("carta").style.display='none';
		document.getElementById("carta_imagem").src='';
	}, 500);
}

function indicarPerdedorRodada(jogador_perdeu){
	monte_cartas.reverse();
	jogadores[jogador_perdeu].cartas = monte_cartas.concat(jogadores[jogador_perdeu].cartas);
	monte_cartas = [];
	play('lose');
}

function play(audio) {
  var audio = new Audio('sound/'+audio+'.wav');
  audio.play();
}

function pintarBackground(el,color){
	var x = document.querySelectorAll(el);
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = color;
    }
}

iniciar();