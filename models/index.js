const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

Post.hasMany(Comment, {
    foreignKey: "postId",
    onDelete: "CASCADE"
});

Comment.belongsTo(Post, {
    foreignKey: "postId"
});

User.hasMany(Post, {
    foreignKey: "userId"
});

Post.belongsTo(User, {
    foreignKey: "userId"
});

User.hasMany(Comment, {
    foreignKey: "userId"
});

Comment.belongsTo(User, {
    foreignKey: "userId"
});

module.exports = { User, Post, Comment };