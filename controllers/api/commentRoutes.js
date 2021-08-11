const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post("/:id", withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            text: req.body.newComment,
            dateCreated: new Date(),
            userId: req.session.user_id,
            postId: req.params.id
        });
        res.status(200).redirect(`/api/posts/${req.params.id}`);
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;