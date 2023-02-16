const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    default: 'employee',
    enum : ['admin', 'hr', 'nv'],
  },
});

UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", UserSchema);
module.exports = User;
