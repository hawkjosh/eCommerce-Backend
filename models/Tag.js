const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    // Defined an 'id' column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Defined a 'tag_name' column
    tag_name: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;