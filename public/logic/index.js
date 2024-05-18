document.addEventListener('DOMContentLoaded', async function () {
  const closeSection = document.querySelector('.close')
  const openModal = document.querySelector('.modalIcon')
  const modalContainer = document.querySelector('.modalContainer')

  const keys = document.getElementsByTagName('input')
  const cells = document.getElementsByClassName('cell')
  const messageContainer = document.querySelector('.progressContainer')
  const grid = [[]]

  let rowCount = 0
  let letterCount = 0
  let count = 0

  const MAX_ROW = 6
  const MAX_COL = 5
  const TILE_FLIP_TIMER = 400

  let guessWord = ''
  let targetWord = ''
  let words = []
  let temp = []

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

  // Get all words
  async function allWords() {
    const response = await fetch('/all-words', {
      method: 'GET',
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch all words: ${response.statusText}`)
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

  async function getAndDisplayAllWords() {
    try {
      const res = await allWords()
      words = res.words
    } catch (error) {
      console.error(error)
    }
  }

  getAndDisplayWordOfTheDay()
  getAndDisplayAllWords()

  // Check if guessWord is valid
  function isGuessWordValid(guess) {
    return words.includes(guess.toLowerCase())
  }

  console.log('target ww', targetWord)

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
    if (value === 'ENTER') {
      guessWord = temp.toString().replace(/,/g, '')
      console.log(guessWord.length)
      if (guessWord.length < MAX_COL) {
        displayProgressMessage('Not enough letters')
        return
      }
      if (isGuessWordValid(guessWord)) {
        checkWord(guessWord, rowCount)
        letterCount = 0
        rowCount++
        temp = []
        return
      } else {
        displayProgressMessage('Not in word list')
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
    console.log('target', targetWord)
    // Perfect match,
    if (targetWord === word) {
      for (let w1 = 0; w1 < word.length; w1++) {
        const cell = grid[row][w1]
        addColour(cell, w1, 'green')
      }
      displayProgressMessage('Correct, well done')
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
    }, index * TILE_FLIP_TIMER)
  }

  function displayProgressMessage(text) {
    const message = document.createElement('p')
    message.textContent = text
    message.classList.add('progressMessage')
    messageContainer.appendChild(message)
    setTimeout(() => {
      message.classList.remove('progressMessage')
      message.textContent = ''
    }, 2000)
  }

  closeSection.addEventListener('click', function () {
    modalContainer.classList.add('hideModal')
  })
  openModal.addEventListener('click', function () {
    modalContainer.classList.remove('hideModal')
  })
})
