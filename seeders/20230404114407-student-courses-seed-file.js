'use strict';

let StudentCourseList = require('../jsonData/studentCourses.json')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('StudentCourses', StudentCourseList, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('StudentCourses', null, {})
  }
};