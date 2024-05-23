"use strict";
const { Model } = require("sequelize");
const bcryptjs = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Portofolio, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      balance: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((data, option) => {
    const salt = bcryptjs.genSaltSync(8)
    const hash = bcryptjs.hashSync(data.password, salt)

    data.password = hash
    data.balance = 0
    data.role = "user"
  }) 
  return User;
};
