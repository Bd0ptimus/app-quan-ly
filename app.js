require("dotenv").config();


const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require("express");
const passport = require("passport");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const User = require("./models/users");
const MongoStore = require("connect-mongo");
const { isLoggedIn } = require("./utils/middlewares");
const authRoute = require("./routes/auth");
const hrRoutes = require('./routes/hrRoutes');
const manageRoutes = require("./routes/manage");
const projectRoutes = require("./routes/projects")
const taskRoutes = require("./routes/tasks");

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

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());

const sessionConfig = {
  secret: "keyboardcat",
  store: new MongoStore({
    mongoUrl: "mongodb://127.0.0.1:27017/i-techco",
  }),
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 3600 * 1000,
    maxAge: 7 * 24 * 3600 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(isLoggedIn);

app.use((req, res, next) => {
  res.locals.currentUrl = req.url;
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});
app.get("/", (req,res) => {
  res.redirect('/home');
})

app.use("/", authRoute);
app.get('/home', (req,res) => {
  res.render("main/home");
})


app.use("/users", hrRoutes);
app.use('/projects', projectRoutes);
app.use("/manage", manageRoutes);
app.use("/tasks", taskRoutes);

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  if (!err.message) err.message = "Oops, something went wrong!";
  res.status(status).render("error", { err });
});

const httpServer = createServer(app);
const io = new Server(httpServer, {

})
httpServer.listen(3000, () => {
  console.log("yay")
});
// app.listen(3000, () => {
//   console.log("Serving on port 3000");
// });
