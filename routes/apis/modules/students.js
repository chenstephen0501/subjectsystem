const express = require('express')
const router = express.Router()
const { Student } = require('../../../models')

router.post('/', async (req, res, next) => {
  try {
    const { name, phone, password, email, address, avatar_image, learning, account } = req.body
    const checkAccount = await Student.findOne({ where: { account: req.body.account } })
    if (checkAccount) {
      return res.json({ status: 'error', message: '這個帳號己經註冊了。' })
    }
    if (!name || !phone || !password || !email || !address || !avatar_image || !learning) {
      return res.json({ status: 'error', message: '所有資訊必需填寫。' })
    }
    const data = await Student.create({
      name,
      email,
      phone,
      password,
      address,
      avatar_image,
      learning,
      account
    })
    res.status(200).json(data.toJSON())
  } catch (err) {
    next(err)
  }
})
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

router.get('/:t_id', async (req, res, next) => {
  try {
    const data = await Student.findOne({
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
router.put('/:t_id', async (req, res, next) => {
  try {
    const [checkAccount, student] = await Promise.all([Student.findOne({ where: { account: req.body.account } }), Student.findOne({
      where: {
        id: Number(req.params.t_id)
      }
    })])
    if (!checkAccount) {
      return res.json({ status: 'error', message: '沒有這個帳號。' })
    }
    if (Number(checkAccount.id) !== Number(req.params.t_id)) {
      return res.status(401).json({ status: 'error', message: '只能修改自己的帳號。' })
    }
    await student.update({ ...req.body })
    return res.status(200).json({ status: 'success', message: '使用者編輯成功' })
  } catch (err) {
    next(err)
  }
})
router.delete('/:t_id', async (req, res, next) => {
  try {
    const [student] = await Promise.all([Student.findOne({
      where: {
        id: Number(req.params.t_id)
      }
    })])
    if (!student) {
      return res.status(404).json({ status: 'error', message: '沒有這個帳號。' })
    }
    await student.destroy({
      where: { id: Number(req.params.t_id) }
    })
    return res.status(200).json({ status: 'success', message: '刪除成功' })
  } catch (err) {
    next(err)
  }
})

module.exports = router