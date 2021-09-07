export default (squares, ghost) => {
  squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
}