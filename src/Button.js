import React from 'react';

function Button (props) {
    return (
        <button className={props.className} id={props.id} key={props.id} onClick={props.handleClick}>{props.symbol}</button>
    )  
}

export default Button;