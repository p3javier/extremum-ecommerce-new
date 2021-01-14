import React from "react";

class HomeCarousel extends React.Component {
  render() {
    return (
      <div className="cell-9">
        <div
          data-role="carousel"
          data-bullets-style="circle"
          data-controls-on-mouse="true"
          data-cls-controls="fg-white"
          data-control-next="<span class='mif-chevron-right fg-cyan'></span>"
          data-control-prev="<span class='mif-chevron-left fg-cyan'></span>"
        >
          <div
            className="slide"
            data-cover="https://s3.eu-central-1.amazonaws.com/extremum.images/portada-productos-min.webp"
          ></div>
          <div
            className="slide"
            data-cover="https://s3.eu-central-1.amazonaws.com/extremum.images/ppe.webp"
          ></div>
          <div
            className="slide"
            data-cover="https://s3.eu-central-1.amazonaws.com/extremum.images/warehouse.webp"
          ></div>
        </div>
      </div>
    );
  }
}

export default HomeCarousel;
