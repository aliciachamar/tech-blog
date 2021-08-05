const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get("/", async (req, res) => {
    try {
        const posts = await Post.findAll().map(post => post.toJSON());
        console.log(posts);
        res.status(200).json({message: Testing});
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;