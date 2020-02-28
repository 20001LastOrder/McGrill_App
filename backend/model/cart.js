const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
  user_email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    unique: true
  },
  restaurant: {
    type: String,
    required: true
  },
  item_name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: false
  },
  amount: {
    type: Number,
    default: 0
  }
});

const CartItem = mongoose.model("CartItem", CartItemSchema);

module.exports = CartItem;
