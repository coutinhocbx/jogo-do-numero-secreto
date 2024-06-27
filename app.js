//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

//é possível reduzir as linhas acima atraves de uma função!

/* tendo em vista que as 4 linhas acima são resumidamente isso abaixo:
let campo = document.querySelector(tag) (pois h1 e p são tags)
campo.innerhtml = texto
*/
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirTextoNaTela(tag, texto) { // dentro do parenteses temos PARAMETROS
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,'Brazilian Portuguese Female',{rate:1.2});
    //responsiveVoice é uma extensão adicionada no script lá no HTML, que atraves desse comando acima, foi possível soliciar a leitura do texto de acordo com os parametros do site, incluindo a velocidade de reprodução da voz da mini querida leitora
}
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}
exibirMensagemInicial();

function verificarChute() { //função -nome-() parenteses junto pro java reconhecer como função
    let chute = document.querySelector('input').value; //buscando o VALOR de uma string de texto
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto)
            exibirTextoNaTela('p', 'O número secreto é menor');
        else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo(); //() vazio = não tem parametros
    }
}

function gerarNumeroAleatorio() { //includes = verifica se há um elemento na lista
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; //lista.length busca a lista toda/mostra quantidade de elementos

if (quantidadeDeElementosNaLista == 3) {
    listaDeNumerosSorteados = [];
}

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio(); //return gera outro numero, de forma a não repetir caso esteja na lista
    } else {    //push = adiciona um item ao final da lista enquanto pop remove
        listaDeNumerosSorteados.push(numeroEscolhido); //else+push adiciona na lista caso não esteja incluido
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
} //return = retorna uma informação
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}