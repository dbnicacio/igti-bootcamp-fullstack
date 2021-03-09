window.addEventListener("load", escreverNumero());

function escreverNumero() {
  var slider = document.querySelector("#slider");
  slider.addEventListener("input", imprimirNumero);
}

function imprimirNumero() {
  var numeroAtual = document.querySelector("#numeroAtual");
  var numeroExtenso = document.querySelector("#numeroExtenso");
  numeroAtual.value = slider.value;
  numeroExtenso.value = escreverNumeroExtenso(numeroAtual.value);
}

function dezenasEspeciais(numero) {
  var valores = ["onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete",
    "dezoito", "dezenove"];
  return valores[numero[1] - 1];
}

function unidades(numero) {
  var valores = ["zero", "um", "dois", "três", "quatro", "cinco", "seis",
    "sete", "oito", "nove"];
  return valores[numero];
}

function dezenas(numero) {
  if (numero > 10 && numero < 20) {
    return dezenasEspeciais(numero);
  } else {
    var valores = ["dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta",
      "setenta", "oitenta", "noventa"];
    numeroExtenso = valores[(numero[0] - 1)] + (numero[1] != 0 ? " e " + unidades(numero[1]) : "");
    return numeroExtenso;
  }
}

function centenas(numero) {
  var valores = ["cem", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos",
    "oitocentos", "novecentos"];

  if (numero > 100 && numero < 200) {
    numeroExtenso = "cento";
  } else {
    numeroExtenso = valores[(numero[0] - 1)];
  }

  if (numero[1] == 0 && numero[2] > 0) {
    numeroExtenso += " e " + unidades(numero[2]);
  } else if (numero.substr(1, 2) > 10) {
    numeroExtenso += " e " + dezenas(numero.substr(1, 2));
  }

  return numeroExtenso;
}

function escreverNumeroExtenso(numero) {

  if (numero.length == 3) {
    return centenas(numero)
  } else if (numero.length == 2) {
    return dezenas(numero);
  } else if (numero.length == 1) {
    return unidades(numero);
  }
  return "ERRO";
}