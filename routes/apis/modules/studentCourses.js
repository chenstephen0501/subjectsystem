const express = require('express')
const router = express.Router()
const { Department, Teacher, Course, sequelize, StudentCourse, Student } = require('../../../models')

//  25.學生選擇一門課程
router.post('/', async (req, res, next) => {
  // #swagger.tags = ['StudentCourse']
  try {
    const { studentId, courseId } = req.body
    if (!studentId || !courseId) {
      return res.status(404).json({ status: 'error', message: '沒有選擇課程。' })
    }
    console.log(studentId, typeof studentId, courseId, typeof courseId)
    const [checkStudentCourse, checkCourse, checkStudent] = await Promise.all([StudentCourse.findOne({ where: { studentId, courseId } }), Course.findOne({ where: { id: courseId }}), Student.findOne({ where: { id: studentId }})])
    if (!checkStudent) {
      return res.status(404).json({ status: 'error', message: '沒有這位學生!' })
    }
    if (!checkCourse) {
      return res.status(404).json({ status: 'error', message: '沒有這門課程!' })
    }checkStudent
    if (checkStudentCourse) {
      return res.status(404).json({ status: 'error', message: '己選擇這門課程!' })
    }
    const data = await StudentCourse.create({
      studentId, courseId
    })
    res.status(200).json({ status: 'success', message: '成功選擇課程。'})
  } catch (err) {
    next(err)
  }
})
// 26. 學生修改一門選修課程
router.put('/', async (req, res, next) => {
  // #swagger.tags = ['StudentCourse']
  try {
    const { studentId, courseId, newCourseId } = req.body
    if (!studentId || !courseId) {
      return res.status(404).json({ status: 'error', message: '沒有選擇課程。' })
    }
    let [checkStudentCourse, checkCourse, checkStudent] = await Promise.all([StudentCourse.findOne({ where: { studentId, courseId } }), Course.findOne({ where: { id: newCourseId } }), Student.findOne({ where: { id: studentId } })])
    if (!checkStudent) {
      return res.status(404).json({ status: 'error', message: '沒有這位學生!' })
    }
    if (!checkCourse) {
      return res.status(404).json({ status: 'error', message: '沒有這門課程!' })
    } 
    if (!checkStudentCourse) {
      return res.status(404).json({ status: 'error', message: '還沒選過這門課程!' })
    }
    await checkStudentCourse.update({
     studentId, courseId: newCourseId
    })
    res.status(200).json({ status: 'success', message: '成功修改課程。' })
  } catch (err) {
    next(err)
  }
})
// 27. 學生刪除一門課程 
router.delete('/:c_id', async (req, res, next) => {
  // #swagger.tags = ['StudentCourse']
  try {
    const { studentId } = req.body
    const courseId  = req.params.c_id
    if (!studentId || !courseId) {
      return res.status(404).json({ status: 'error', message: '沒有選擇課程。' })
    }
    let [checkStudentCourse, checkCourse, checkStudent] = await Promise.all([StudentCourse.findOne({ where: { studentId, courseId } }), Course.findOne({ where: { id: courseId } }), Student.findOne({ where: { id: studentId } })])
    if (!checkStudent) {
      return res.status(404).json({ status: 'error', message: '沒有這位學生!' })
    }
    if (!checkCourse) {
      return res.status(404).json({ status: 'error', message: '沒有這門課程!' })
    }
    if (!checkStudentCourse) {
      return res.status(404).json({ status: 'error', message: '學生沒選擇這門課程!' })
    }
    await checkStudentCourse.destroy()
    res.status(200).json({ status: 'success', message: '成功刪除課程。' })
  } catch (err) {
    next(err)
  }
})

module.exports = router