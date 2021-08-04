const sequelize = require("../config/connection");
const userData = require("./userData");
const postData = require("./postData");
const commentData = require("./commentData");
const { User, Post, Comment } = require("../models");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    await User.bulkCreate(userData);
    await Post.bulkCreate(postData);
    await Comment.bulkCreate(commentData);
    console.log("Database seeded!");
    process.exit(0);
};

seedDatabase();