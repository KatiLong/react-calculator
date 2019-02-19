import React, { Component } from 'react';
import './App.css';
import Button from './Button';
import Total from './Total';

class App extends Component {
  state = {
    current: {
      operator: '',
      number: -1
    },
    total: 0,  
  }
  number (num) {
    console.log('number pressed', num)
    // if total is zero, replace with pressed number
    if (this.state.current.number === -1) return num;
    else return `${this.state.current.number}${num}`;
  }
  clear () {
    console.log('clear pressed');
    return 0;
  }
  decimal () {
    console.log('decimal pressed');
    return `${this.state.current.number}.`;
  }
  calculate (operator) {
    console.log('operator to calculate with', operator);
    if (this.state.current.number === -1) { // If only one number seq has been inputted, don't run func
      alert('Need another number');
      return;
    }
    switch (operator) {
      case '/' :
        // console.log('division');
        return parseFloat(this.state.total)/parseFloat(this.state.current.number);
        break;
      case 'x' :
        // console.log('multiplication');
        return parseFloat(this.state.total)*parseFloat(this.state.current.number);
        break;
      case '-' :
        // console.log('subtraction');
        return parseFloat(this.state.total) - parseFloat(this.state.current.number);
        break;
      case '+' :
        // console.log('addition');
        return parseFloat(this.state.total) + parseFloat(this.state.current.number);
        break;
      default : 
        console.log('no valid operator');
    }
  }
  handleClick (e) {
    e.preventDefault();

    let newTotal = this.state.total;
    let currentNum = this.state.current.number;
    let currentOperator = this.state.current.operator;
    console.log(newTotal, this.state.total, currentNum);

    switch (e.target.className) {
      case 'number' :
        if (e.target.id === 'zero') {
          console.log('if Zero');
          currentNum = this.number(0);
        }
        else {
          console.log('if other number');
          // (currentNum === -1) ? currentNum = e.target.id : currentNum += e.target.id;
          currentNum = this.number(e.target.id);
        }
        break;
      case 'special' :
        // console.log('special character pressed', e.target.id);
        if (e.target.id === 'C') {
          currentNum = -1;
          currentOperator = '';
          newTotal = 0;
        } else if (e.target.id === '.'){
          (currentNum === -1) ? currentNum = e.target.id : currentNum += e.target.id;
        } else console.log('Did not match special character');
        break;
      case 'operator' :
        // NewTotal should only be updated in here, when operator pressed (total val assigned to currentNum & currentNum reset)
        // if operator is pressed AND no current operation set, set currentOperator to button pressed
        if (currentOperator !== '' || e.target.id === '=') {
          // If equals or two operators pressed in row, calculate
          newTotal = this.calculate(this.state.current.operator);
        }
        else {
          if (currentNum >= 0) newTotal = currentNum ; // otherwise stays as current state
        }
        currentNum = -1;
        (e.target.id === "=") ? currentOperator = '' : currentOperator = e.target.id;
        break;  
      default :
        console.log('End of switch statement?');
    }
    this.setState({current: {...this.state.current, operator: currentOperator, number: currentNum}}, () => {this.setState({...this.state.total, total: newTotal})});
    // console.log(newTotal, this.state.total, currentNum);

  }
  render() {
    // .map((str, ind) => <li key={ind}>{str}</li>);
    const buttons = ['C', '/', 7, 8, 9, 'x', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '='];
    const calcButtons = buttons.map((el, ind) => {
      if (el === 0) return <Button id="zero" className="number" key={ind} symbol={el} handleClick={e => this.handleClick(e)} />
      else if (typeof(el) === "number")  return <Button id={el} className="number" key={ind} symbol={el} handleClick={e => this.handleClick(e)} />
      else if (el === 'C' || el === '.') return <Button id={el} className="special" key={ind} symbol={el} handleClick={e => this.handleClick(e)} />
      else return <Button id={el} className="operator" key={ind} symbol={el} handleClick={e => this.handleClick(e)} />
    });
    return (
      <div className="App">
        <Total total={this.state.total} currentNum={this.state.current.number}/>
        {calcButtons}
      </div>
    );
  }
}

///// Calculator /////
// numbers, 0-9
// operators, / x - + =
// special characters, C .

///// Visual /////
// C         | /
// 7 | 8 | 9 | x
// 4 | 5 | 6 | -
// 1 | 2 | 3 | +
// 0     | . | =

// Functions ->
// onClick Numbers
  // concats state/displayed total
  // replaces if total 0
// onClick Operators
// onClick c, .

// className populate idea
// https://github.com/ahfarmer/calculator/blob/master/src/component/Button.js
// render() {
//   const className = [
//     "component-button",
//     this.props.orange ? "orange" : "",
//     this.props.wide ? "wide" : "",
//   ];

export default App;