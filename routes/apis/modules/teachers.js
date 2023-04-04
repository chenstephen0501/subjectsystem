const express = require('express')
const router = express.Router()
const { Teacher } = require('../../../models')

router.post('/', async (req, res) => {
  try {
    const { name, phone, password, email, address, avatar_image, working, account } = req.body
    const checkAccount = await Teacher.findOne({ where: { account: req.body.account }})
    if (checkAccount) {
      return res.json({ status: 'error', message: '這個帳號己經註冊了。' })
    }
    if (!name || !phone || !password || !email || !address || !avatar_image || !working) {
      return res.json({ status: 'error', message: '所有資訊必需填寫。' })
    }
    console.log(avatar_image)
    const data = await Teacher.create({
      name,
      email,
      phone,
      password,
      address,
      avatar_image,
      working,
      account
    })
    console.log(data.toJSON())
    res.status(200).json(data.toJSON())
  } catch (err) {
    console.log(err)
  }
})
router.get('/', async (req, res) => {
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
    console.log(err)
  }
})

router.get('/:t_id', async (req, res) => {
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
    res.status(200).json(data.toJSON())
  } catch (err) {
    console.log(err)
  }
})
// router.post('/', async (req, res) => {
//   try {
//     console.log(req.body)
//     // const data = await Teacher.findOne({
//     //   where: {
//     //     id: Number(req.params.t_id)
//     //   },
//     //   attributes: {
//     //     exclude: [
//     //       'password',

//     //     ]
//     //   },
//     // })
//     // res.status(200).json(data.toJSON())
//   } catch (err) {
//     console.log(err)
//   }
// })

module.exports = router