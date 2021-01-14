import React, { Component } from "react";

import { withAuth0 } from "@auth0/auth0-react";

import axios from "axios";

class UserOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      picture: "",
      email: "",
      orders: [],
    };

    this.handleOrders = this.handleOrders.bind(this);
  }

  handleOrders(auth0_id) {
    axios
      .post("http://localhost:5000/api/my-orders", {
        auth0_id: auth0_id,
      })
      .then((res) => {
        this.setState({ orders: res.data });
      });
  }

  componentDidMount() {
    setTimeout(() => {
      const { user, loginWithRedirect } = this.props.auth0;
      if (user) {
        const { name, picture, email } = user;
        this.setState({
          name: name,
          picture: picture,
          email: email,
        });
        this.handleOrders(user.sub);
      } else {
        loginWithRedirect();
      }
    }, 10);
  }

  render() {
    return (
      <div className="container">
        <h1>Order History</h1>
        <table className="table">
          <thead>
            <th>Order ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
            <th>Order Details</th>
          </thead>
          <tbody>
            {this.state.orders.length > 0
              ? this.state.orders.map((elem, index) => {
                  return (
                    <tr>
                      <td>{elem._id}</td>
                      <td>{elem.create_time.slice(0, 10)}</td>
                      <td>{elem.status}</td>
                      <td>{elem.value + " " + elem.currency}</td>
                      <td>
                        <button class="button info">View details</button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withAuth0(UserOrders);
