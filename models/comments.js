'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users,Posts}) {
      this.belongsTo(Users, {
        foreignKey: "userId",
        as: "user"
      })
      this.belongsTo(Posts, {
        foreignKey: "postId",
        as: "post"
      })
    }
  };
  Comments.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    content: {
      type:DataTypes.STRING
    },
    likes:{
       type: DataTypes.INTEGER
      },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};