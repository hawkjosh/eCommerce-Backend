const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // Defined an 'id' column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Defined a 'product_id' column
    product_id: {
      type: DataTypes.INTEGER,
      // Reference foreign key to primary key in product model at id column
      references: {
        model: 'product',
        key: 'id'
      }
    },
    // Defined a 'tag_id' column
    tag_id: {
      type: DataTypes.INTEGER,
      // Reference foreign key to primary key in tag model at id column
      references: {
        model: 'tag',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;