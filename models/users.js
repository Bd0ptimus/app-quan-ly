const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
  },
  role: {
    type: String,
    enum : ['admin', 'hr', 'employee'],
    default: 'employee',
  },
});

UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", UserSchema);
module.exports = User;
