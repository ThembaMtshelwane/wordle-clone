const express = require('express')
const app = express()
const path = require('path')

const PORT = 3000

app.use(express.static(path.join(__dirname, 'public')))

app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/game.html'))
})

app.listen(PORT, console.log('Listening on port ', PORT))
