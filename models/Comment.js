const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        
    }
)

module.exports = Comment;