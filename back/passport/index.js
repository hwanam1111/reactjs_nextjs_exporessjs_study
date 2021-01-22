const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // 로그인 한 뒤로는 router실행되기 전에 매번 실행 됨.
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user);
    } catch (error) {
      console.error('deserializeUser:', error);
      done(error);
    } 
  });

  local();
}