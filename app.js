if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
const { apis } = require('./routes')
const app = express()
const PORT = process.env.PORT 
const BASE_URL = process.env.BASE_URL 

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(cors())
app.use(express.json())
app.use('/api', apis)

app.listen(PORT, () => {
  console.log(`subjectsystem running on ${BASE_URL}:${PORT}`)
})

module.exports = app