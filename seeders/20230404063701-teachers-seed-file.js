'use strict';

let teacherList = require('../jsonData/teachers.json')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Teachers', 
      teacherList.map((i, _index) => ({ ...i, "created_at": new Date(), "updated_at": new Date() })), {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Teachers', null, {})
  }
};
