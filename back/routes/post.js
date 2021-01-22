const express = require('express');
const router = express.Router();
const { Post, Comment, Image, User } = require('../models');

const { needToLogin } = require('./middlewares');

router.post('/add_post', needToLogin, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });

    const fullPost = await Post.findOne({
      where: { id: post.id },
      attributes: ['id', 'content'],
      include: [
        {
          model: Image,
          attributes: ['id', 'src', 'UserId'],
        },
        {
          model: Comment,
          attributes: ['id', 'content', 'UserId'],
        },
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
      ]
    });

    res.status(201).json(fullPost);
  } catch (error) {
    console.error('add post error :', error);
    next(error);
  }
});

router.post('/:postId/comment', needToLogin, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });

    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }

    const comment = await Comment.create({
      PostId: req.params.postId,
      content: req.body.content,
      UserId: req.body.userId,
    });
  
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
