const express = require('express')
const router = express.Router()
const { apiErrorHandler } = require('../../middleware/error-handler')

const teachers = require('./modules/teachers')
const students = require('./modules/students')
const home = require('./modules/home')

router.use('/teachers', teachers)
router.use('/students', students)
router.use('/', home)

router.use('/', apiErrorHandler)

module.exports = router