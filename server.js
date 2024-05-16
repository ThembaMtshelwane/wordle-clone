const express = require('express')
const app = express()
const path = require('path')
let cachedWord = null
let lastFetchedDate = null
require('dotenv').config()

const PORT = 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/game.html'))
})

app.get('/word-of-the-day', async (req, res) => {
  const apiKey = process.env.WORDNIK_API_KEY
  const url = `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun&minLength=5&maxLength=5&limit=1&api_key=${apiKey}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error)
    res.status(500).json({ error: 'Failed to fetch word from Wordnik' })
  }
})

app.listen(PORT, console.log('Listening on port ', PORT))
