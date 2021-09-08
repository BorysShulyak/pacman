import renderBoard from "./utils/renders/renderBoard";
import isPacmanMoveAvailable from "./utils/verifications/isPacmanMoveAvailable";
import isGhostMoveAvailable from "./utils/verifications/isGhostMoveAvailable";
import Ghost from "./entities/Ghost";
import renderSpecialGhost from "./utils/renders/renderSpecialGhost";
import renderPacman from "./utils/renders/renderPacman";
import layoutIndexes from "./config/layoutIndexes";
import isPortal from "./utils/verifications/isPortal";

document.addEventListener('DOMContentLoaded', () => {

  const scoreDisplay = document.getElementById('score')
  const width = 28
  let score = 0
  const grid = document.querySelector('.grid')

  const squares = renderBoard(layoutIndexes, grid)

  let pacmanCurrentIndex = 490
  squares[pacmanCurrentIndex].classList.add('pac-man')

  function movePacman(e) {
    squares[pacmanCurrentIndex].classList.remove('pac-man')
    switch(e.keyCode) {
      case 37:
        if(pacmanCurrentIndex % width !== 0 && isPacmanMoveAvailable(squares, pacmanCurrentIndex, -1))
          pacmanCurrentIndex -= 1
        if (isPortal(squares, pacmanCurrentIndex, -1 )) {
          pacmanCurrentIndex += 26
        }
        break
      case 38:
        if(pacmanCurrentIndex - width >= 0 && isPacmanMoveAvailable(squares, pacmanCurrentIndex, -1 * width))
          pacmanCurrentIndex -= width
        break
      case 39:
        if(pacmanCurrentIndex % width < width - 1 && isPacmanMoveAvailable(squares, pacmanCurrentIndex, 1))
          pacmanCurrentIndex += 1
        if (isPortal(squares, pacmanCurrentIndex, 1)) {
          pacmanCurrentIndex -= 26
        }
        break
      case 40:
        if (pacmanCurrentIndex + width < width * width && isPacmanMoveAvailable(squares, pacmanCurrentIndex, width))
          pacmanCurrentIndex += width
        break
    }
    renderPacman(squares, pacmanCurrentIndex)
    pacDotEaten()
    powerPelletEaten()
    checkForGameOver()
    checkForWin()
  }
  document.addEventListener('keyup', movePacman)

  function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
      score++
      scoreDisplay.innerHTML = score
      squares[pacmanCurrentIndex].classList.remove('pac-dot')
    }
  }

  //what happens when you eat a power-pellet
  function powerPelletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
      score +=10
      ghosts.forEach(ghost => ghost.isScared = true)
      setTimeout(unScareGhosts, 10000)
      squares[pacmanCurrentIndex].classList.remove('power-pellet')
    }
  }

  //make the ghosts stop flashing
  function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
  }

  const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
  ]
  ghosts.forEach(ghost => renderSpecialGhost(squares, ghost))

  //move the Ghosts randomly
  ghosts.forEach(ghost => moveGhost(ghost))

  function moveGhost(ghost) {
    const directions =  [-1, +1, width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(function() {
      //if the next squre your ghost is going to go to does not have a ghost and does not have a wall
      if  (isGhostMoveAvailable(squares, ghost.currentIndex, direction)) {
        //remove the ghosts classes
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
        //move into that space
        ghost.currentIndex += direction
        renderSpecialGhost(squares, ghost)
        //else find a new random direction ot go in
      } else {
        direction = directions[Math.floor(Math.random() * directions.length)]
      }

      //if the ghost is currently scared
      if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add('scared-ghost')
      }

      //if the ghost is currently scared and pacman is on it
      if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
        ghost.currentIndex = ghost.startIndex
        score +=100
        renderSpecialGhost(squares, ghost)
      }
      checkForGameOver()
    }, ghost.speed)
  }

  //check for a game over
  function checkForGameOver() {
    if(
      squares[pacmanCurrentIndex].classList.contains('ghost') &&
      !squares[pacmanCurrentIndex].classList.contains('scared-ghost')
    ) {
      finishGameWithMessage('Game Over!')
    }
  }

  //check for a win - more is when this score is reached
  function checkForWin() {
    if (score === 274) {
      finishGameWithMessage('You won!')
    }
  }

  function finishGameWithMessage(message) {
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    document.removeEventListener('keyup', movePacman)
    setTimeout(function(){ alert("Game Over"); }, 500)
  }
})

