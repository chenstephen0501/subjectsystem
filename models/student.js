'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.hasMany(models.StudentCourse, { foreignKey: 'studentId' })
    }
  };
  Student.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    account: DataTypes.STRING,
    address: DataTypes.STRING,
    avatarImage: DataTypes.STRING,
    learning: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Student',
    tableName: 'Students',
    underscored: true,
  });
  return Student;
};