'use strict';

let studentList = require('../jsonData/students.json') 

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Students', studentList.map((i, _index) => ({ ...i, "created_at": new Date(), "updated_at": new Date() })), {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Students', null, {})
  }
};
