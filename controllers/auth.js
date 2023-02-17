const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const User = require("../models/users")

module.exports.renderLogin = (req, res) => {
  res.render("auth/login");
};
module.exports.isActive = wrapAsync(async(req,res,next) => {
  const user = await User.findOne({username: req.body.username});
  if(user.work.active)
    return next();
  else {
    req.flash('error', "Tài khoản của bạn đã bị đình chỉ");
    return res.logout((e) => {
      if (e) return next(e);
      res.redirect("/login");
    })
  }
})
module.exports.requestLogin = passport.authenticate("local", {
  failureRedirect: "/login",
  failureMessage: true,
  failureFlash: true,
});
module.exports.returnHome = (req, res) => {
  res.redirect("/home");
};
module.exports.logOut = (req, res, next) => {
  if (!req.user) {
    req.flash("error", "You are not logged in!");
    res.redirect("/login");
  } else {
    req.logout((e) => {
      if (e) return next(e);
      res.redirect("/login");
    });
  }
};
