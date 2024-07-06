const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  imageUrl: {
    type: String,
    required: false,
  },
});

const orderSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  customerName: {
    type: String,
    //required: is false because the data not sync with the other data
    required: false,
  },
  customerRegisterDate: {
    type: Date,
    required: true,
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  orderDate: {
    type: Date,
    //just add 3 hours to the current time
    default: new Date().toLocaleString("he-Il", { timeZone: "Asia/Jerusalem" }),
  },
});

const Order = mongoose.model("Order", orderSchema, "orders");

module.exports = Order;
