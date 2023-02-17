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

const admin = {
  contacts: {
    phone: "0000000000",
    email: "admin@gmail.com",
  },
  work: {
    position: "admin",
    job: "ft",
    active: true,
  },
  pi: {
    name: {
      surname: "admin",
    },
  },
  initDate: '2023-2-15',
  username: "admin",
};

const hr = {
  contacts: {
    phone: "1111111111",
    email: "hr@gmail.com",
  },
  work: {
    position: "hr",
    job: "ft",
    active: true,
  },
  pi: {
    name: {
      surname: "hr",
    },
  },
  initDate: '2023-2-15',
  username: "hr",
};

const dbInit = async (admin, hr) => {
  await User.deleteMany({});
  const Admin = await User.register(new User(admin), "1");
  const HR = await User.register(new User(hr), "1");
};
dbInit(admin, hr);
