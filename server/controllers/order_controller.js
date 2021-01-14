const Order = require("../models/order");

module.exports = {
  createOrder(req, res) {
    const {
      auth0_id,
      email,
      cart,
      create_time,
      paypal_order_id,
      payer_given_name,
      payer_surname,
      payer_email,
      currency,
      value,
      shipping_info,
    } = req.body;
    //console.log(orderObject);
    let newOrder = new Order({
      auth0_id: auth0_id,
      email: email,
      create_time: create_time,
      paypal_order_id: paypal_order_id,
      payer_given_name: payer_given_name,
      payer_surname: payer_surname,
      payer_email: payer_email,
      currency: currency,
      value: value,
      shipping_info: {
        postalCode: shipping_info.postalCode,
        province: shipping_info.province,
        city: shipping_info.city,
        addressLine1: shipping_info.addressLine1,
        addressLine2: shipping_info.addressLine2,
        contactNumber: shipping_info.contactNumber,
        checkboxTC: true,
      },
      cart: cart,
    });

    newOrder.save();

    res.status(200).json({ order: newOrder });
  },
  readOrders(req, res) {
    const { auth0_id } = req.body;
    Order.find({ auth0_id: auth0_id }, (err, docs) => {
      res.send(docs);
    });
  },
};
