const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const User = require("../models/users");
const { dateToObj,getCurrentDate } = require("../utils/helpers");

module.exports.checkCredentials = (req, res, next) => {
  const currentUser = req.user;
  const role = currentUser.work.position;
  if (role !== "admin" && role !== "hr") {
    req.flash("error", "Bạn không có quyền thực hiện thao tác này!");
    return res.redirect("/home");
  }
  next();
};

module.exports.showEmployees = wrapAsync(async (req, res) => {
  const all = await User.find();
  for (let one of all) console.log(one);
  res.render("users/all", { all });
});

module.exports.renderNewForm = (req, res) => {
  res.render("users/new");
};

module.exports.createUser = wrapAsync(async (req, res) => {
  const body = req.body;
  body.initDate = getCurrentDate();
  const newEmp = await User.register(new User(body), "1");
  req.flash("success", "Thêm nhân viên thành công");
  res.redirect(`/users/${newEmp._id}`);
});

module.exports.renderProfile = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  const { contacts, pi } = user;
  const dob = dateToObj(pi.dob);
  console.log(pi.fullLocation);
  res.render("users/profile", { user, contacts, pi, dob });
});

module.exports.renderEdit = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  const { contacts, pi, work } = user;
  const dob = dateToObj(pi.dob);
  res.render("users/edit", { pi,contacts,user, work, location: pi.location });
});

module.exports.pushEdit = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  console.log(body);
  const user = await User.findByIdAndUpdate(id, body);
  req.flash("success", "Cập nhật thông tin thành công");
  res.redirect(`/users/${user._id}`);
});
