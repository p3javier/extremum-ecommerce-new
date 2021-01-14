import React from "react";

class HomeTabs extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="cell-12">
          <ul data-role="tabs" data-expand="true">
            <li>
              <a href="#_target_1">Who we are</a>
            </li>
            <li>
              <a href="#_target_2">Why us?</a>
            </li>
            <li>
              <a href="#_target_3">Links</a>
            </li>
          </ul>
          <div className="border bd-default no-border-top p-2">
            <div id="_target_1">
              <div className="row">
                <div className="cell-6">
                  <strong>Loren Ipsum</strong> es simplemente el texto de
                  relleno de las imprentas y archivos de texto. Lorem Ipsum ha
                  sido el texto de relleno estándar de las industrias desde el
                  año 1500, cuando un impresor (N. del T. persona que se dedica
                  a la imprenta) desconocido usó una galería de textos y los
                  mezcló de tal manera que logró hacer un libro de textos
                  especimen. No sólo sobrevivió 500 años, sino que tambien
                  ingresó como texto de relleno en documentos electrónicos,
                  quedando esencialmente igual al original. Fue popularizado en
                  los 60s con la creación de las hojas "Letraset", las cuales
                  contenian pasajes de Lorem Ipsum, y más recientemente con
                  software de autoedición, como por ejemplo Aldus PageMaker, el
                  cual incluye versiones de Lorem Ipsum.
                </div>
                <div className="cell-6">
                  <div className="img-container">
                    <img
                      src="https://s3.eu-central-1.amazonaws.com/extremum.images/professional-healthcare.webp"
                      alt="people"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div id="_target_2">
              The shield is a post-apocalyptic nanomachine.
            </div>
            <div id="_target_3">
              Cream soup is just not the same without basil
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeTabs;
