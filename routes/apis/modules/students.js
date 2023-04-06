const express = require('express')
const router = express.Router()
const { Student, StudentCourse, Course, Department, Teacher } = require('../../../models')

// 16.新增一位學生
router.post('/', async (req, res, next) => {
  try {
    const { name, phone, password, email, address, avatarImage, learning, account } = req.body
    const checkAccount = await Student.findOne({ where: { account: req.body.account } })
    if (checkAccount) {
      return res.json({ status: 'error', message: '這個帳號己經註冊了。' })
    }
    if (!name || !phone || !password || !email || !address || !avatarImage || !learning) {
      return res.json({ status: 'error', message: '所有資訊必需填寫。' })
    }
    const data = await Student.create({
      name,
      email,
      phone,
      password,
      address,
      avatarImage,
      learning,
      account
    })
    res.status(200).json(data.toJSON())
  } catch (err) {
    next(err)
  }
})
// 14. 查詢所有學生
router.get('/', async (req, res, next) => {
  try {
    const data = await Student.findAll({
      raw: true,
      attributes: {
        exclude: [
          'password',

        ]
      },
    })
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})
// 15.查詢一位學生
router.get('/:s_id', async (req, res, next) => {
  try {
    const data = await Student.findOne({
      where: {
        id: Number(req.params.s_id)
      },
      attributes: {
        exclude: [
          'password',

        ]
      },
    })
    if (!data) {
      return res.status(404).json({ status: 'error', message: '沒有這個帳號。' })
    }
    res.status(200).json(data.toJSON())
  } catch (err) {
    next(err)
  }
})
// 17.修改一位學生
router.put('/:s_id', async (req, res, next) => {
  try {
    const [checkAccount, student] = await Promise.all([Student.findOne({ where: { account: req.body.account } }), Student.findOne({
      where: {
        id: Number(req.params.s_id)
      }
    })])
    if (!checkAccount) {
      return res.json({ status: 'error', message: '沒有這個帳號。' })
    }
    if (Number(checkAccount.id) !== Number(req.params.s_id)) {
      return res.status(401).json({ status: 'error', message: '只能修改自己的帳號。' })
    }
    await student.update({ ...req.body })
    return res.status(200).json({ status: 'success', message: '編輯成功' })
  } catch (err) {
    next(err)
  }
})
// 18.刪除一位學生
router.delete('/:s_id', async (req, res, next) => {
  try {
    const [student] = await Promise.all([Student.findOne({
      where: {
        id: Number(req.params.s_id)
      }
    })])
    if (!student) {
      return res.status(404).json({ status: 'error', message: '沒有這個帳號。' })
    }
    await student.destroy({
      where: { id: Number(req.params.s_id) }
    })
    return res.status(200).json({ status: 'success', message: '刪除成功' })
  } catch (err) {
    next(err)
  }
})
// 24.學生查詢自己所有課程
router.get('/:s_id/courses', async (req, res, next) => {
  try {
    let data = await StudentCourse.findAll({
      raw: true,
      nest: true,
      where: {
        studentId: Number(req.params.s_id)
      },
      attributes: {
        exclude: [
          'id', 'createdAt', 'updatedAt', 'studentId'
        ]
      },
      include: {
        model: Course,
        attributes: {
          exclude: [
            'id', 'createdAt', 'updatedAt', 'departmentId'
          ]
        },
        include: [
          {
            model: Department,
            attributes: [['name', 'departmentName']]
          },
          {
            model: Teacher,
            attributes: ['name']
          },
        ]
      },
      order: ['courseId']
    })
    if (!data) {
      return res.status(404).json({ status: 'error', message: '沒有這個帳號。' })
    }
    data = data.map((i) => {
      i.className = i.Course.className,
      i.classTime = i.Course.classTime,
      i.introduction = i.Course.introduction,
      i.teacherId = i.Course.teacherId
      i.departmentName = i.Course.Department.departmentName
      i.teacherName = i.Course.Teacher.name
      delete i.Course
      return i
    })
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})
module.exports = router