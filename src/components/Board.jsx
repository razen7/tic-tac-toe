function Board(props) {
    return (
        <div className="board">
            <p>
                Next Player:
                <span>{props.player}</span>
            </p>

            {props.curBoard.map((row, idx) => {
                return props.generateRow(idx);
            })}
            
            <p>
                {props.gameStatus}
            </p>
        </div>
    )
}

export default Board;