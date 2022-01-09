'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
     static associate({Users,Comments}) {
      this.belongsTo(Users, {
        foreignKey: "userId",
        as: "user"
      })
      this.hasMany(Comments, {
        foreignKey: "postId",
        as: "comments",
        onDelete: "cascade",
        hooks: true
      })
      
    }
  };
  Posts.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    //name nek bude content 
    name: {
      type:DataTypes.STRING,
    },
    likes: {
      type:DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    defaultScope: {
      attributes: {
        exclude: []
      }
    },
    modelName: 'Posts',
  });
  return Posts;
};