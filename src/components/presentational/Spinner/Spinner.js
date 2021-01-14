import React, { Component } from "react";

import "./Spinner.css";

import axios from "axios";

class Spinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };

    this.addProduct = this.addProduct.bind(this);
  }

  addProduct(sku, units) {
    const id = this.props.auth0_id;
    console.log("BEFORE");
    axios
      .put("http://localhost:5000/api/users/cart", {
        auth0_id: id,
        sku: sku,
        units: units,
      })
      .catch((error) => console.log(error));
  }

  render() {
    console.log("default", typeof this.state.value);
    return (
      <div className="react-spinner">
        <input
          type="text"
          value={this.state.value}
          className="react-original-input"
        />
        <button
          type="button"
          className="react-spinner-button-plus"
          onClick={this.addProduct(this.props.sku, 1)}
        >
          <span className="default-icon-plus"></span>
        </button>
        <button
          type="button"
          className="react-spinner-button-minus"
          onClick={this.addProduct(this.props.sku, -1)}
        >
          <span className="default-icon-minus"></span>
        </button>
      </div>
    );
  }
}

export default Spinner;
