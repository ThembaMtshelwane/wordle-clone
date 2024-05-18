document.addEventListener('DOMContentLoaded', async function () {
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
  let targetWord = ''

  // Get word of the day
  async function wordOfTheDay() {
    const response = await fetch('/word-of-the-day', {
      method: 'GET',
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch word of the day: ${response.statusText}`)
    }
    return await response.json()
  }

  async function getAndDisplayWordOfTheDay() {
    try {
      const res = await wordOfTheDay()
      targetWord = res.word.toUpperCase()
    } catch (error) {
      console.error(error)
    }
  }
  getAndDisplayWordOfTheDay()

  // Check if guessWord is valid
  function isGuessWordValid(guess) {
    // return true or false

    return true
  }

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
      grid[rowCount][letterCount].classList.remove('inputShake')
      temp.pop()
      return
    }

    // Enter guess
    if (value === 'ENTER' && letterCount >= MAX_COL) {
      guessWord = temp.toString().replace(/,/g, '')
      if (isGuessWordValid(guessWord)) {
        checkWord(guessWord, rowCount)
        letterCount = 0
        rowCount++
        temp = []
        return
      } else {
        // show error : Word not in the list
      }
    }

    // Enter Letter
    if (/^[A-Z]$/.test(value) && letterCount < MAX_COL) {
      grid[rowCount][letterCount].textContent = value
      grid[rowCount][letterCount].classList.add('inputShake')
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
    console.log('tar', targetWord)
    console.log('wrd', word)
    // Perfect match,
    if (targetWord === word) {
      for (let w1 = 0; w1 < word.length; w1++) {
        const cell = grid[row][w1]
        addColour(cell, w1, 'green')
      }
      rowCount = MAX_ROW // end game
      return
    }

    for (let w1 = 0; w1 < word.length; w1++) {
      const cell = grid[row][w1]
      if (targetWord.includes(word[w1])) {
        // check if letter exists
        addColour(cell, w1, 'yellow')
      } else {
        addColour(cell, w1, 'grey')
      }
      // check if in correct position and overwrite yellow
      if (word[w1] === targetWord[w1]) {
        addColour(cell, w1, 'green')
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

  function addColour(cell, index, colour) {
    setTimeout(() => {
      cell.classList.add(colour)
      keyboardColourChange(colour, cell)
    }, index * 400)
  }

  closeSection.addEventListener('click', function () {
    modalContainer.classList.add('hideModal')
  })
  openModal.addEventListener('click', function () {
    modalContainer.classList.remove('hideModal')
  })
})
