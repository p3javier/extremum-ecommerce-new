import React from "react";

import { withAuth0 } from "@auth0/auth0-react";

import Axios from "axios";
class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subtotal: 0,
      products: [],
    };

    this.deleteProduct = this.deleteProduct.bind(this);
  }

  deleteProduct(sku) {
    const { user } = this.props.auth0;

    const id = user.sub;

    Axios.put("http://localhost:5000/api/users/cart/delete-product", {
      auth0_id: id,
      sku: sku,
    })
      .then((res) => {
        console.log("FORCE", res.data);
      })
      .catch((error) => console.log(error));
  }
  render() {
    const products = this.props.products;
    console.log("Products", products);
    const reducer = (accumulator, product) => {
      const productTotal = product.price * product.units;
      console.log("product", typeof productTotal);
      return accumulator + productTotal;
    };

    const total = products.reduce(reducer, 0);

    console.log("TOTAL", total);
    return (
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
              return (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price} €</td>
                  <td>
                    <input
                      type="text"
                      data-role="spinner"
                      defaultValue={product.units}
                      data-min-value="1"
                    />
                  </td>

                  <td className="text-center">
                    <span
                      className="mif-bin"
                      onClick={() => this.deleteProduct(product.sku)}
                    ></span>
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
    );
  }
}

export default withAuth0(CartSummary);
