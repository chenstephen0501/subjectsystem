const express = require('express')
const router = express.Router()
const { Department } = require('../../../models')

// 21.新增一門科系
router.post('/', async (req, res, next) => {
  // #swagger.tags = ['Department']
  try {
    const { name } = req.body
    const checkName = await Department.findOne({ where: { name } })
    if (checkName) {
      return res.status(404).json({ status: 'error', message: '己經有這個科系。' })
    }
    if (!name || name.trim() === "") {
      return res.status(404).json({ status: 'error', message: '必需輸入系名。' })
    }
    const data = await Department.create({
      name
    })
    res.status(200).json(data.toJSON())
  } catch (err) {
    next(err)
  }
})
// 19.查詢所有科系
router.get('/', async (req, res, next) => {
  // #swagger.tags = ['Department']
  try {
    const data = await Department.findAll({
      raw: true,
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt'
        ]
      },
    })
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})
// 20.查詢一門科系
router.get('/:d_id', async (req, res, next) => {
  // #swagger.tags = ['Department']
  try {
    const data = await Department.findOne({
      where: {
        id: Number(req.params.d_id)
      },
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt'
        ]
      },
    })
    if (!data) {
      return res.status(404).json({ status: 'error', message: '沒有這個科系。' })
    }
    res.status(200).json(data.toJSON())
  } catch (err) {
    next(err)
  }
})
// 22.修改一門科系
router.put('/:d_id', async (req, res, next) => {
  // #swagger.tags = ['Department']
  try {
    const  { name } = req.body
    const [checkDepartment]= await Promise.all([Department.findOne({
      where: {
        id: req.params.d_id
      }
    })])
    if (!checkDepartment) {
      return res.json({ status: 'error', message: '沒有這個科系。' })
    }
    if (Number(checkDepartment.id) !== Number(req.params.d_id)) {
      return res.status(200).json({ status: 'error', message: '只能所選的的科系。' })
    }
    await checkDepartment.update({ name })
    return res.status(200).json({ status: 'success', message: '使用者編輯成功' })
  } catch (err) {
    next(err)
  }
})
// 23.刪除一問科系
router.delete('/:d_id', async (req, res, next) => {
  // #swagger.tags = ['Department']
  try {
    const [checkDepartment] = await Promise.all([Department.findOne({
      where: {
        id: Number(req.params.d_id)
      }
    })])
    if (!checkDepartment) {
      return res.status(404).json({ status: 'error', message: '沒有這個系別。' })
    }
    await checkDepartment.destroy({
      where: { id: Number(req.params.d_id) }
    })
    return res.status(200).json({ status: 'success', message: '刪除成功' })
  } catch (err) {
    next(err)
  }
})

module.exports = router