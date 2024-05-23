'use strict';
const {Op} = require('sequelize')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.hasOne(models.Investment, {foreignKey: "CompanyId"})
    }

    static async getCompanyByName(search) {
      try {
        let option = {
          where: {}
        };

        if (search) {
          option.where.name = {
            [Op.iLike]: `%${search}%`,
          };
        }

        let data = await Company.findAll(option)
        return data
      } catch (error) {
        throw error;
      }
    }
  }
  Company.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull: {
          msg : 'Company Name is required'
        },
        notEmpty: {
          msg: 'Company Name is required'
        }
      }
    },
    companyLogo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull: {
          msg : 'Company Image Url is required'
        },
        notEmpty: {
          msg: 'Company Image Url is required'
        },
        isUrl: {
          msg: 'Company Image Url is not right formatted'
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull: {
          msg : 'Location is required'
        },
        notEmpty: {
          msg: 'Location is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull: {
          msg : 'Description is required'
        },
        notEmpty: {
          msg: 'Description is required'
        } 
      }
    },
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};