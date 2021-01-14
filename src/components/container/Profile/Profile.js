import React from "react";

import { withAuth0 } from "@auth0/auth0-react";

import PersonalInfo from "../../presentational/PersonalInfo/PersonalInfo";

import UserOrders from "../UserOrders/UserOrders";
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      picture: "",
      email: "",
      selector: "personalInfo",
    };
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
      } else {
        loginWithRedirect();
      }
    }, 10);
  }
  render() {
    //the conditional rendering is used here because takes few milliseconds for this.props.auth0 to be ready and if you try to destructure it before be ready you will got an
    if (
      this.state.name !== "" &&
      this.state.picture !== "" &&
      this.state.email !== ""
    ) {
      return (
        <div className="grid">
          <div className="row">
            <ul className="sidenav-m3">
              <li className="title">Profile Menu</li>
              <li
                className="active"
                onClick={() => this.setState({ selector: "personalInfo" })}
              >
                <a href="#">
                  <span className="mif-profile icon"></span>Personal data
                </a>
              </li>
              <li className="">
                <a href="#" id="anchor">
                  <span className="mif-cabinet icon"></span>Company info
                </a>
              </li>
              <li className="stick-left bg-green">
                <a className="dropdown-toggle" href="#">
                  <span className="mif-shopping-basket icon"></span>Orders
                </a>
                <ul
                  className="d-menu"
                  data-role="dropdown"
                  style={{ display: "none" }}
                >
                  <li
                    onClick={() => this.setState({ selector: "orderHistory" })}
                  >
                    <a href="#">
                      <span className="mif-vpn-lock icon"></span> Active Orders
                    </a>
                  </li>
                  <li className="disabled">
                    <a href="">Order History</a>
                  </li>
                </ul>
              </li>

              <li className="title">Help</li>
              <li>
                <a href="#">
                  <span className="mif-help icon"></span>Open a support ticket
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="mif-chat icon"></span>Contact Us
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="mif-question icon"></span>FAQ
                </a>
              </li>
            </ul>
            <div className="sidenav-content cell-9">
              {this.state.selector === "personalInfo" ? (
                <PersonalInfo
                  name={this.state.name}
                  email={this.state.email}
                  picture={this.state.picture}
                />
              ) : this.state.selector === "orderHistory" ? (
                <UserOrders />
              ) : null}
            </div>
          </div>
        </div>
      );
    } else {
      return <p>Loading...</p>;
    }
  }
}

export default withAuth0(Profile);
