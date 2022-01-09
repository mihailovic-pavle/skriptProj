'use strict';

const { INTEGER } = require("sequelize");

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      likes: {
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
        
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Posts');
  }
};