const express = require('express')
const router = express.Router()
const { Department, Teacher, Course, sequelize, StudentCourse, Student } = require('../../../models')

//  5.新增一門課程
router.post('/', async (req, res, next) => {
  try {
    const { className } = req.body
    const checkClassName = await Course.findOne({ where: { className } })
    if (checkClassName) {
      return res.json({ status: 'error', message: '己經有這門課程。' })
    }
    if (!className || className.trim() === "") {
      return res.json({ status: 'error', message: '必需輸入課程名稱。' })
    }
    const data = await Course.create({
      ...req.body
    })
    res.status(200).json(data.toJSON())
  } catch (err) {
    next(err)
  }
})
//  1.查詣所有課程
router.get('/', async (req, res, next) => {
  try {
    let data = await StudentCourse.findAll({
      raw: true,
      nest: true,
      // attributes: {
      //   exclude: [
      //     'createdAt',
      //     'updatedAt'
      //   ]
      // },
      include: [{
        model: Teacher,
        attributes: [[sequelize.col('name'), 'teacherName']],
      },
      {
        model: Department,
        attributes: [[sequelize.col('name'), 'departmentName']],
      }
      ]
    })
    console.log(data)
    data = data.map((i, _index) => {
      i = {
        ...i,
        teacherName: i.Teacher.teacherName,
        departmentName: i.Department.departmentName
      }
      delete i.Teacher
      delete i.Department
      return i
    })
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})
// 24.學生查詢自己所有課程
router.get('/:s_id', async (req, res, next) => {
  try {
    let data = await StudentCourse.findAll({
      raw: true,
      nest: true,
      where: {
        studentId: Number(req.params.s_id)
      },
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt'
        ]
      },
      include: [{
        model: Course,
        // attributes: [[sequelize.col('name'), 'teacherName']],
      },
      // {
      //   model: Department,
      //   attributes: [[sequelize.col('name'), 'departmentName']],
      // }
      ]
    })
    if (!data) {
      return res.status(404).json({ status: 'error', message: '沒有這門課程。' })
    }
    // data = data.toJSON()
    // data.teacherName = data.Teacher.teacherName,
    //   data.departmentName = data.Department.departmentName
    // delete data.Teacher
    // delete data.Department
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})
// 6. 修改一門課程
router.put('/:c_id', async (req, res, next) => {
  try {
    const [checkClassName] = await Promise.all([Course.findOne({
      where: {
        id: req.params.c_id
      }
    })])
    if (!checkClassName) {
      return res.json({ status: 'error', message: '沒有這問課程。' })
    }
    if (Number(checkClassName.id) !== Number(req.params.c_id)) {
      return res.status(200).json({ status: 'error', message: '只能修改這門課程。' })
    }
    await checkClassName.update({ ...req.body })
    return res.status(200).json({ status: 'success', message: '課程修改成功' })
  } catch (err) {
    next(err)
  }
})
router.delete('/:c_id', async (req, res, next) => {
  try {
    const [checkClassName] = await Promise.all([Course.findOne({
      where: {
        id: Number(req.params.c_id)
      }
    })])
    if (!checkClassName) {
      return res.status(404).json({ status: 'error', message: '沒有這門課程。' })
    }
    await checkClassName.destroy({
      where: { id: Number(req.params.c_id) }
    })
    return res.status(200).json({ status: 'success', message: '刪除成功' })
  } catch (err) {
    next(err)
  }
})

module.exports = router