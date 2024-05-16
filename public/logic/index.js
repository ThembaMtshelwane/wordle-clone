document.addEventListener('DOMContentLoaded', function () {
  const closeSection = document.querySelector('.close')
  const modalContainer = document.querySelector('.modalContainer')
  const keys = document.getElementsByTagName('input')
  const cells = document.getElementsByClassName('cell')
  let rowCount = 0
  let letterCount = 0
  const grid = [[]]
  const MAX_ROW = 6
  const MAX_COL = 5
  let count = 0
  // const guessWord = ''
  let temp = []

  // Gird
  for (let row = 0; row < MAX_ROW; row++) {
    grid[row] = []
    for (let col = 0; col < MAX_COL; col++) {
      grid[row][col] = cells[count]
      count++
    }
  }

  // Add user input to grid
  function handleInput (value) {
    // End game
    if (rowCount >= MAX_ROW) {
      return
    }

    // Delete letter
    if (value === 'Del' || value === 'BACKSPACE') {
      letterCount--
      if (letterCount < 0) {
        letterCount = 0
      }
      grid[rowCount][letterCount].textContent = ''
      return
    }

    // Enter guess
    if (value.toUpperCase() === 'ENTER' && letterCount >= MAX_COL) {
      console.log('next level')
      // guessWord = temp.toString().replace(/,/g, '')
      letterCount = 0
      rowCount++
      temp = []
      return
    }

    // Enter Letter
    if (/^[A-Z]$/.test(value) && letterCount < MAX_COL) {
      grid[rowCount][letterCount].textContent = value
      temp.push(value)
      letterCount++
    }
  }

  // Handle press
  function handleKeyDown (e) {
    const key = e.key.toUpperCase()
    handleInput(key)
  }

  document.addEventListener('keydown', handleKeyDown)

  // Handle clicks
  for (let index = 0; index < keys.length; index++) {
    keys[index].addEventListener('click', function () {
      handleInput(keys[index].value)
    })
  }

  closeSection.addEventListener('click', function () {
    modalContainer.classList.add('hideModal')
  })
})
