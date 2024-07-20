const mongoose = require("mongoose");
const { Schema } = mongoose;
const productBoughtSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

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
    unique: true,
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
    validate: {
      validator: function (v) {
        //at least one lowercase letter, one uppercase letter, one number, and be at least 6 characters long
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid password!`,
    },
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
  productsBought: [productBoughtSchema],
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
