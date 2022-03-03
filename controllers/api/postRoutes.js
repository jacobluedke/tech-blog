const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll(
            {
                include: [{ model: Comment }],
            });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(
            {
                include: [{ model: Comment }, { model: User }],
                },
            {
                where: {
                    id: req.params.id,
                },
        });
        if (postData) {
            const post = postData.get({ plain: true });
        } else {
            res.status(400).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create(req.body);
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/', async (req, res) => {
    try {
        const updatedPost = await Post.update(
            {
                id: req.body.id,
                post_name: req.body.post_name,
                text: req.body.text,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        )
        if (!updatedPost) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await Post.destroy(
            {
                where: {
                    id: req.params.id
                }
            });
            if (!deletedPost) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.status(200).json(deletedPost);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
