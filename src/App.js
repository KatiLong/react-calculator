import React, { Component } from 'react';
import './App.css';
import Button from './Button';
import Total from './Total';

class App extends Component {
  state = {
    currentOperator: '',
    total: 0,
    buttons: ['C', '/', 7, 8, 9, 'x', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '='],
    clickFunctions: {
      clear: () => ({ total: 0 }),
      number: (num) => {
        if (this.state.total === 0) return {total: num}
        if (num === 'zero') return { total: `${this.state.total}0` }
        else return { total: `${this.state.total}${num}` }
      },
      decimal: () => ({ total: `${this.state.total}.`}),
      operator: { 
        // add: () => ({total: parseFloat(this.state.total) + parseFloat(num)})
      }
    }
  }
  handleClick (e) {
    let newTotal = {total: this.state.total};
    e.preventDefault();
    console.log('Handle Click', e.target.className, newTotal);
    // Clear
    if (e.target.id === 'C') newTotal = this.state.clickFunctions.clear();
    // number
    if (e.target.className === "number") {
      newTotal = this.state.clickFunctions.number(e.target.id);
    }
    // decimal
    if (e.target.id === '.') newTotal = this.state.clickFunctions.decimal();
    //operator
    if (e.target.className === "operator") {
      //where to set current operator???
      if (this.state.currentOperator !== '') newTotal({ currentOperator: e.target.id });
      else newTotal = this.state.clickFunctions.operator(e.target.id);
    }

    this.setState(newTotal);
  }
  render() {
    // .map((str, ind) => <li key={ind}>{str}</li>);
    const calcButtons = this.state.buttons.map((el, ind) => {
      if (el === 0) return <Button id="zero" className="number" key={ind} symbol={el} handleClick={e => this.handleClick(e)} />
      else if (typeof(el) === "number")  return <Button id={el} className="number" key={ind} symbol={el} handleClick={e => this.handleClick(e)} />
      else if (el === 'C' || el === '.') return <Button id={el} className="special" key={ind} symbol={el} handleClick={e => this.handleClick(e)} />
      else return <Button id={el} className="operator" key={ind} symbol={el} handleClick={e => this.handleClick(e)} />
    });
    return (
      <div className="App">
        <Total total={this.state.total}/>
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


export default App;
