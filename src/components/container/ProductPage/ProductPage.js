import React from "react";

//import { withRouter } from "react-router-dom";

import Axios from "axios";

import "./ProductPage.css";

import { withAuth0 } from "@auth0/auth0-react";

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
    };
    this.addProduct = this.addProduct.bind(this);
  }
  addProduct(sku, units) {
    const { user } = this.props.auth0;

    const id = user.sub;

    Axios.put("http://localhost:5000/api/users/cart", {
      auth0_id: id,
      sku: sku,
      units: units,
    }).catch((error) => console.log(error));
  }
  componentDidMount() {
    let productPath = window.location.pathname;
    let productId = productPath.split("/");
    console.log("EL IDDD", productId[1]);
    Axios.get(`http://localhost:5000/api/products/${productId[2]}`)
      .then((res) => {
        //Each .then must have a .catch to catch errors.
        //always have console.logs for debugging
        console.log("res.data products-----------", res.data);
        /////Set your loading to false, and products to the res.data, since we are doing res.send in our backend.
        this.setState({ product: res.data.product });
        //Each .then must have a .catch to catch errors.
      })
      .catch((err) => console.log("Read all products error--------", err));
  }

  /** const { name, description, price, image, brand, sku } = {
    ...products.product,
  }; */
  render() {
    console.log("ESTE ES EL LOG", this.state.product);
    const { name, description, price, image, brand, sku } = this.state.product;
    return (
      <div>
        <div class="row border-bottom bd-lightGray m-3">
          <div class="cell-md-4 d-flex flex-align-center"></div>

          <div class="cell-md-8 d-flex flex-justify-center flex-justify-end-md flex-align-center">
            <ul class="breadcrumbs bg-transparent">
              <li class="page-item">
                <a href="#1" class="page-link">
                  <span class="mif-meter"></span>
                </a>
              </li>
              <li class="page-item">
                <a href="#2" class="page-link">
                  eCommerce
                </a>
              </li>
              <li class="page-item">
                <a href="#3" class="page-link">
                  Product Details
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="m-3">
          <div class="product-card">
            <div class="row">
              <div class="cell-lg-3 cell-md-5">
                <div class="product-image p-4">
                  <img src={image} alt="" class="main-image" />{" "}
                  {/* src={image} */}
                  <ul class="thumb-list">
                    <li class="thumb active">
                      <img src="images/product_1.png" alt="" />
                    </li>
                    <li class="thumb">
                      <img src="images/product_2.png" alt="" />
                    </li>
                    <li class="thumb">
                      <img src="images/product_3.png" alt="" />
                    </li>
                  </ul>
                </div>
              </div>

              <div class="cell-lg-5 cell-md-7 p-4">
                <div class="product-title">
                  <h3>{name}</h3>
                </div>

                <div class="product-price">
                  <span class="current-price">
                    <h4>Price: ${price}</h4>
                  </span>
                </div>

                <div class="mt-6 mb-2 p-2">{description}</div>

                <div class="product-actions">
                  <input
                    type="number"
                    data-role="spinner"
                    data-min-value="1"
                    value="1"
                  />
                </div>
                <div class="product-actions">
                  <button
                    class="button alert large"
                    onClick={() => this.addProduct(sku, 1)}
                  >
                    Buy Now
                  </button>
                  <button class="button success large ml-1 disabled">
                    Add To Cart
                  </button>
                </div>
              </div>
              <div class="cell-lg-4 cell-md-12 p-4 pr-8 border-left bd-default">
                <div id="qrcode" class="place-right"></div>
                <table class="table w-auto border border-4 bd-default compact">
                  <tbody>
                    <tr>
                      <td>Vendor:</td>
                      <td class="text-bold">{brand}</td>
                    </tr>
                    <tr>
                      <td>Type:</td>
                      <td class="text-bold"> </td>
                    </tr>
                    <tr>
                      <td>SKU:</td>
                      <td class="text-bold">{sku}</td>
                    </tr>
                  </tbody>
                </table>

                <hr class="bg-lightGray" />

                <table class="table compact">
                  <tbody>
                    <tr>
                      <td style={{ width: 100 }}>
                        <img
                          src="https://s3.eu-central-1.amazonaws.com/extremum.images/30days.webp"
                          style={{ width: 80 }}
                          alt=""
                        />
                      </td>
                      <td>
                        <h2>30 DAYS</h2>
                        <div>Money back guarantee</div>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: 100 }}>
                        <img
                          src="https://s3.eu-central-1.amazonaws.com/extremum.images/100-satisfaction-guarantee.webp"
                          style={{ width: 80 }}
                          alt=""
                        />
                      </td>
                      <td>
                        <h2>100 PERCENT</h2>
                        <div>Money back guarantee</div>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: 100 }}>
                        <img
                          src="https://s3.eu-central-1.amazonaws.com/extremum.images/ssl-certificate.webp"
                          style={{ height: 80 }}
                          alt=""
                        />
                      </td>
                      <td>
                        <h2>SSL SECURED</h2>
                        <div>All transactions is secured</div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <hr class="bg-lightGray" />

                <div class="mt-4 d-flex flex-justify-center"></div>
              </div>
            </div>
          </div>

          <div class="product-info">
            <ul
              class="tabs"
              data-role="tabs"
              data-expand-point="md"
              data-tabs-type="pills"
            >
              <li>
                <a href="#product-description">Description</a>
              </li>
              <li>
                <a href="#product-terms">Terms</a>
              </li>
            </ul>
            <hr />
            <div class="tabs-content">
              <div id="product-description" class="p-4">
                <h2>Advanced Features</h2>

                <p>
                  Get the latest fashion tips and outfit ideas from your
                  favorite celebrities and designers. Click through runway and
                  front row photos from fashion week shows in New York, London,
                  Paris, and Milan. Plus: browse key accessories like bags,
                  shoes, and sunglasses, must-have denim looks, and more top
                  fashion trends.
                </p>

                <ul class="mt-4">
                  <li>C'est magnifique! How to look French when you're not</li>
                  <li>The best nutty fragrances</li>
                  <li>How to wear: matinee glamour for the festive season</li>
                  <li>
                    From ginger to Michael Bublé: this week’s fashion trends
                  </li>
                  <li>Fashion designer Raf Simons leaves Calvin Klein</li>
                  <li>
                    From drab to fab: the six quickest ways to get Christmas
                    party-ready
                  </li>
                  <li>The best beauty stocking fillers for £10 or less</li>
                  <li>
                    Why the humble hair clip is this season's must-have
                    accessory
                  </li>
                  <li>How to wear... utilitarian</li>
                  <li>Judy Blame remembered by Boy George</li>
                  <li>Fashion Shopify Theme</li>
                </ul>

                <p>
                  Early Western travelers, traveling whether to India, Persia,
                  Turkey or China, would frequently remark on the absence of
                  change in fashion in those countries. The Japanese shōgun's
                  secretary bragged (not completely accurately) to a Spanish
                  visitor in 1609 that Japanese clothing had not changed in over
                  a thousand years. However, there is considerable evidence in
                  Ming China of rapidly changing fashions in Chinese clothing.
                  Changes in costume often took place at times of economic or
                  social change, as occurred in ancient Rome and the medieval
                  Caliphate, followed by a long period without major changes. In
                  8th-century Moorish Spain, the musician Ziryab introduced to
                  Córdoba sophisticated clothing-styles based on seasonal and
                  daily fashions from his native Baghdad, modified by his own
                  inspiration. Similar changes in fashion occurred in the 11th
                  century in the Middle East following the arrival of the Turks,
                  who introduced clothing styles from Central Asia and the Far
                  East.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth0(ProductPage);
