'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    queryInterface.addConstraint('Posts', {
      fields:['userId'],
      type: 'foreign key',
      references:{
        table:"Users",
        field:"id"
      }
    })
    queryInterface.addConstraint('Comments', {
      fields:['userId'],
      type: 'foreign key',
      references:{
        table:"Users",
        field:"id"
      }
    })
    queryInterface.addConstraint('Users', {
      fields:['roleId'],
      type: 'foreign key',
      references:{
        table:"Roles",
        field:"id"
      }
    })
    queryInterface.addConstraint('Privileges', {
      fields:['roleId'],
      type: 'foreign key',
      references:{
        table:"Roles",
        field:"id"
      }
    })
    queryInterface.addConstraint('Comments', {
      fields:['postId'],
      type: 'foreign key',
      references:{
        table:"Posts",
        field:"id"
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('Posts', {
      fields:['userId'],
      type: 'foreign key',
      references:{
        table:"Users",
        field:"id"
      }
    })
    queryInterface.removeConstraint('Comments', {
      fields:['userId'],
      type: 'foreign key',
      references:{
        table:"Users",
        field:"id"
      }
    })
    queryInterface.removeConstraint('Users', {
      fields:['roleId'],
      type: 'foreign key',
      references:{
        table:"Roles",
        field:"id"
      }
    })
    queryInterface.removeConstraint('Privileges', {
      fields:['roleId'],
      type: 'foreign key',
      references:{
        table:"Roles",
        field:"id"
      }
    })
    queryInterface.removeConstraint('Comments', {
      fields:['postId'],
      type: 'foreign key',
      references:{
        table:"Posts",
        field:"id"
      }
    })
  }


};
