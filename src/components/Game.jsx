import Board from "./Board";
import Square from "./Square";
import { useState } from "react";

let startingBoard = new Array(3).fill(0).map((e) => new Array(3).fill('-'));
function Game(props) {
    let [movesHistory, setMovesHistory] = useState([startingBoard]);

    let [player, setPlayer] = useState('X');
    let [curBoard, setCurBoard] = useState(startingBoard);

    const generateRow = (rowNum) => {
        return <div className="row">
            {
                curBoard[rowNum].map(
                    (e, cNum) =>
                        <Square updateBoard={() => handleClick(rowNum, cNum)} value={curBoard[rowNum][cNum]} />
                )
            }
        </div>
    }

    let handleClick = (row, col) => {
        if (curBoard[row][col] === '-' && gameStatus === 'Game in progress') {


            let copyBoard = JSON.parse(JSON.stringify(curBoard));
            copyBoard[row][col] = player;
            setCurBoard(copyBoard);

            // for history
            movesHistory.push(copyBoard);
            setMovesHistory(movesHistory);

            setPlayer(player === 'X' ? 'O' : 'X');
            if (ticTacToeGameStatus(copyBoard) === `Player X has won`) {
                setGameStatus(`Player X has won`)
            } else if (ticTacToeGameStatus(copyBoard) === `Player O has won`) {
                setGameStatus(`Player O has won`)
            } else if (ticTacToeGameStatus(copyBoard) === `Game is drawn`) {
                setGameStatus(`Game is drawn`)
            }
        }
    }

    let [gameStatus, setGameStatus] = useState('Game in progress');
    let gotoStep = (mIdx) => {
        movesHistory = movesHistory.slice(0, mIdx + 1)
        setMovesHistory(movesHistory);

        setCurBoard(movesHistory[movesHistory.length - 1])
        setPlayer(mIdx % 2 === 0 ? 'X' : 'O')
        setGameStatus('Game in progress');
    }
    return (
        <>
            <Board player={player} curBoard={curBoard} generateRow={generateRow} gameStatus={gameStatus} movesHistory={movesHistory} />
            <div className="history">
                <h1>History</h1>
                <div className="all-steps">
                    {
                        movesHistory.map((m, mIdx) =>
                            <button onClick={e => gotoStep(mIdx)}>
                                {mIdx === 0 ? 'Game Started' : `Step ${mIdx}`}
                            </button>
                        )
                    }
                </div>
            </div>

        </>
    )
}

export default Game;


function ticTacToeGameStatus(board) {
    if (hasXWon(board))
        return `Player X has won`
    else if (hasOWon(board))
        return `Player O has won`
    else {
        if (board.every(v => {
            return v.every(ele => ele === 'X' || ele === 'O')
        })) {
            return `Game is drawn`
        }
    }
}

function hasXWon(board) {
    // check row
    for (let i = 0; i < board.length; i++) {
        const row = board[i];
        for (let c = 0; c < row.length; c++) {
            const move = row[c];
            if (move === 'X') {
                if (c === row.length - 1) return true;
            } else {
                i = board.length;
                break;
            }
        }
    }

    // check columns
    for (let c = 0; c < board.length; c++) {
        for (let r = 0; r < board.length; r++) {
            const move = board[r][c];
            if (move === 'X') {
                if (r === board.length - 1) return true;
            } else {
                break;
            }
        }

    }

    // left to right diagonal
    for (let r = 0; r < board.length; r++) {
        const move = board[r][r];
        if (move === 'X') {
            if (r === board.length - 1) return true;
        } else {
            break;
        }
    }

    // right to left diagonal
    for (let i = 0; i < board.length; i++) {
        for (let c = board[i].length - 1; c > -1; c--) {
            const move = board[i][c];
            i++;
            if (move === 'X') {
                if (c === 0) return true;
            } else {
                i = board.length;
                break;
            }
        }
    }

    return false;
}

// Exercise 2 - Part 2
function hasOWon(board) {
    // check row
    for (let i = 0; i < board.length; i++) {
        const row = board[i];
        for (let c = 0; c < row.length; c++) {
            const move = row[c];
            if (move === 'O') {
                if (c === row.length - 1) return true;
            } else {
                i = board.length;
                break;
            }
        }
    }

    // check columns
    for (let c = 0; c < board.length; c++) {
        for (let r = 0; r < board.length; r++) {
            const move = board[r][c];
            if (move === 'O') {
                if (r === board.length - 1) return true;
            } else {
                break;
            }
        }

    }

    // left to right diagonal
    for (let r = 0; r < board.length; r++) {
        const move = board[r][r];
        if (move === 'O') {
            if (r === board.length - 1) return true;
        } else {
            break;
        }
    }

    // right to left diagonal
    for (let i = 0; i < board.length; i++) {
        for (let c = board[i].length - 1; c > -1; c--) {
            const move = board[i][c];
            i++;
            if (move === 'O') {
                if (c === 0) return true;
            } else {
                i = board.length;
                break;
            }
        }
    }

    return false;
}
