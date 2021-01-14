import React from "react";

//Define sample data for now to display in your cart.

import { withAuth0 } from "@auth0/auth0-react";

import axios from "axios";
//import { response } from "express";

//import CartSummary from "../../presentational/CartSummary/CartSummary";

import ShippingForm from "../../presentational/ShippingForm/ShippingForm";

import Spinner from "../../presentational/Spinner/Spinner";
class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: {},
      shippingForm: false,
      paymentAmount: 0,
      values: new Map(),
      test: 0,
    };

    this.handleProducts = this.handleProducts.bind(this);
    this.loadShippingForm = this.loadShippingForm.bind(this);
    this.unloadShippingForm = this.unloadShippingForm.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }

  addProduct(sku, units) {
    const { user } = this.props.auth0;
    const id = user.sub;
    console.log("ANTES");
    axios
      .put("http://localhost:5000/api/users/cart", {
        auth0_id: id,
        sku: sku,
        units: units,
      })
      .then((res) => {
        console.log("QUE ES LO QUE PASA ?", res);
        const updateUnits = this.state.values.get(sku) + 1;
        console.log("updateUnits", this.state.values);
        let newMap = new Map(this.state.values);
        newMap.set(sku, updateUnits);
        console.log("newMap", newMap);
        const theValue = this.state.test;
        this.setState((prevState) => {
          const nextValues = new Map(prevState.values);
          const nextEntry = {
            ...nextValues.get(sku),
            [sku]: updateUnits,
          };
          return { values: nextValues.set(sku, updateUnits) };
        });
        console.log("UPDATED STATE", this.state);
      })
      .catch((error) => console.log(error));
  }

  loadShippingForm() {
    this.setState({ shippingForm: true });
  }

  unloadShippingForm() {
    this.setState({ shippingForm: false });
  }
  //Function that allows retrieve the products from the database given a SKU
  handleProducts() {
    const cartArray = [Object.entries(this.state.cart)];
    const test = cartArray[0];
    //console.log("EL TEST", test);
    test.forEach((element, i) => {
      //console.log("element", element);
      //console.log("i", i);
      const currentSku = element[0];
      //console.log(currentSku);
      axios
        .get(`http://localhost:5000/api/products/sku/${currentSku}`)
        .then((response) => {
          //console.log("respones", response.data);
          let productsCopy = [...this.state.products];
          //console.log("units", this.state.cart[currentSku]);
          response.data["units"] = this.state.cart[currentSku]; //this line  is to associate the number of units with the  product in matter.
          productsCopy.push(response.data);
          this.setState({ products: productsCopy });
          //console.log("state", this.state.products);
        });
    });
  }

  componentDidMount() {
    setTimeout(() => {
      const { user, isAuthenticated, isLoading } = this.props.auth0;
      //console.log("isLoading", isLoading, isAuthenticated);
      if (isAuthenticated) {
        //console.log("TEST", user);

        if (user) {
          //Dispatch the login function with the user data.
          const { sub } = user;
          return axios
            .post("http://localhost:5000/api/users/id", {
              auth0_id: sub,
            })
            .then(
              (response) => {
                //console.log("cart response");
                //console.log(typeof response.data);
                //console.log(response.data);

                this.setState({ cart: response.data });
                this.handleProducts();
              },
              (error) => {
                console.log(error);
              }
            );
          //Else logout the user from the intialState.
        }
      }
    }, 800);
  }

  componentDidUpdate() {
    console.log("STATE", this.state.shippingForm);
    console.log(this.state);
  }
  deleteProduct(sku) {
    const { user } = this.props.auth0;

    const id = user.sub;

    axios
      .put("http://localhost:5000/api/users/cart/delete-product", {
        auth0_id: id,
        sku: sku,
      })
      .then((res) => {
        console.log("FORCE", res.data);
      })
      .catch((error) => console.log(error));
  }

  render() {
    const {
      user,
      isAuthenticated,
      isLoading,
      loginWithRedirect,
    } = this.props.auth0;

    const products = this.state.products;
    //console.log("Products", products);
    const reducer = (accumulator, product) => {
      const productTotal = product.price * product.units;
      //console.log("product", typeof productTotal);
      return accumulator + productTotal;
    };

    const total = products.reduce(reducer, 0);

    //console.log("TOTAL", total);

    return this.state.shippingForm ? (
      <ShippingForm
        action={this.unloadShippingForm}
        amount={this.state.paymentAmount}
        cart={this.state.cart}
      />
    ) : (
      <div className="container">
        <div className="grid">
          {isLoading ? (
            <h3>Loading....</h3>
          ) : !isAuthenticated ? (
            loginWithRedirect()
          ) : this.state.products.length > 0 ? (
            <>
              <div className="row">
                <h2>Your Cart!</h2>
              </div>
              <div className="row">
                <div id="order-products">
                  <table className="table striped">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th className="text-center">Quantity</th>

                        <th>Delete</th>
                        <th className="text-right">Subtotal</th>
                      </tr>
                    </thead>

                    <tbody>
                      {products.map((product) => {
                        const subtotal = product.price * product.units;
                        //const prevState = this.state.subtotal;
                        //const newState = prevState + subtotal;
                        //this.setState({ subtotal: newState });
                        const spinnerKey =
                          product.id + product.units.toString();

                        this.state.values.set(product.sku, product.units);
                        return (
                          <tr key={spinnerKey}>
                            <td>{product.name}</td>
                            <td>{product.price} €</td>
                            <td>
                              <div className="react-spinner">
                                <input
                                  type="text"
                                  defaultValue={this.state.values
                                    .get(product.sku)
                                    .toString()}
                                  className="react-original-input"
                                />
                                <button
                                  type="button"
                                  className="react-spinner-button-plus"
                                  onClick={() =>
                                    this.addProduct(product.sku, 1)
                                  }
                                >
                                  <span className="default-icon-plus"></span>
                                </button>
                                <button
                                  type="button"
                                  className="react-spinner-button-minus"
                                  onClick={() =>
                                    this.addProduct(product.sku, -1)
                                  }
                                >
                                  <span className="default-icon-minus"></span>
                                </button>
                              </div>
                            </td>

                            <td className="text-center">
                              <div
                                onClick={() => {
                                  this.deleteProduct(product.sku);
                                  window.location.reload();
                                }}
                              >
                                <span className="mif-bin"></span>
                              </div>
                            </td>
                            <td className="text-right">{subtotal}</td>
                          </tr>
                        );
                      })}
                    </tbody>

                    <thead>
                      <tr className="border-top bd-default">
                        <td colSpan="4" className="text-right">
                          Subtotal
                        </td>
                        <td className="text-right">{total} €</td>
                      </tr>
                      <tr>
                        <td colSpan="4" className="text-right">
                          Taxes
                        </td>
                        <td className="text-right">0 €</td>
                      </tr>
                      <tr className="border-top bd-default">
                        <td colSpan="4" className="text-right text-leader">
                          Total
                        </td>
                        <td className="text-leader text-right">{total} €</td>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div>Your cart is empty</div>
          )}
          <div className="row">
            <div className="cell-3 offset-5">
              {this.state.products.length > 0 ? (
                <button
                  className="button primary"
                  onClick={() => {
                    this.setState({ paymentAmount: total });
                    this.loadShippingForm();
                  }}
                >
                  Shipping{" "}
                </button>
              ) : (
                <button className="button primary disabled">
                  Shipping <span className="chevron-right"></span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth0(Cart);
