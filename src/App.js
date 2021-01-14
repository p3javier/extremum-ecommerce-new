import React, { Component } from "react";

import Navbar from "./components/container/Navbar/Navbar";
//Configure the routes by importing the default export from the routes.js file,
//Then delete the Home component, and put the routes underneath the nav.
import routes from "./routes";

import Footer from "./components/container/Footer/Footer";
//import withROuter since you are using redux, and you want your app to have access to this.props.history.
import { withRouter } from "react-router-dom";
//Import connect from redux to have access your initialState in the reducer, and all it's actions.
import { connect } from "react-redux";

//import axios to get your user session from your backend.
import axios from "axios";

import { withAuth0 } from "@auth0/auth0-react";
class App extends Component {
  //In it's componentDidMount  get the session, and if it has data set your intialState user to it.
  componentDidMount() {
    setTimeout(() => {
      const { user, isAuthenticated, isLoading } = this.props.auth0;
      console.log("isLoading", isLoading, isAuthenticated);
      if (isAuthenticated) {
        //console.log("TEST", user);

        if (user) {
          //Dispatch the login function with the user data.
          const { email, sub, nickname } = user;
          return axios.post("http://localhost:5000/api/users", {
            email: email,
            auth0_id: sub,
            username: nickname,
          });
          //Else logout the user from the intialState.
        }
      }
    }, 800);
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        {routes}
        <Footer />
      </div>
    );
  }
}

//THen connect your app to your reducer.
export default withAuth0(withRouter(connect()(App)));
