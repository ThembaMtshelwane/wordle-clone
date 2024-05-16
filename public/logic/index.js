document.addEventListener('DOMContentLoaded', function () {
  const closeSection = document.querySelector('.close')
  const openModal = document.querySelector('.modalIcon')
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
  const dictionary = ['hello', 'apple', 'nylon', 'socks']
  const targetWord = dictionary[2].toUpperCase()

  // Gird
  for (let row = 0; row < MAX_ROW; row++) {
    grid[row] = []
    for (let col = 0; col < MAX_COL; col++) {
      grid[row][col] = cells[count]
      count++
    }
  }

  // Add user input to grid
  function handleInput(value) {
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
      temp.pop()
      return
    }

    // Enter guess
    if (value === 'ENTER' && letterCount >= MAX_COL) {
      console.log('next level')
      console.log('target', targetWord)
      guessWord = temp.toString().replace(/,/g, '')
      checkWord(guessWord, rowCount)
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
  function handleKeyDown(e) {
    const key = e.key.toUpperCase()
    handleInput(key)
  }

  document.addEventListener('keydown', handleKeyDown)

  // Handle clicks
  for (let index = 0; index < keys.length; index++) {
    keys[index].addEventListener('click', function () {
      handleInput(keys[index].value.toUpperCase())
    })
  }

  // Check Win Conditions
  function checkWord(word, row) {
    // Perfect match,
    if (targetWord === word) {
      for (let w1 = 0; w1 < word.length; w1++) {
        const cell = grid[row][w1]
        cell.classList.add('green')
        keyboardColourChange('green', cell)
      }
      rowCount = MAX_ROW // end game
      return
    }

    for (let w1 = 0; w1 < word.length; w1++) {
      const cell = grid[row][w1]
      if (targetWord.includes(word[w1])) {
        // check if letter exists
        cell.classList.add('yellow')
        keyboardColourChange('yellow', cell)
      } else {
        cell.classList.add('grey-1')
        keyboardColourChange('grey-1', cell)
      }
      // check if in correct position and overwrite yellow
      if (word[w1] === targetWord[w1]) {
        cell.classList.add('green')
        keyboardColourChange('green', cell)
      }
    }
  }

  function keyboardColourChange(colour, cell) {
    for (let index = 0; index < keys.length; index++) {
      if (keys[index].value.toUpperCase() === cell.textContent) {
        keys[index].classList.add(colour)
      }
    }
  }

  closeSection.addEventListener('click', function () {
    modalContainer.classList.add('hideModal')
  })
  openModal.addEventListener('click', function () {
    modalContainer.classList.remove('hideModal')
  })
})
