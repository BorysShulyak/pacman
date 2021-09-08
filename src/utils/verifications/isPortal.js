export default (squares, pacmanCurrentIndex, indexToBeAdded) =>
  squares[pacmanCurrentIndex + indexToBeAdded].classList.contains('portal')