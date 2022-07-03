import { useState } from "react";
import Square from "./Square";

let startingBoard = new Array(3).fill(0).map((e) => new Array(3).fill('-'));

function Board(props) {
    let [player, setPlayer] = useState('X');
    let [curBoard, setCurBoard] = useState(startingBoard);

    const generateRow = (rowNum) =>
        <div className="row">
            {
                curBoard[rowNum].map(
                    (e, cNum) =>
                        <Square updateBoard={() => handleClick(rowNum, cNum)} value={curBoard[rowNum][cNum]} />
                )
            }
        </div>


    let handleClick = (row, col) => {
        if (curBoard[row][col] === '-' && gameStatus === 'Game in progress') {
            let copyBoard = JSON.parse(JSON.stringify(curBoard));
            copyBoard[row][col] = player;
            setCurBoard(copyBoard);
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
    return (
        <div className="board">
            <p>
                Next Player:
                <span>{player}</span>
            </p>
            <p>
                {curBoard.map((row, idx) => {
                    return generateRow(idx);
                })}
            </p>
            <p>
                {gameStatus}
            </p>
        </div>
    )
}

export default Board;

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