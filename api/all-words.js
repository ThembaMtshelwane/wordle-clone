const fetch = require('node-fetch')

module.exports = async (req, res) => {
  try {
    const response = await fetch(
      'https://gist.githubusercontent.com/slushman/34e60d6bc479ac8fc698df8c226e4264/raw/',
      { method: 'GET' }
    )
    if (response.ok) {
      const text = await response.text()
      const data = text
        .split('\n')
        .map((word) => word.replace(/[\[\],\"]/g, '').trim())
        .filter((word) => word)
      res.json({ words: data })
    } else {
      res.status(response.status).send(response.statusText)
    }
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
}
