const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const User = require("../models/users");

module.exports.checkCredentials = (req, res, next) => {
  const currentUser = req.user;
  console.log(req.originalUrl);
  if (currentUser.role !== "admin" && currentUser.role !== "hr") {
    req.flash("error", "Bạn không có quyền thực hiện thao tác này!");
    return res.redirect("/home");
  }
  next();
};
module.exports.renderNewForm = (req, res) => {
  res.render("users/new");
};
module.exports.createUser = wrapAsync(async (req, res) => {
  const { emp } = req.body;
  emp.role = "nv";
  const newEmp = await User.register(new User(emp), "1");
  res.redirect(`/users/${newEmp._id}`);
});

module.exports.renderProfile = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.render("users/profile", { user });
});
