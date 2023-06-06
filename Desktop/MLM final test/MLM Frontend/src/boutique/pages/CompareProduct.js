import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Color from "../components/Color";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import Container from "../components/Container";

const CompareProduct = () => {
  return (
    <>
      <Meta title={"Comparer les produits"} />
      <BreadCrumb title="Comparer les produits" />
      <Container class1="compare-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="compare-product-card position-relative">
              <img
                src={watch}
                alt="cross"
                className="position-absolute cross img-fluid"
              />
              <div className="product-card-image">
                <img src="images/watch.jpg" alt="watch" />
              </div>
              <div className="compare-product-details">
                <h5 className="title">
                Honor T1 7.0 1 Go de RAM 8 Go de ROM 7 pouces avec tablette Wi-Fi + 3G
                </h5>
                <h6 className="price mb-3 mt-3">$ 100</h6>

                <div>
                  <div className="product-detail">
                  <h5>Marque :</h5>
                     <p>Havels</p>
                   </div>
                   <div className="product-detail">
                     <h5>Tapez :</h5>
                     <p>Regarder</p>
                   </div>
                   <div className="product-detail">
                     <h5>Disponibilité :</h5>
                     <p>En stock</p>
                   </div>
                   <div className="product-detail">
                     <h5>Couleur :</h5>
                    <Color />
                  </div>
                  <div className="product-detail">
                  <h5>Taille :</h5>
                     <div className="d-flex gap-10">
                       <p>S</p>
                       <p>M</p>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="compare-product-card position-relative">
              <img
                src={watch}
                alt="cross"
                className="position-absolute cross img-fluid"
              />
              <div className="product-card-image">
                <img src="images/watch.jpg" alt="watch" />
              </div>
              <div className="compare-product-details">
                <h5 className="title">
                Honor T1 7.0 1 Go de RAM 8 Go de ROM 7 pouces avec tablette Wi-Fi + 3G
                </h5>
                <h6 className="price mb-3 mt-3">$ 100</h6>

                <div>
                  <div className="product-detail">
                  <h5>Marque :</h5>
                     <p>Havels</p>
                   </div>
                   <div className="product-detail">
                     <h5>Tapez :</h5>
                     <p>Regarder</p>
                   </div>
                   <div className="product-detail">
                     <h5>Disponibilité :</h5>
                     <p>En stock</p>
                   </div>
                   <div className="product-detail">
                     <h5>Couleur :</h5>
                    <Color />
                  </div>
                  <div className="product-detail">
                  <h5>Taille :</h5>
                     <div className="d-flex gap-10">
                       <p>S</p>
                       <p>M</p>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CompareProduct;
