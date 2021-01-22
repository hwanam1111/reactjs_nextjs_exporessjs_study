const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User, Post } = require('../models');

const { needToLogin, shouldNotBeLoggedIn } = require('./middlewares');

const router = express.Router();

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

router.post('/logout', needToLogin, (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send('Logout Ok');
});


module.exports = router;
