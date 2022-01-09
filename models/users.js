'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  static associate({Posts,Roles,Comments}) {
    this.belongsTo(Roles, {
      foreignKey: "roleId",
      as: "role"
    })
      this.hasMany(Posts, {
        foreignKey: "userId",
        as: "posts",
        onDelete: "cascade",
        hooks: true
      })
      this.hasMany(Comments, {
        foreignKey: "userId",
        as: "comments",
        onDelete: "cascade",
        hooks: true
      })
    }
  };
  Users.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
     type:DataTypes.STRING 
    },
    email: {
      type:DataTypes.STRING
    },
    password: {
      type:DataTypes.STRING
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {
    sequelize,
    defaultScope: {
      attributes: {
        exclude: []
      }
    },
    modelName: 'Users',
  });
  return Users;
};