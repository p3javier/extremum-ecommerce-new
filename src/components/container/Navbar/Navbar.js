import React from "react";
//import withRouter so, you can access this.props.history
import { withRouter, Link } from "react-router-dom";
//import connect to connect your component to the store, and specify what you want from the initialState in the reducer.
import "./Navbar.css";

import { withAuth0 } from "@auth0/auth0-react";

export class Navbar extends React.Component {
  linkFunc(path) {
    this.props.history.push(path);
  }
  render() {
    const { loginWithRedirect } = this.props.auth0;
    const { logout } = this.props.auth0;

    const { user, isAuthenticated, isLoading } = this.props.auth0;
    //setTimeout(console.log("isAuthenticated", isAuthenticated), 600);
    return (
      <div>
        <div style={{ height: 62, position: "relative" }}></div>
        <div data-role="appbar" data-expand-point="md">
          <Link to="/" className="brand no-hover">
            <span style={{ width: 155 }}>
              <div className="img-container">
                <img
                  alt=""
                  src="https://s3.eu-central-1.amazonaws.com/extremum.images/logo1000x500.webp"
                />
              </div>
            </span>
          </Link>

          <ul id="navbar" className="app-bar-menu large">
            <li onClick={() => this.linkFunc("/")}>Home</li>

            <li onClick={() => this.linkFunc("/about")}>About</li>
            <li onClick={() => this.linkFunc("/contact")}>Contact</li>
            {isLoading ? (
              <li></li>
            ) : isAuthenticated ? (
              <li onClick={() => this.linkFunc("/cart")}>
                <span className="mif-cart icon"></span> Cart
              </li>
            ) : (
              <li onClick={() => loginWithRedirect()}>
                <span className="mif-cart icon"></span> Cart
              </li>
            )}
            {isLoading ? (
              <li></li>
            ) : isAuthenticated ? (
              <li onClick={() => this.linkFunc("/my-orders")}>My orders</li>
            ) : (
              <li onClick={() => loginWithRedirect()}>My orders</li>
            )}
            {isLoading ? (
              <li></li>
            ) : isAuthenticated ? (
              <li onClick={() => this.linkFunc("/profile")}>Profile</li>
            ) : (
              <li onClick={() => loginWithRedirect()}>Profile</li>
            )}

            {isLoading ? (
              <p> is loading</p>
            ) : isAuthenticated ? (
              <li>
                <p>Logged as: {user.given_name}</p>
              </li>
            ) : (
              <li></li>
            )}

            {isLoading ? (
              <p> is loading</p>
            ) : isAuthenticated ? (
              <li>
                <button
                  className="button dark"
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  logout
                </button>
              </li>
            ) : (
              <li>
                <button
                  className="button dark"
                  onClick={() => loginWithRedirect()}
                >
                  login
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

//Then wrap our Component with the HOC, and the connect double invoked.
export default withRouter(withAuth0(Navbar));
