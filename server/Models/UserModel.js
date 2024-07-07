const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[A-Za-z]+$/i.test(v);
      },
      message: (props) => `${props.value} is not a valid first name!`,
    },
  },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[A-Za-z]+$/i.test(v);
      },
      message: (props) => `${props.value} is not a valid last name!`,
    },
  },
  username: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return !/[!@#$%^&*(),.?":{}|<>]/.test(v);
      },
      message: (props) => `${props.value} is not a valid username!`,
    },
  },
  password: {
    type: String,
    required: true,
  },

  allowOthersToSeePurchasedProducts: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  customerRegisterDate: {
    type: Date,
    default: new Date().toLocaleString("he-Il", { timeZone: "Asia/Jerusalem" }),
  },
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
