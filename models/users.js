const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  contacts: {
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  pi: {
    name:{
      surname: {
        type: String,
      },
      name: {
        type: String,
      }
    },
    dob: {
      type: String,
    },
    gender: {
      type: String,
    },
    location: {
      city: {
        type: String,
      },
      district: {
        type: String,
      },
      address: {
        type: String,
      },
    },
  },
  work: {
    position: {
      type: String,
      default: "nv",
      enum: ["admin", "hr", "nv"],
    },
    active: {
      type: Boolean,
      default: true,
    },
    job: {
      type: String,
      enum: ["ft", "pt"],
    },
  }
});

UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", UserSchema);
module.exports = User;
