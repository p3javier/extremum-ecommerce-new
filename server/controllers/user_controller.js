const User = require("../models/user");

const axios = require("axios");

module.exports = {
  readUserData(req, res) {
    //Get the session, for update the reducer.
    console.log("read activated");
    const { auth0_id } = req.body;
    console.log(auth0_id);
    User.findOne({ auth0_id: auth0_id }, (err, user) => {
      if (err) console.log("error-------", err);
      console.log(user.cart);

      res.send(user.cart);
    });
  },
  login(req, res) {
    //Now setup our auth post request to retrive accessTokenResposne.
    //Destruct the  data from  from auth0
    const { username, email, auth0_id } = req.body;
    console.log("user data--------", req.body);
    // res.status(200).json({message: 'mEssages'})
    User.findOne({ auth0_id: auth0_id }, (err, user) => {
      if (err) console.log("Login Error--------------", err);

      //If the user is undefined.
      if (!user) {
        //Create a new user.
        let newUser = new User({
          email: email,
          username: username,
          auth0_id: auth0_id,
          //For now set it to true, then after you login set it to false, so other users are not considered the admin.
          // is_admin: true
          is_admin: false,
          cart: "",
        });
        //Save the newUser instance to mongodb
        newUser.save();
      }
      res.redirect("/");
    });
  },
  logout(req, res) {
    //Destroy the session, which logout the user, since when the user session is undefined the redux also logout's
    // the user in the frontend.
    req.session.destroy();
    //Send a message informing  a user successfully logged out.
    res.status(200).json({ message: "Logout Successfully!" });
  },
  addProductToCart(req, res) {
    const { auth0_id, sku, units } = req.body;
    console.log("req.body", req.body);
    User.findOne({ auth0_id: auth0_id }, (err, user) => {
      if (err) console.log("error-------", err);
      //console.log("addProduct test");
      console.log("USER", user);
      let cartObj;
      if (user.cart === "") {
        cartObj = user.cart;
      } else {
        console.log(user.cart);
        cartObj = JSON.parse(user.cart);
      }
      //isSkuInCart returns a boolean value that is true if there is at least one unit of the product already in the cart
      const isSkuInCart = Object.keys(cartObj).includes(sku);

      let updatedCartObj;

      if (isSkuInCart) {
        updatedCartObj = { ...cartObj };
        updatedCartObj[sku] = cartObj[sku] + units;
      } else {
        updatedCartObj = { ...cartObj, [sku]: units };
      }
      const newCartState = JSON.stringify(updatedCartObj);

      user.cart = newCartState;

      user.save();
      res.data = "Product saved successfully!";
    });
    res.status(200).json({ message: "CHANGE Successfully!" });
  },
  deleteProductFromCart(req, res) {
    const { auth0_id, sku } = req.body;
    User.findOne({ auth0_id: auth0_id }, (err, user) => {
      if (err) console.log("error-------", err);

      let cartObj = JSON.parse(user.cart);

      //isSkuInCart returns a boolean value that is true if there is at least one unit of the product already in the cart
      const isSkuInCart = Object.keys(cartObj).includes(sku);
      console.log("SKU IN CART", isSkuInCart);
      let updatedCartObj;

      if (isSkuInCart) {
        updatedCartObj = { ...cartObj };
        delete updatedCartObj[sku];
      } else {
        console.log("error------", err);
      }

      const newCartState = JSON.stringify(updatedCartObj);

      user.cart = newCartState;

      user.save();
      res.data = "Product removed successfully!";
    });
  },
};
