function Board(props) {
    return (
        <div className="game-container">
            <p>
                Next Player: &nbsp;
                <span>{props.player}</span>
            </p>

            <div className="board-container">
                {props.curBoard.map((row, idx) => {
                    return props.generateRow(idx);
                })}
            </div>

            <p>
                {props.gameStatus}
            </p>
        </div>
    )
}

export default Board;