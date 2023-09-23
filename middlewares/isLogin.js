const appErr = require("../utils/appErr");

const isLogin = (req, res, next) => {
  if (req.session.userAuth) {
    next();
  } else {
    next(appErr("Not authorized"));
  }
};
module.exports = isLogin;
