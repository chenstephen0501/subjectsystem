'use strict';

let StudentCourseList = require('../jsonData/studentCourses.json')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('studentCourses', StudentCourseList, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('studentCourses', null, {})
  }
};