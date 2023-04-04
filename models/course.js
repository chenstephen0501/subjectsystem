'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.Department, { foreignKey: 'departmentId' })
      Course.belongsTo(models.Teacher, {
        foreignKey: 'teacherId' })
      Course.hasMany(models.Course, { foreignKey: 'courseId' })
    }
  };
  Course.init({
    class_name: DataTypes.STRING,
    class_time: DataTypes.STRING,
    introduction: DataTypes.TEXT,
    department_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
    tableName: 'Courses',
    underscored: true,
  });
  return Course;
};