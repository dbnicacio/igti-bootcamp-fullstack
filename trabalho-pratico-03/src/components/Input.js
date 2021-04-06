import React, { Component } from 'react';

export default class Input extends Component {


  render() {

    const { readOnly, onTextChange, value, transformText } = this.props;
    return (
      <div className="inputs">
        <input type="text" readOnly={readOnly} onChange={onTextChange} value={transformText ? transformText : value}></input>

      </div>
    );
  }
}
