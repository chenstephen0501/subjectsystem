const express = require('express')
const router = express.Router()

const teachers = require('./modules/teachers')
const home = require('./modules/home')

router.use('/', home)
router.use('/teachers', teachers)

// router.get('/teachers/:t_id', teacher)

module.exports = router