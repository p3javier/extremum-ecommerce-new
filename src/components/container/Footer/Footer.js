import React from "react";

import { withRouter } from "react-router-dom";

import "./footer.css";

class Footer extends React.Component {
  linkFunc(path) {
    this.props.history.push(path);
  }
  render() {
    return (
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6 links footer_block">
              <div className="footer_about_us">
                <address className="logo_footer">
                  <a href="https://pantallasfaciales.com">
                    <img
                      src="https://s3.eu-central-1.amazonaws.com/extremum.images/logo-extremum-protection-web.webp"
                      alt="logo-extremum-protection-footer"
                      width="300"
                      height="100"
                    />
                  </a>
                </address>
                <address className="desc_info">
                  C/Cruz Conde 28, 2ºD - 14001 - Córdoba (España)
                </address>
                <address className="desc_info">
                  (+34) 644964858 - 957842223
                </address>
                <address className="desc_info">
                  Administracion@pantallasfaciales.com
                </address>
              </div>
            </div>
            <div className="col-md-2 links footer_block">
              <div
                className="title clearfix hidden-md-up"
                data-target="#footer_3"
                data-toggle="collapse"
              >
                <h4>Information</h4>

                <ul id="footer_list_1" className="unstyled-list">
                  <li onClick={() => this.linkFunc("/contact")}>Contact Us</li>
                  <li>Terms & Conditions</li>
                  <li>Payments options</li>
                  <li>Shipping & Returns</li>
                </ul>
              </div>
            </div>
            <div className="col-md-2 links footer_block">
              <div className="social_follow">
                <h4>Redes Sociales:</h4>
                <ul id="footer_list_2" className="unstyled-list">
                  <li className="facebook">Facebook</li>
                  <li className="instagram">Instagram</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-9 links footer_block">
              <p id="paragraph-1">
                <a href="https://pantallasfaciales.com/es/content/12-formas-de-pago">
                  <img
                    src="https://s3.eu-central-1.amazonaws.com/extremum.images/formas-pago-footer-spain.webp"
                    alt="Formas de Pago"
                    width="586"
                    height="55"
                  />
                </a>
              </p>
            </div>

            <div className="bottom-inner">
              <div className="col-md-12 links footer_block">
                <div className="copyright">Extremum Events © 2020</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Footer);
