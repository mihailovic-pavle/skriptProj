'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Privileges extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Roles}) {
      this.belongsTo(Roles, {
        foreignKey: "roleId",
        as: "role"
      })
    }
  };
  Privileges.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
     type: DataTypes.STRING
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Privileges',
  });
  return Privileges;
};