// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // Defined an 'id' column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Defined a 'product_name' column
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Defined a 'price' column
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      // Set validation to ensure decimal type
      validate: {
        isDecimal: true
      }
    },
    // Defined a 'stock' column
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      // Set validation to ensure numeric type
      validate: {
        isNumeric: true
      }
    },
    // Defined a 'category_id' column
    category_id: {
      type: DataTypes.INTEGER,
      // Reference foreign key to primary key in category model at id column
      references: {
        model: 'category',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;