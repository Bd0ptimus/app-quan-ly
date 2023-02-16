const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const User = require("../models/users");


module.exports.checkCredentials = (req, res, next) => {
  const currentUser = req.user;
  if(currentUser.role !== 'admin' || currentUser.role !== 'hr')
    
};
module.exports.renderNewForm = (req, res) => {
    res.render("user/new");
  };
module.exports.createUser = wrapAsync(async (req, res) => {
  const { emp } = req.body;
  const newEmp = await User.register(new User(emp), "1");
});





