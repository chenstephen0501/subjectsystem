const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000

app.get('/class', (req, res) => {
  res.send('hello world')
})

app.listen(PORT, () => {
  console.log(`subjectsystem running on http://localhost:${PORT}`)
})