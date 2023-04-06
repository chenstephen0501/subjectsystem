const express = require('express')
const router = express.Router()
const { apiErrorHandler } = require('../../middleware/error-handler')

const teachers = require('./modules/teachers')
const students = require('./modules/students')
const departments = require('./modules/departments')
const courses = require('./modules/courses')
const studentcourses = require('./modules/studentCourses')
const home = require('./modules/home')

router.use('/studentcourses', studentcourses)
router.use('/courses', courses)
router.use('/teachers', teachers)
router.use('/students', students)
router.use('/departments', departments)
router.use('/', home)

router.use('/', apiErrorHandler)

module.exports = router