const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()

const PORT = 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/game.html'))
})

app.get('/word-of-the-day', async (req, res) => {
  try {
    const response = await fetch(
      'https://gist.githubusercontent.com/slushman/34e60d6bc479ac8fc698df8c226e4264/raw/',
      {
        method: 'GET',
      }
    )
    if (response.ok) {
      const text = await response.text()
      const wordsArray = text.split('\n').map((word) => word.trim())

      const wordOfTheDay =
        wordsArray[Math.floor(Math.random() * wordsArray.length)]
      const cleanedWord = wordOfTheDay.replace(/["\\,]/g, '')

      res.json({ word: cleanedWord })
    } else {
      res.status(response.status).send(response.statusText)
    }
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
})

app.get('/all-words', async (req, res) => {
  try {
    const response = await fetch(
      'https://gist.githubusercontent.com/slushman/34e60d6bc479ac8fc698df8c226e4264/raw/',
      {
        method: 'GET',
      }
    )
    if (response.ok) {
      const text = await response.text()
      const data = []
      text.split('\n').forEach((word) => {
        const cleanWord = word.replace(/[\[\],\"]/g, '')
        if (cleanWord.trim() !== '') {
          data.push(cleanWord.trim())
        }
      })
      res.json({ words: data })
    } else {
      res.status(response.status).send(response.statusText)
    }
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
})

app.listen(PORT, console.log('Listening on port ', PORT))
