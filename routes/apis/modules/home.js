const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  // #swagger.tags = ['Home']
  res.status(200).json({ message: 'Hello World!' })
})

module.exports = router