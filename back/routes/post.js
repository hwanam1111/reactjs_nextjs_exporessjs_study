const express = require('express');
const path = require('path');
const multer = require('multer');
const fileSystem = require('fs');
const router = express.Router();

const { Post, Comment, Image, User, Hashtag } = require('../models');
const { needToLogin } = require('./middlewares');
const { create } = require('domain');
// const { route } = require('./user');

try {
  fileSystem.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더를 생성합니다.')
  fileSystem.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({ // 컴퓨터 하드웨어에 저장 -> 나중에 AWS S3로 변경
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // 확장자 추출
      const basename = path.basename(file.originalname, ext);

      done(null, basename + '_' + new Date().getTime() + ext); // filename + time + ext
    }
  }),
  limits: {
    fileSize: 20 * 1024 * 1024
  },
});
router.post('/images', needToLogin, upload.array('image'), async (req, res, next) => { // upload.array('image') -> 여러장, upload.single('image') -> 한장
  try {
    console.log('Upload files: ', req.files);
    res.json(req.files.map((v) => v.filename));
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.post('/add_post', needToLogin, upload.none(), async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });

    const hashtags = Array.from(new Set(req.body.content.match(/(#[^\s#]+)/g)));
    if (hashtags) {
      const result = await Promise.all(hashtags.map((v) => Hashtag.findOrCreate({ 
        where: { name: v.slice(1).toLowerCase() },
      })));

      await post.addHashtags(result.map((v) => v[0]));
    }

    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
        await post.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }

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

router.get('/load_specify_post/:postId', async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });

    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
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
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: Image,
          attributes: ['id', 'src'],
        },
        {
          model: Comment,
          attributes: ['id', 'UserId'],
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            }
          ],
        },
        {
          model: User,
          attributes: ['id', 'nickname'],
          as: 'PostLikers',
        },
      ]
    });

    res.status(200).json(fullPost);

    if (!post) {
      return res.status(404).send('존재하지 않는 게시글입니다.');
    }





  } catch (error) {
    console.error(error);
    next(error);
  }
})

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

router.post('/retweet/:postId', needToLogin, async (req, res, next) => {
  try {
    const retweetPost = await Post.findOne({
      where: { id: req.params.postId },
      include: [
        {
          model: Post,
          as: 'RetweetId',
        }
      ]
    });

    if (!retweetPost) {
      return res.status(403).send('없는 게시글은 리트윗 할 수 없습니다.');
    }

    if (retweetPost.UserId === req.user.id) {
      return res.status(403).send('내 게시글은 리트윗 할 수 없습니다.');
    }

    if (retweetPost.RetweetIdId && retweetPost.RetweetId.UserId === req.user.id) {
      return res.status(403).send('내 게시글은 리트윗 할 수 없습니다.');
    }

    const retweetTargetId = retweetPost.RetweetId || retweetPost.id; // 리트윗 할 게시글이 이미 리트윗 한 게시글인지 체크 (retweet id가 있으면 리트윗 아이디를 사용, 없으면 post id를 사용)
    const exPost = await Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetIdId: retweetTargetId,
      }
    });

    if (exPost) {
      return res.status(403).send('이미 리트윗 한 게시글입니다.');
    }

    const retweet = await Post.create({
      UserId: req.user.id,
      RetweetIdId: retweetTargetId,
      content: 'retweet',
    });

    const retweetWithPrevPost = await Post.findOne({
      where: { id: retweet.id },
      include: [
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
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: Image,
          attributes: ['id', 'src'],
        },
        {
          model: Comment,
          attributes: ['id', 'UserId'],
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            }
          ],
        },
        {
          model: User,
          attributes: ['id'],
          as: 'PostLikers',
        },
      ]
    });

    res.status(201).json(retweetWithPrevPost);
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
