import { useState } from "react";

function Square(props) {
    
    return (
        <button onClick={(e) => props.updateBoard()} className="square">{props.value}</button>
    )
}

export default Square;