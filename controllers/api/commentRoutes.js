const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({});
        const comments = commentData.map((comment) => comment.get({ plain: true }));
        res.json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/comment/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk({
            where: {
                id: req.params.id,
            },
            include: [User],
        });
        if (commentData) {
            const comment = commentData.get({ plain: true });
            // dont know what to put here
            res.render('single-comment', {post, logged_in: req.session.logged_in});
        } else {
            res.status(400).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create(req.body);
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/', async (req, res) => {
    try {
        const updatedComment = await Comment.update(
            {
                id: req.body.id,
                comment_name: req.body.comment_name,
                text: req.body.text,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        )
        if (!updatedComment) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedComment = await Comment.destroy(
            {
                where: {
                    id: req.params.id
                }
            });
            if (!deletedComment) {
                res.status(404).json({ message: 'No comment found with this id' });
                return;
            }
            res.status(200).json(deletedComment);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
