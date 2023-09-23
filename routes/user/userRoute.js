const express = require("express");
const userRoute = express();
const {
  registerCtrl,
  loginCtrl,
  profileCtrl,
  updateProfileCtrl,
  updatePasswordCtrl,
  userDetailCtrl,
} = require("../../controllers/user/users");
const isLogin = require("../../middlewares/isLogin");

userRoute.post("/register", registerCtrl);

userRoute.post("/login", loginCtrl);
userRoute.get("/profile", isLogin, profileCtrl);
userRoute.put("/profile", isLogin, updateProfileCtrl);
userRoute.put("/update-password/:id", updatePasswordCtrl);
userRoute.get("/profile/:id", userDetailCtrl);

module.exports = userRoute;
