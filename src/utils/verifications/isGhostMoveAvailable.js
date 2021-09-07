export default (squares, currentIndex, indexToBeAdded) =>
  !squares[currentIndex + indexToBeAdded].classList.contains('ghost') &&
  !squares[currentIndex + indexToBeAdded].classList.contains('wall')