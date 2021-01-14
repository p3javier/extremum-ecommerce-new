import React from "react";

class HomeMenu extends React.Component {
  render() {
    return (
      <div className="cell-3">
        <ul className="v-menu">
          <li className="menu-title">Products</li>
          <li>
            <a href="#a">
              <span className="mif-medkit icon"></span>
              Healthcare
            </a>
          </li>
          <li>
            <a href="#b">
              <span className="mif-air icon"></span>
              Air filtering
            </a>
          </li>
          <li>
            <a href="#c">
              <span className="mif-lab icon"></span>
              Lab equipment
            </a>
          </li>
          <li className="menu-title">Support</li>
          <li>
            <a href="#d">Support Centre</a>
          </li>
          {/*
                        <li className="menu-title">Services</li>
                        <li><span className="mif-justice icon"></span> Conflict resolution</li>
                        <li><span className="mif-fingerprint icon"></span> Seller validation</li>
                        */}
        </ul>
      </div>
    );
  }
}

export default HomeMenu;
