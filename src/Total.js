import React from 'react';

function Total (props) {
    if (props.currentNum === -1) {
        return (
            <div id="total">{props.total}</div>
        )
    } else {
        return  (<div id="total">{props.currentNum}</div>)
    }
}

export default Total;