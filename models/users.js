const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const contactSchema = new Schema({
  email: {
    type: String,
  },
  phone: {
    type: String,
    default: '0000000000',
  },
})
const piSchema = new Schema({
  name:{
    surname: {
      type: String,
      default: 'User'
    },
    name: {
      type: String,
      default: ''
    }
  },
  dob: {
    type: String,
    default: ''
  },
  gender: {
    type: String,
    default: ''
  },
  location: {
    city: {
      type: String,
      default: ''
    },
    district: {
      type: String,
      default: ''
    },
    zipcode: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
  },
})
piSchema.virtual("fullname").get(function() {
  return this.name.surname + ' ' + this.name.name;
})
piSchema.virtual("fullLocation").get(function() {
  return this.location.address + ', ' + this.location.district + ', ' + this.location.city;
})
const UserSchema = new Schema({
  contacts: contactSchema,
  pi: piSchema,
  initDate:{
    type: String,
    immutable: true,
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
  },
  username: {
    type: String,
    required: true,
    unique: true,
    immutable: true,
    // Make the field read-only by setting a getter function that always returns the same value
  }
});

UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", UserSchema);
module.exports = User;
