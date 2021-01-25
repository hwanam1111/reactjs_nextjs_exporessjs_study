const express = require('express');
const { Op } = require('sequelize');

const { Post, Comment, Image, User } = require('../models');

const router = express.Router();

router.get('/load_posts', async (req, res, next) => {
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) { // 첫 로딩이 아닐 떄
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }
    }

    const postList = await Post.findAll({
      where,
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
        {
          model: Post,
          as: 'RetweetId',
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
            {
              model: Image,
              attributes: ['id', 'src'],
            },
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