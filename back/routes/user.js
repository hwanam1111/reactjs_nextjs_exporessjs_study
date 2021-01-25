const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User, Post } = require('../models');

const { needToLogin, shouldNotBeLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/', async (req, res, next) => { // get /user
  try {
    console.log('------------');
    console.log(req.headers);
    console.log('------------');
    if (req.user) {
      const userInfoWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: ['id', 'email', 'nickname'],
        include: [
          {
            model: Post,
            attributes: ['id'],
          }, 
          {
            model: User,
            as: 'Followers',
          },
          {
            model: User,
            as: 'Followings',
          },
        ]
      });

      res.status(200).json(userInfoWithoutPassword);
    }
    else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.post('/signup', shouldNotBeLoggedIn, async (req, res, next) => {  
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 11);
    await User.create({
      email: req.body.email,
      password: hashedPassword,
      nickname: req.body.nickname,
    });
  
    res.status(201).send('SignUp Ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 미들웨어 확장
router.post('/login', shouldNotBeLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('authenticate', err);
      return next(err);
    }

    if (info) {
      return res.status(401).send(info.reason);
    }

    // passport login
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error('passport loginError', loginErr);
        return next(loginErr);
      }

      const userInfoWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: ['id', 'email', 'nickname'],
        include: [
          {
            model: Post,
            attributes: ['id'],
          }, 
          {
            model: User,
            as: 'Followers',
          },
          {
            model: User,
            as: 'Followings',
          },
        ]
      });
      return res.status(200).json(userInfoWithoutPassword);
    });
  })(req, res, next);
});

router.patch('/change_nickname', needToLogin, async (req, res, next) => {
  try {
    await User.update({
      nickname: req.body.nickname,
    },
    {
      where: {
        id: req.user.id,
      },
    });

    res.status(200).json({ nickname: req.body.nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.patch('/:postUserId/follow', needToLogin, async (req, res, next) => {
  try {
    const postUser = await User.findOne({
      where: { id: req.params.postUserId }
    })

    if (!postUser) {
      return res.status(403).send('존재하지 않는 회원입니다.');
    }

    await postUser.addFollowers(req.user.id);

    res.status(200).json({ postUserId: parseInt(req.params.postUserId), postUserNickname: postUser.nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.delete('/:postUserId/follow', needToLogin, async (req, res, next) => {
  try {
    const postUser = await User.findOne({
      where: { id: req.params.postUserId }
    })

    if (!postUser) {
      return res.status(403).send('존재하지 않는 회원입니다.');
    }

    await postUser.removeFollowers(req.user.id);

    res.status(200).json({ postUserId: parseInt(req.params.postUserId) });
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.post('/logout', needToLogin, (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send('Logout Ok');
});

router.get('/followers', needToLogin, async (req, res, next) => {
  try {
    const me = await User.findOne({
      where: { id: req.user.id }
    })

    if (!me) {
      return res.status(403).send('존재하지 않는 회원입니다.');
    }


    const Followers = await me.getFollowers();

    res.status(200).json(Followers);
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.get('/followings', needToLogin, async (req, res, next) => {
  try {
    const me = await User.findOne({
      where: { id: req.user.id }
    })

    if (!me) {
      return res.status(403).send('존재하지 않는 회원입니다.');
    }

    const Followings = await me.getFollowings();

    res.status(200).json(Followings);
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.delete('/follower/:userId', needToLogin, async (req, res, next) => {
  try {
    const me = await User.findOne({
      where: { id: req.user.id }
    });

    if (!me) {
      return res.status(403).send('팔로워만 차단할수있어요.'); 
    }

    const follower = await User.findOne({
      where: { id: req.params.userId }
    });

    if (!follower) {
      return res.status(403).send('없는사람을 차단하려고 하시네요.');
    }

    await follower.removeFollowings(req.user.id);

    res.status(200).json({ UserId: follower.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.post('/logout', needToLogin, (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send('Logout Ok');
});


module.exports = router;
