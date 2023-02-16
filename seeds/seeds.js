const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const User = require("../models/users");
const app = express();


mongoose.connect("mongodb://127.0.0.1:27017/i-techco", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("strictQuery", true);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.use(passport.initialize());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const dbInit = async () => {
  await User.deleteMany({});
  const admin = await User.register(
    new User({ email: "admin@gmail.com", username: "admin", role: "admin" }),
    "1"
  );
  const HR = await User.register(
    new User({ email: "hrEmp@gmail.com", username: "hrEmp", role: "admin" }),
    "1"
  );
  
};
dbInit()
