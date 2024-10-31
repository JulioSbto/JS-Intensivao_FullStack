function Tabuada() {
    var numero = document.getElementById('numero').value;
    var resultado = document.getElementById('resultado');
    resultado.innerHTML = "";

    if (numero === "") {
        resultado.innerHTML = "Insira um número.";
        return;
    }

    var numeroInt = parseInt(numero);
    var resultadoHtml = "<h3>Tabuada de " + numeroInt + ":</h3>";

    for (var i = 1; i <= 10; i++) {
        resultadoHtml += numeroInt + " x " + i + " = " + (numeroInt * i) + "<br>";
    }

    resultado.innerHTML = resultadoHtml;
}
