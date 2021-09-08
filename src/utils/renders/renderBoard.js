const layoutClassnamesMap = ['pac-dot', 'wall', 'ghost-lair', 'power-pellet',,'portal'];

const renderBoard = (layout, gridContainer) =>
  layout.map(layoutId => {
    const square = document.createElement('div')
    square.classList.add(layoutClassnamesMap[layoutId])
    gridContainer.appendChild(square)
    return square
  })

export default renderBoard;