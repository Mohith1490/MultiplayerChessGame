
// export default function board(){const boardlook = [
//     ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
//     ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
//     [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
//     [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
//     [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
//     [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
//     ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
//     ['R', 'N', 'B', 'K', 'Q', 'B', 'N', 'R'],
//   ];


//   let diffId = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
//   let i, j;
//   let chessboard = document.getElementById('chessboard')
//   for (i = 0; i < 8; i++) {
//     for (j = 0; j < 8; j++) {
//       let box = document.createElement('div')
//       let color = (i + j) % 2 === 0 ? 'white' : 'black';
//       let uniqueid = diffId[j] + i;
//       box.innerText = boardlook[i][j]
//       box.id = uniqueid
//       box.classList.add(color, 'boxpices')
//       let image = document.createElement('img')
//       if (box.innerText !== ' ') {
//         let src = box.innerText
//         box.innerText = ' '
//         image.src = `${src}`
//         image.classList.add('pices')
//         box.appendChild(image)
//       }
//       chessboard.appendChild(box)
//     }
//   }}

//   useEffect(() => {
//     const chessSquares = document.querySelectorAll('.chessSquare');
//     const allPices = document.querySelectorAll('.pices');
//     allPices.forEach(pice => {
//       pice.addEventListener('dragstart', (e) => {
//         pice.classList.add('dragable');
//         setStart(pice.parentNode.id)
//       });
//       pice.addEventListener('dragend', () => {
//         setEnd(pice.parentNode.id)
//         setPiece(pice.id)
//         pice.classList.remove('dragable');
//       });
//     });

//     chessSquares.forEach(square => {
//       square.addEventListener('dragover', (e) => {
//         e.preventDefault();
//         const draggingElement = document.querySelector('.dragable');
//         if (draggingElement) {
//           square.appendChild(draggingElement);
//         }
//       });
//     });
    
//     return () => {
//       allPices.forEach(pice => {
//         pice.removeEventListener('dragstart', () => { });
//         pice.removeEventListener('dragend', () => { });
//       });

//       chessSquares.forEach(square => {
//         square.removeEventListener('dragover', () => { });
//       });
//     };
//   }, [Piece, End, Start]);

//   const [Piece, setPiece] = useState('')
//   const [Start, setStart] = useState('')
//   const [End, setEnd] = useState('')



 
//   useEffect(() => {
//     if (Start && End) {
//       const position = {
//         A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7
//       };

//       const parsePosition = (pos) => {
//         const [col, row] = pos.split('');
//         return [position[col], Number(row)];
//       };

//       const startpoint = parsePosition(Start);
//       const endpoint = parsePosition(End);
//       const result = isValidMove(startpoint, endpoint, `${Piece}`);
//       console.log(result);
//       const newsocket = io('http://localhost:8000/')
//       newsocket.emit("positions",startpoint,endpoint,[Piece,End,Start])
//     }
    
//   }, [Piece, Start, End]);