const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const order = new Schema({
  auth0_id: String,
  email: String,
  create_time: String,
  paypal_order_id: String,
  payer_given_name: String,
  payer_surname: String,
  payer_email: String,
  currency: String,
  value: String,
  shipping_info: {
    postalCode: String,
    province: String,
    city: String,
    addressLine1: String,
    addressLine2: String,
    contactNumber: String,
    checkboxTC: Boolean,
  },
  cart: String,
  status: {
    type: String,
    enum: [
      "Cancelled",
      "Delivered",
      "In Transit",
      "Payment Due",
      "Problem",
      "Processing",
      "Returned",
    ],
  },
});

module.exports = mongoose.model("Order", order);
