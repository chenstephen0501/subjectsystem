if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const { apis } = require('./routes')
const app = express()
const PORT = process.env.PORT 
const BASE_URL = process.env.BASE_URL 



// app.use(routes)
// app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api', apis)


app.listen(PORT, () => {
  console.log(`subjectsystem running on ${BASE_URL}:${PORT}`)
})