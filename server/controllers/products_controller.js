//This will be used to perform full crud in the database.//Make sure to import outside of module.exports, since you want it globally accessible throughout file.
//const { response } = require("express");
const Product = require("../models/product");

module.exports = {
  //Method used to read all the products.
  readProducts(req, res) {
    Product.find({}).exec((err, products) => {
      //Always do a couple of console.logs just in case of errors.
      if (err) console.log("Get Product Mongoose Error------------------", err);
      //Always log the data you are returning from the database to check if you are receiving the right data.
      //console.log("products-------------", products);

      res.status(200).json(products);
    });
  },

  readProduct(req, res) {
    //Destruct the id from req.params
    const { id } = req.params;

    //Copy and paste of the product's id  to the url when testing.

    //Use findByIId to get a specific product.

    Product.findById(id).exec((err, product) => {
      if (err) console.log("Get Single Product Error-----------", err);

      //console.log("product---------", product);

      res.status(200).json({ product });
    });
  },
  findBySku(req, res) {
    const { sku } = req.params;
    console.log("sku", sku);
    Product.findOne({ sku: sku }, (err, product) => {
      if (err) console.log("Single Product By SKU Error-------", err);
      console.log("product", product);
      res.send(product);
    });
  },
};
