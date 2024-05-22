'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Investment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Investment.hasMany(models.Portofolio, {foreignKey: "InvestmentId"})
      Investment.belongsTo(models.Company, {foreignKey: "CompanyId"})
      Investment.belongsTo(models.Category, {foreignKey: "CategoryId"})
    }
  }
  Investment.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    CompanyId: DataTypes.INTEGER,
    investmentType: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Investment',
  });
  return Investment;
};