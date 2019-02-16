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
    buttons: ['C', '/', 7, 8, 9, 'x', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '='],  
  }

  // const clickFunctions = {
  //   clear: () => ({ total: 0 }),
  //   number: (num) => {
  //     if (this.state.total === 0) return {total: num}
  //     if (num === 'zero') return { total: `${this.state.total}0` }
  //     else return { total: `${this.state.total}${num}` }
  //   },
  //   decimal: () => ({ total: `${this.state.total}.`}),
  //   operator: (type) => { 
  //     switch (type) {
  //       case '/' :
  //         console.log('divide');
  //         break;
  //       case 'x' :
  //         console.log('multiply');
  //         break;
  //       case '-' :
  //         console.log('subtract');
  //         break;
  //       case '+' :
  //         console.log('add');
  //         break;
  //       default: 
  //         return { total: this.state.total}
  //     }
  //     // add: () => ({total: parseFloat(this.state.total) + parseFloat(num)})
  //   }
  // }
  clear () { return {total: 0} }
  number (num) {
    console.log('number');
    if (this.state.total === 0) return {total: num}
    if (num === 'zero') return { total: `${this.state.total}0` }
    else return { total: `${this.state.total}${num}` }
  }
  // decimal () { return { total: `${this.state.total}.`} }
  // operator (type) {
  //   return { total: this.state.total}
  // }
  handleClick (e) {
    let newTotal = {total: this.state.total};
    let newOperator = this.state.current.operator;
    let newNumber = this.state.current.number;
    e.preventDefault();

    this.setState( (state, props) => {
      // console.log('Handle Click', e.target.className, newTotal);
      console.log(newTotal, newOperator, newNumber, e.target);
      // Clear
      if (e.target.id === 'C') newTotal = this.clear();
      // // decimal
      // else if (e.target.id === '.') newTotal = state.clickFunctions.decimal();
      // // number
      else if (e.target.className === "number") {
        newNumber = e.target.id;
        newTotal = state.clickFunctions.number(e.target.id);
      }
      // //operator
      // else if (e.target.className === "operator") {
      //   // where to set current operator???
      //   if (state.currentOperator !== '') newOperator = e.target.id;
      //   else {
      //     newTotal = this.state.clickFunctions.operator(newOperator);
      //     newOperator = e.target.id;
      //   }
      // }
      return { current: {...state.current, operator: newOperator, number: newNumber} }
    }, () => { this.setState(newTotal) })
    
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

// className populate idea
// https://github.com/ahfarmer/calculator/blob/master/src/component/Button.js
// render() {
//   const className = [
//     "component-button",
//     this.props.orange ? "orange" : "",
//     this.props.wide ? "wide" : "",
//   ];

//   return (
//     <div className={className.join(" ").trim()}>
//       <button onClick={this.handleClick}>{this.props.name}</button>
//     </div>
//   );



export default App;
