const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const User = require("../models/users");

module.exports.checkCredentials = (req, res, next) => {
  const currentUser = req.user;
  const role = currentUser.work.position;
  if (role !== "admin" && role !== "hr") {
    req.flash("error", "Bạn không có quyền thực hiện thao tác này!");
    return res.redirect("/home");
  }
  next();
};

module.exports.showEmployees = wrapAsync(async(req,res) => {
  const all = await User.find();
  for(let one of all)
    console.log(one.username);
  res.render('users/all', {all});
})

module.exports.renderNewForm = (req, res) => {
  res.render("users/new");
};

module.exports.createUser = wrapAsync(async (req, res) => {
  const body = req.body;
  const newEmp = await User.register(new User(body), "1");
  res.redirect(`/users/${newEmp._id}`);
});

module.exports.renderProfile = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.render("users/profile", { user });
});

module.exports.renderEdit = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.render("users/edit", { user });
});
module.exports.pushEdit = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const { info, location } = req.body;
  console.log(info, location);
  res.send("success");
});
