import React from "react";
import "./ProductCard.css";

import { withRouter } from "react-router-dom";

const ProductCard = (props) => {
  const { name, description, price, image, _id } = props;

  const textStyle = {
    fontFamily: "Times New Roman",
    fontSize: "large",
  };

  const linkFunc = (path) => {
    props.history.push(path);
  };

  return (
    <div
      className="card image-header d-flex"
      style={{ minHeight: 400, maxHeight: 401 }}
    >
      <div className="card-header fg-white place-left mh-100"></div>
      <img src={image} alt={name} style={{ maxHeight: 380 }} />
      <div>
        <div className="card-content p-4" style={textStyle}>
          <h4 id="title">{name}</h4>
          {description} Price: {price}.
        </div>
        <div className="card-footer place-bottom" id="view-product-details">
          <button
            className="button secondary"
            onClick={() => linkFunc(`/product/${_id}`)}
          >
            {/* onClick={() => this.linkFunc('')} */}
            <div id="link-button">View Product Details</div>
          </button>
          {/* <div>
                                <p>Seller rating: </p>
                                <input data-role="rating" data-value="3" />
                            </div>
                            */}
        </div>
      </div>
    </div>
  );
};

export default withRouter(ProductCard);
