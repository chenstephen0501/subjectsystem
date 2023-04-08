if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const { apis } = require('./routes')
const app = express()
const PORT = process.env.PORT 
const BASE_URL = process.env.BASE_URL 

// app.use(routes)
// app.use(express.urlencoded({ extended: true }))
// const corsOptions = {
//   origin: [
//     'https://subjectsystem.first-aws-project.com',
//     'http://localhost:3000',
//   ],
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//   allowedHeaders: ['Content-Type', 'Authorization', 'api_key'],
// };

// app.use(cors(corsOptions))
app.use(cors())
app.use(express.json())
app.use('/api', apis)
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))



app.listen(PORT, () => {
  console.log(`subjectsystem running on ${BASE_URL}:${PORT}`)
})