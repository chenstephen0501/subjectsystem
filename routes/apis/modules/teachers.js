const express = require('express')
const router = express.Router()
const { Teacher, Course, Department } = require('../../../models')

// 4.新增一位講師
router.post('/', async (req, res, next) => {
  try {
    const { name, phone, password, email, address, avatarImage, working, account } = req.body
    const checkAccount = await Teacher.findOne({ where: { account: req.body.account }})
    if (checkAccount) {
      return res.status(404).json({ status: 'error', message: '這個帳號己經註冊了。' })
    }
    if (!name || !phone || !password || !email || !address || !avatarImage || !working) {
      return res.status(404).json({ status: 'error', message: '所有資訊必需填寫。' })
    }
    const data = await Teacher.create({
      name,
      email,
      phone,
      password,
      address,
      avatarImage,
      working,
      account
    })
    res.status(200).json(data.toJSON())
  } catch (err) {
    next(err)
  }
})
// 2.查詢所有講師
router.get('/', async (req, res, next) => {
  try {
    const data = await Teacher.findAll({
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
// 11.查詢一位講師
router.get('/:t_id', async (req, res, next) => {
  try {
    const data = await Teacher.findOne({
      where: {
        id: Number(req.params.t_id)
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
// 10.修改一位講師
router.put('/:t_id', async (req, res, next) => {
  try {
    const [checkAccount, teacher] = await Promise.all([Teacher.findOne({ where: { account: req.body.account } }), Teacher.findOne({ where: { 
      id: Number(req.params.t_id)
    }})])
    if (!checkAccount) {
      return res.status(404).json({ status: 'error', message: '沒有這個帳號。' })
    }
    if (Number(checkAccount.id) !== Number(req.params.t_id)) {
      return res.status(200).json({ status: 'error', message: '只能修改自己的帳號。' })
    }
    await teacher.update({...req.body})
    return res.status(200).json({ status: 'success', message: '編輯成功' })
  } catch (err) {
    next(err)
  }
})
// 9.刪除一位講師
router.delete('/:t_id', async (req, res, next) => {
  try {
    const [teacher] = await Promise.all([Teacher.findOne({
      where: {
        id: Number(req.params.t_id)
      }
    })])
    if (!teacher) {
      return res.status(404).json({ status: 'error', message: '沒有這個帳號。' })
    }
    await teacher.destroy({
      where: { id: Number(req.params.t_id) }
    })
    return res.status(200).json({ status: 'success', message: '刪除成功' })
  } catch (err) {
    next(err)
  }
})
// 3.教師所開課程
router.get('/:t_id/courses', async (req, res, next) => {
  try {
    let data = await Teacher.findOne({
      where: {
        id: Number(req.params.t_id)
      },
      attributes: [ 'id', 'name' ],
      include: { model: Course,
        attributes: {
          exclude: [
            'teacherId', 'createdAt', 'updatedAt'
          ]
        },
        include: { model: Department, attributes: ['name'] }
      }
    })
    if (!data) {
      return res.status(404).json({ status: 'error', message: '沒有這個教師。' })
    }
    data = data.toJSON()
    data.Courses.map((i, _index) => {
      delete i.departmentId
      i.department = i.Department.name
      delete i.Department
    })
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

module.exports = router