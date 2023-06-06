import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook, BsWhatsapp, BsYoutube, BsInstagram } from "react-icons/bs";
import newsletter from "../images/newsletter.png";
const Footer = () => {
  return (
    <>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-4">Liens rapides</h4>
               <div className="footer-link d-flex flex-column">
                 <Link className="text-white py-2 mb-1">Ordinateurs portables</Link>
                 <Link className="text-white py-2 mb-1">Écouteurs</Link>
                 <Link className="text-white py-2 mb-1">Comprimés</Link>
                 <Link className="text-white py-2 mb-1">Regarder</Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Information</h4>
              <div className="footer-link d-flex flex-column">
                <Link to="/privacy-policy" className="text-white py-2 mb-1">
                  Politique de confidentialité
                </Link>
                <Link to="/refund-policy" className="text-white py-2 mb-1">
                  Politique de remboursement
                </Link>
                <Link to="/shipping-policy" className="text-white py-2 mb-1">
                  Politique d'expédition
                </Link>
                <Link to="/term-conditions" className="text-white py-2 mb-1">
                  Terms & Conditions
                </Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Compte</h4>
              <div className="footer-link d-flex flex-column">
                <Link className="text-white py-2 mb-1">À propos de nous</Link>
                 <Link className="text-white py-2 mb-1">FAQ</Link>
                 <Link className="text-white py-2 mb-1">Contact</Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Contactez-nous</h4>
              <div>
                <address className="text-white fs-6">
           Avenue de la République <br /> 5000 Monastir, Tunisie
                </address>
                <a
                  href="tel:+216 25432098"
                  className="mt-3 d-block mb-1 text-white"
                >
                  +216 25432098
                </a>
                <a
                  href="mailto:developper2@gmail.com"
                  className="mt-2 d-block mb-0 text-white"
                >
                  contact@tanit-it.com
                </a>
                <div className="social_icons d-flex align-items-center gap-30 mt-4">
                  <a className="text-white" href="#">
                    <BsFacebook className="fs-4" />
                  </a>
                  <a className="text-white" href="#">
                    <BsInstagram className="fs-4" />
                  </a>
                  <a className="text-white" href="#">
                    <BsWhatsapp className="fs-4" />
                  </a>
                  <a className="text-white" href="#">
                    <BsYoutube className="fs-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()}: Propulsé par les développeurs TANIT
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
