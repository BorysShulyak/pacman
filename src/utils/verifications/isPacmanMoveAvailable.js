export default (squares, pacmanCurrentIndex, indexToBeAdded) =>
  !squares[pacmanCurrentIndex + indexToBeAdded].classList.contains('wall') &&
  !squares[pacmanCurrentIndex + indexToBeAdded].classList.contains('ghost-lair')