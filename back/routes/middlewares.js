exports.needToLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그인이 필요합니다.');
  }
};

exports.shouldNotBeLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그인이 되어있지 않아야 됩니다.');
  }
};