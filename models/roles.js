'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users, Privileges}) {
      this.hasMany(Users, {
        foreignKey: "roleId",
        as: "users",
        onDelete: "cascade",
        hooks: true
      })
      this.hasMany(Privileges, {
        foreignKey: "roleId",
        as: "privileges",
        onDelete: "cascade",
        hooks: true
      })
    }
  };
  Roles.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Roles',
  });
  return Roles;
};