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
  let guessWord = ''
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
    if (letterCount >= MAX_COL) {
      guessWord = temp.toString().replace(/,/g, '')
      console.log(guessWord)
      letterCount = 0
      rowCount++
      temp = []
    }

    if (rowCount >= MAX_ROW) {
      return
    }

    grid[rowCount][letterCount].textContent = value
    temp.push(value)

    letterCount++
  }

  // Handle clicks
  for (let index = 0; index < keys.length; index++) {
    keys[index].addEventListener('click', function () {
      handleInput(keys[index].value)
    })
  }

  // Handle press
  function handleKeyDown (e) {
    const key = e.key.toUpperCase()
    if (/^[A-Z]$/.test(key)) {
      handleInput(key)
    }
  }
  document.addEventListener('keydown', handleKeyDown)

  closeSection.addEventListener('click', function () {
    modalContainer.classList.add('hideModal')
  })
})
