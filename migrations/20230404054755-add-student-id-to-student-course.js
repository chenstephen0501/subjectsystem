'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('StudentCourses', 'student_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Students',
        key: 'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('StudentCourses', 'student_id')
  }
};
