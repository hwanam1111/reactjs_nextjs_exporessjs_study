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
          attributes: ['id', 'src'],
        },
        {
          model: Comment,
          attributes: ['id', 'UserId'],
          include: [
            {
              model: User, // 댓글 장성자
              attributes: ['id', 'nickname'],
            }
          ],
        },
        {
          model: User, // 글 작성자
          attributes: ['id', 'nickname', 'createdAt'],
        },
        {
          model: User, // 좋아요 누른 유저
          attributes: ['id'],
          as: 'PostLikers',
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
      PostId: parseInt(req.params.postId),
      content: req.body.content,
      UserId: req.body.userId,
    });

    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      attributes: ['id', 'content', 'PostId'],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        }
      ]
    })
  
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/:postId/liked', needToLogin, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });

    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }

    // UserId, PostLikerId
    await post.addPostLikers(req.user.id);

    res.status(201).json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:postId/liked', needToLogin, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });

    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }

    // UserId, PostLikerId
    await post.removePostLikers(req.user.id);

    res.status(201).json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:postId', needToLogin, async (req, res, next) => {
  try {
    await Post.destroy({
      where: { 
        id: req.params.postId,
        UserId: req.user.id,
      },
    });

    res.status(200).json({ PostId: parseInt(req.params.postId) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
