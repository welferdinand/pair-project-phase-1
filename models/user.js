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
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
          notNull: {
            msg : 'username is required'
          },
          notEmpty: {
            msg: 'username is required'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate : {
          notNull: {
            msg : 'Email is required'
          },
          notEmpty: {
            msg: 'Email is required'
          },
          isEmail: {
            msg: 'Email is not right formatted'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
          notNull: {
            msg : 'Password is required'
          },
          notEmpty: {
            msg: 'Password is required'
          },
          len : {
            args : [8,16],
            msg: 'Minimal password length is 8 and maximal is 16'
          }
        }
      },
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
