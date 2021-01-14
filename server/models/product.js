const { urlencoded } = require("body-parser");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Need an id, name, description, price,
//Id is created by default in mongodb
const product = new Schema({
  //modificar Schema
  name: String,
  description: String,
  price: Number,
  gtin: String,
  brand: String,
  sku: String,
  image: String,
  url: String,
  availability: {
    type: String,
    enum: [
      "Discontinued",
      "InStock",
      "InStoreOnly",
      "LimitedAvailability",
      "OnlineOnly",
      "OutOfStock",
      "PreOrder",
      "PreSale",
      "SoldOut",
    ],
  },
});

//To create a model, use the name of the model, and the schema with the properties of the model
// that  wil be inserted to the  database.
module.exports = mongoose.model("Product", product);
