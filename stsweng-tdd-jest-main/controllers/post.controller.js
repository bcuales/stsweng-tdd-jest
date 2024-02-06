const PostModel = require('../models/post.model');
const PostController = {};

PostController.create = (req, res) => {
    return PostModel.createPost(req.body, (err, post) => {
        if (err) {
            return res.status(500).end();
        } else {
            return res.json(post);
        }
    });
};

PostController.update = (req, res) => {
    const postId = req.params.id;
    const updatedData = req.body;

    PostModel.updatePost(postId, updatedData, (error, updatedPost) => {
        if (error) {
            if (error.error === 'Post not found') {
                return res.status(404).end();
            } else {
                return res.status(500).end();
            }
        }

        return res.status(200).json(updatedPost);
    });
};

PostController.findPost = (req, res) => {
    const postId = req.params.id;

    PostModel.findPost(postId, (error, foundPost) => {
        if (error) {
            if (error.error === 'Post not found') {
                return res.status(404).end();
            } else {
                return res.status(500).end();
            }
        }

        return res.status(200).json(foundPost);
    });
};

PostController.getAllPosts = (req, res) => {
};

module.exports = PostController;
