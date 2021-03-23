import fs from "fs";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const DIR_DADOS = "./dados/";
const DIR_GERADOS = `${DIR_DADOS}gerados/`;
const DIR_ARQ_ESTADOS = "./dados/Estados.json";
const DIR_ARQ_CIDADES = "./dados/Cidades.json";
var estados;
var cidades;

lerArquivos();
gerarArquivos();
maioresEstados();
menoresEstados();
maiorCidadePorEstado();
menorCidadePorEstado();
maiorCidade();
menorCidade();
rl.question("Digite um estado: ", entradaEstado => {
  console.log("Quantidade de cidades: " + calculaCidadesUF(entradaEstado.toUpperCase()));
});

function lerArquivos() {
  try {
    estados = JSON.parse(fs.readFileSync(DIR_ARQ_ESTADOS, "utf-8"));
    cidades = JSON.parse(fs.readFileSync(DIR_ARQ_CIDADES, "utf-8"));
  } catch (err) {
    console.log(err);
  }
}

function gerarArquivos() {
  try {
    estados.forEach(estado => {
      let jsonCidades = cidades.filter((cidade) => {
        return cidade.Estado === estado.ID;
      });
      fs.writeFileSync(`${DIR_GERADOS}${estado.Sigla}.json`, JSON.stringify(jsonCidades));
    });
  } catch (err) {
    console.log(err);
  }
}

function calculaCidadesUF(uf) {
  var estadoSelecionado = JSON.parse(fs.readFileSync(`${DIR_GERADOS}${uf}.json`, "utf-8"));
  return estadoSelecionado.length;
}

function qtdCidadesPorEstado() {
  let listaEstados = [];
  listaEstados = estados.map(estado => {
    const { Sigla } = estado;
    return {
      UF: Sigla,
      Cidades: JSON.parse(fs.readFileSync(`${DIR_GERADOS}${estado.Sigla}.json`, "utf-8")).length
    };
  })
  return listaEstados;
}

function maioresEstados() {
  let listaEstados = qtdCidadesPorEstado();
  console.log(listaEstados.sort((a, b) => b.Cidades - a.Cidades).filter((i, index) => (index < 5)));
}

function menoresEstados() {
  let listaEstados = qtdCidadesPorEstado();
  console.log(listaEstados.sort((a, b) => a.Cidades - b.Cidades)
    .filter((i, index) => (index < 5))
    .sort((a, b) => b.Cidades - a.Cidades));
}

function maiorCidadePorEstado() {
  let listaEstados = [];
  listaEstados = estados.map(estado => {
    const { Sigla } = estado;

    let listaCidades = JSON.parse(fs.readFileSync(`${DIR_GERADOS}${estado.Sigla}.json`, "utf-8"))
    let cidadeMaiorNome = listaCidades.sort((a, b) => {

      if (a.Nome.length == b.Nome.length) {
        return (a.Nome.localeCompare(b.Nome));
      } else {
        return b.Nome.length - a.Nome.length
      }
    })


    return {
      UF: Sigla,
      Cidades: cidadeMaiorNome[0].Nome
    };
  })
  console.log(listaEstados)
  //return listaEstados;
}

function menorCidadePorEstado() {
  let listaEstados = [];
  listaEstados = estados.map(estado => {
    const { Sigla } = estado;

    let listaCidades = JSON.parse(fs.readFileSync(`${DIR_GERADOS}${estado.Sigla}.json`, "utf-8"))
    let cidadeMaiorNome = listaCidades.sort((a, b) => {
      if (a.Nome.length == b.Nome.length) {
        return (a.Nome.localeCompare(b.Nome));
      } else {
        return a.Nome.length - b.Nome.length
      }
    })

    return {
      UF: Sigla,
      Cidades: cidadeMaiorNome[0].Nome
    };
  })
  console.log(listaEstados)
  //return listaEstados;
}


function maiorCidade() {
  let listaEstados = [];
  listaEstados = estados.map(estado => {
    const { Sigla } = estado;

    let listaCidades = JSON.parse(fs.readFileSync(`${DIR_GERADOS}${estado.Sigla}.json`, "utf-8"))
    let cidadeMaiorNome = listaCidades.sort((a, b) => {

      if (a.Nome.length == b.Nome.length) {
        return (a.Nome.localeCompare(b.Nome));
      } else {
        return b.Nome.length - a.Nome.length
      }
    })

    return {
      UF: Sigla,
      Cidade: cidadeMaiorNome[0].Nome
    };
  })
  console.log(listaEstados.sort((a, b) => {
    if (a.Cidade.length == b.Cidade.length) {
      return (a.Cidade.localeCompare(b.Cidade));
    } else {
      return b.Cidade.length - a.Cidade.length
    }
  })[0])
}

function menorCidade() {
  let listaEstados = [];
  listaEstados = estados.map(estado => {
    const { Sigla } = estado;

    let listaCidades = JSON.parse(fs.readFileSync(`${DIR_GERADOS}${estado.Sigla}.json`, "utf-8"))
    let cidadeMaiorNome = listaCidades.sort((a, b) => {
      if (a.Nome.length == b.Nome.length) {
        return (a.Nome.localeCompare(b.Nome));
      } else {
        return a.Nome.length - b.Nome.length
      }
    })

    return {
      UF: Sigla,
      Cidade: cidadeMaiorNome[0].Nome
    };
  })
  console.log(listaEstados.sort((a, b) => {
    if (a.Cidade.length == b.Cidade.length) {
      return (a.Cidade.localeCompare(b.Cidade));
    } else {
      return a.Cidade.length - b.Cidade.length
    }
  })[0])
  //return listaEstado
}