import React, { useEffect, useState } from 'react';
import './index.css';
import io from 'socket.io-client';
import { isValidMove } from './logic.js';
import { picesImageswhiteblack } from './pices/exportimages.js';

const App = () => {
  const [board, setBoard] = useState([
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'K', 'Q', 'B', 'N', 'R'],
  ]);

  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [piece, setPiece] = useState('');
  const [white,setWhite] = useState(true)

  useEffect(() => {
    // Initialize socket connection once
    const Socket = io('http://localhost:4000/');

    if (start !== '' && end !== '' && piece !== '') {
      Socket.emit('usermoves', [start, end, piece, white])
      
      Socket.on('opponentmoves', ([from, to, piece, turnblack]) => {
        console.log(from, to, piece, 'recived from server');
        if (turnblack) {
          const [fromRow, fromCol] = from.split('');
          const [toRow, toCol] = to.split('');
          const updatedBoard = [...board];
          updatedBoard[Number(toRow)][Number(toCol)] = piece;
          updatedBoard[Number(fromRow)][Number(fromCol)] = ' ';
          setBoard(updatedBoard);
        }
      })
    }

    // Clean up socket connection on unmount
    // return () => {
    //   Socket.disconnect();
    // };
  }, [board, start, end, piece]);


  useEffect(() => {
    if (start && end && piece) {
      const [fromRow, fromCol] = start;
      const [toRow, toCol] = end;

      if (isValidMove(start, end, piece)) {
        const updatedBoard = [...board];
        updatedBoard[toRow][toCol] = piece;
        updatedBoard[fromRow][fromCol] = ' ';
        setBoard(updatedBoard);
      } else {
        // Reset the move if it's invalid
        setPiece('');
        setStart('');
        setEnd('');
      }
    }
  }, [end]);
  useEffect(() => {
    const chessSquares = document.querySelectorAll('.chessSquare');
    const allPices = document.querySelectorAll('.pices');
    allPices.forEach(pice => {
      pice.addEventListener('dragstart', (e) => {
        pice.classList.add('dragable');
        setStart(pice.parentNode.id)
      });
      pice.addEventListener('dragend', () => {
        setEnd(pice.parentNode.id)
        setPiece(pice.id)
        pice.classList.remove('dragable');
      });
    });

    chessSquares.forEach(square => {
      square.addEventListener('dragover', (e) => {
        e.preventDefault();
        const draggingElement = document.querySelector('.dragable');
        if (draggingElement) {
          square.appendChild(draggingElement);
        }
      });
    });

    return () => {
      allPices.forEach(pice => {
        pice.removeEventListener('dragstart', () => { });
        pice.removeEventListener('dragend', () => { });
      });

      chessSquares.forEach(square => {
        square.removeEventListener('dragover', () => { });
      });
    };
  }, [piece, end, start]);
  return (
    <>
      <div className='PlayerContainer' >

        <div id="chessboard">
          {board.map((row, rowIndex) =>
            row.map((square, colIndex) => {
              const piece = board[rowIndex][colIndex];
              const color = (rowIndex + colIndex) % 2 === 0 ? 'white' : 'black';
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  id={`${colIndex}${rowIndex}`}
                  className={`boxpices chessSquare ${color}`}
                >
                  {piece !== ' ' && (
                    <img
                      src={picesImageswhiteblack[piece]}
                      id={piece}
                      className="pices"
                      draggable

                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default App;
