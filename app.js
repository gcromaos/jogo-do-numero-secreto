//criacao de uma variavel titulo e utilizando o objeto domunet que fornece uma interação entre conteudo 
//dps a utilização do querySelection que vai no html e busca o objteo q precisamos no caso o h1
//que vai ser sempre o mais importante do html pq eh literlamnete o titulo da pagina
//let titulo = document.querySelector('h1');
//relacionando o conteudo da variavel titulo com oq ta dentro do html
//titulo.innerHTML = 'jogo do numero secreto';

//let paragrafo = document.querySelector('p');// selecionamos o elemento p presnete no html
//paragrafo.innerHTML = ('escolha um numero entre 1 e 100'); //agora nesse string fes mudar na pagina web
let listaDeNumerosSorteados = []; 
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// a função tem parametro mas nao tem retorno, ou seja, so vai exibir algo na tela mas nao vamos ter retonro sobre
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'jogo do numero secreto');
    exibirTextoNaTela('p', 'escolha um numero entre 1 e 10');
}

exibirMensagemInicial();

//a função abaixo nao tem parametro () nem retorno
function verificarChute() {
    let chute = document.querySelector('input').value; 
    //console.log (chute == numeroSecreto);
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'acertou :))');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; 
        let mensagemTentativas = `voce descobriu o numero secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(chute > numeroSecreto) {
            exibirTextoNaTela('p', 'o numero secreto eh menor');
        } else {
            exibirTextoNaTela('p', 'o numero secreto eh maior');
        }
        //tentativas = tentativas +1;
        tentativas++; 
        limparCampo();
    }
}

//a função nao tem parametro mas tem retorno (a geração de um nuemro entre 1 e 10)
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == 10) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio(); 
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = ' ';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    //codigo repetido nunca eh bom!!
    //exibirTextoNaTela('h1', 'jogo do numero secreto');
    //exibirTextoNaTela('p', 'escolha um numero entre 1 e 10');
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}
