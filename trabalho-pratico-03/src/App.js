import React, { Component } from 'react';
import Input from './components/Input';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      userInput: ""
    }
  }

  handleTextChange = (event) => {
    this.setState({
      userInput: event.target.value
    });

  }
  transformText = (type) => {
    const { userInput } = this.state;
    let transformedText = userInput;
    //const numericDict = { "O": 0, "L": 1, "E": 3, "A": 4, "S": 5, "T": 7 };
    switch (type) {
      case "invert":
        transformedText = transformedText.split("");
        transformedText = transformedText.reverse();
        return transformedText.join("");
      case "numeric":
        transformedText = transformedText.toUpperCase();
        transformedText = transformedText.split("");
        transformedText = transformedText.map(a => a.replace('L', 1).replace('O', 0).replace('E', 3).replace('A', 4).replace('S', 5).replace('T', 7));
        return transformedText.join("");
      case "csv":
        transformedText = transformedText.split(" ");
        transformedText = transformedText.map(a => '"' + a + '"');
        return transformedText.join(";");
      case "slug":
        transformedText = transformedText.toLowerCase();
        transformedText = transformedText.split(" ");
        return transformedText.join("-");
      case "vowels":
        transformedText = transformedText.split("");
        return transformedText.map(character => {
          if (!/[aeiou AEIOU]/.test(character)) {
            return ""
          } else { return character }
        }).join("");
      case "!vowels":
        transformedText = transformedText.split("");
        return transformedText.map(character => {
          if (/[aeiouAEIOU123456789]/.test(character)) {
            return ""
          } else { return character }
        }).join("");
      case "variavel":
        transformedText = transformedText.toLowerCase();
        transformedText = transformedText.split(" ");
        const firtWord = transformedText[0];
        transformedText.shift();
        transformedText = transformedText.map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
        return firtWord + transformedText.join("");

      default:
        return userInput;
    }
  }

  render() {
    const { userInput } = this.state;
    return (
      <div className="content">
        <h1>Trabalho Prático - 03 - React</h1>
        <h2>reac-text-transformer</h2>
        <label>Digite um texto qualquer: <Input readOnly={false} onTextChange={this.handleTextChange} value={userInput} /></label>
        <h3>Transformações</h3>
        <label>Texto invertido: <Input readOnly={true} transformText={this.transformText("invert")} /></label>
        <label>Texto numérico: <Input readOnly={true} transformText={this.transformText("numeric")} /></label>
        <label>CSV: <Input readOnly={true} transformText={this.transformText("csv")} /></label>
        <label>Slug: <Input readOnly={true} transformText={this.transformText("slug")} /></label>
        <label>Somente vogais: <Input readOnly={true} transformText={this.transformText("vowels")} /></label>
        <label>Somente consoantes: <Input readOnly={true} transformText={this.transformText("!vowels")} /></label>
        <label>Variavel: <Input readOnly={true} transformText={this.transformText("variavel")} /></label>
      </div>
    );
  }
}