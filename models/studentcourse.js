'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StudentCourse.belongsTo(models.Course, { foreignKey: 'courseId' })
      StudentCourse.belongsTo(models.Student, { foreignKey: 'studentId' })
    }
  };
  StudentCourse.init({
    course_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StudentCourse',
    tableName: 'StudentsCourses',
    underscored: true,
  });
  return StudentCourse;
};