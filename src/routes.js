//Need to import react because the Route itself is a component.
import React from "react";
//Import the Route, and Switch Component used for defining your routes.
//Route is the route itself which can accept render props, but for the purpose of this tutorial we used the component and path prop.
//Switch responsible for directing to first child that matches their respective route.
import { Route, Switch } from "react-router-dom";
//Now import the components you'll pass as props.
import Home from "./components/container/Home/Home";
import About from "./components/container/About/About";
import Cart from "./components/container/Cart/Cart";
import Profile from "./components/container/Profile/Profile";
import Contact from "./components/container/Contact/Contact";
import ProductPage from "./components/container/ProductPage/ProductPage";
//import PaymentGateway from "./components/container/PaymentGateway/PaymentGateway";

import UserOrders from "./components/container/UserOrders/UserOrders";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/cart" component={Cart} />
    <Route path="/profile" component={Profile} />
    <Route path="/contact" component={Contact} />
    <Route path="/product/:id">
      <ProductPage />
    </Route>
    <Route path="/my-orders" component={UserOrders} />
  </Switch>
);
