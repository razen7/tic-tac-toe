import React from "react";
import ReactDOM from "react-dom/client";
import './styles.css';
import Game from "./components/Game";
function Hello() {
    return (
        <div className="main-container">
            <h1>Tic-Tac-Toe</h1>
            <Game />
        </div>
    )
}

let reactRoot = ReactDOM.createRoot(document.getElementById('root'));

reactRoot.render(<Hello />)