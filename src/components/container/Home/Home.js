import React from "react";
import Axios from "axios";

//Import the ProductCard that will be responsible for rendering each product.
import ProductCard from "../../presentational/ProductCard/ProductCard";

//Import the loader that is used when the data is being retrieved
import Loader from "../../presentational/Loader/Loader";

//Import the side-menu
import HomeMenu from "../../presentational/HomeMenu/HomeMenu";

import HomeCarousel from "../../presentational/HomeCarousel/HomeCarousel";

import HomeTabs from "../../presentational/HomeTabs/HomeTabs";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Have a products and loading
      //products holding all your products
      products: [],
      //loading for when loader is shown
      //set it true, and when data is retrieve set to false.
      loading: true,
    };
  }

  componentDidMount() {
    Axios.get("http://localhost:5000/api/products")
      .then((res) => {
        //Each .then must have a .catch to catch errors.
        //always have console.logs for debugging
        //console.log("res.data products-----------", res.data);
        /////Set your loading to false, and products to the res.data, since we are doing res.send in our backend.
        this.setState({ products: res.data, loading: false });
        //Each .then must have a .catch to catch errors.
      })
      .catch((err) => console.log("Read all products error--------", err));
  }

  render() {
    //Destruct the products, loading from state.
    const { products, loading } = this.state;
    //console.log(loading);
    if (!loading) {
      return (
        <div>
          <div className="container-fluid">
            <div className="grid">
              <div className="row">
                <HomeMenu />
                <HomeCarousel />
              </div>
              <HomeTabs />
            </div>
          </div>
          <div className="container pt-4">
            <h2>Product list</h2>
            <div className="home-products container">
              {/* If hte products have data return products else return nothing using terinary statement */}
              {products.length
                ? products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))
                : null}
            </div>
          </div>
        </div>
      );
    } else {
      return <Loader />;
    }
  }
}
