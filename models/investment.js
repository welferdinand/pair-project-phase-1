"use strict";
const { Op } = require('sequelize')
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Investment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Investment.hasMany(models.Portofolio, { foreignKey: "InvestmentId" });
      Investment.belongsTo(models.Company, { foreignKey: "CompanyId" });
      Investment.belongsTo(models.Category, { foreignKey: "CategoryId" });
    }

    formatRupiah() {
      return this.amount.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
    }

    static async getInvestmentByName(id, search) {
      try {
        let option = {
          include: sequelize.models.Company,
          where: {
            CategoryId: id,
          },
        };

        if (search) {
          option.where.name = {
            [Op.iLike]: `%${search}%`,
          };
        }

        let data = await Investment.findAll(option)
        return data
      } catch (error) {
        throw error;
      }
    }
  }
  Investment.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
          notNull: {
            msg : 'Nama Investasi is required'
          },
          notEmpty: {
            msg: 'Nama Investasi is required'
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
          },
        }
      },
      CompanyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate : {
          notNull: {
            msg : 'Nama Perusahaan required'
          },
          notEmpty: {
            msg: 'Nama Perusahaan required'
          }
        }
      },
      investmentType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
          notNull: {
            msg : 'Investment Type is required'
          },
          notEmpty: {
            msg: 'Investment Type is required'
          }
        }
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate : {
          notNull: {
            msg : 'Harga is required'
          },
          notEmpty: {
            msg: 'Harga is required'
          },
          min: {
            msg: 'Minimum Harga adalah 1000000',
            args: 1000000
          }
        }
      },
      CategoryId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Investment",
    }
  );
  return Investment;
};
