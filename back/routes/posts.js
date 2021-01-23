const express = require('express');
const router = express.Router();

const { Post, Comment, Image, User } = require('../models');

router.get('/load_posts', async (req, res, next) => {
  try {
    const postList = await Post.findAll({
      offset: 0,
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC']
      ],
      attributes: ['id', 'content', 'createdAt'],
      include: [
        {
          model: User, // 게시글 작성자
          attributes: ['id', 'nickname'],
        },
        {
          model: User, // 좋아요 누른 유저
          as: 'PostLikers',
          attributes: ['id'],
        },
        {
          model: Image,
          attributes: ['id', 'src'],
        },
        {
          model: Comment,
          attributes: ['id', 'UserId', 'content'],
          include: [
            {
              model: User, // 댓글 장성자
              attributes: ['id', 'nickname'],
            }
          ]
        },
      ]
    });

    res.status(201).json(postList);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;