function somar(){
    var num1 = window.document.getElementById('num1');
    var num2 = window.document.getElementById('num2');
    var resultado = window.document.getElementById('res');
    var Numero1 = Number((num1.value));
    var Numero2 = Number((num2.value));
    resultado.innerHTML = `O Resultado é: ${Numero1 + Numero2}`

}

function reset(){
    var resultado = window.document.getElementById('res');
    resultado,innerHTML = 'Resultado';
}

//Data da Atividade: 31_08_24