import React, { Component } from "react";

class PersonalInfo extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
        <img src={this.props.picture} alt={this.props.name} />
        <h3>{this.props.email}</h3>
      </div>
    );
  }
}

export default PersonalInfo;
