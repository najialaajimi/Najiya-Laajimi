import React, { useEffect } from "react";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import { services } from "../utils/Data";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import moment from "moment/moment";
import { getAllProducts } from "../features/Product/productSlice";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import watch2 from "../images/watch-1.avif";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { MdOutlineHowToVote ,MdOutlineFavoriteBorder} from "react-icons/md"
import { addToWishlist } from "../features/Product/productSlice";
import Carousel from 'react-bootstrap/Carousel';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogState = useSelector((state) => state?.blogweb?.blog);
  const productState = useSelector((state) => state.productweb.product);

  useEffect(() => {
    getBlog();
    getProducts();
  }, []);
  const getBlog = () => {
    dispatch(getAllBlogs());
  };
  const getProducts = () => {
    dispatch(getAllProducts());
  };
  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };
  return (
    <>
      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-4">
            <div className=" flex-wrap justify-content-between align-items-center">
              <div className="small-banner position-relative mb-3">
                <img
                  src="/images/catbanner-01.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Meilleur saké</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p>
                    À partir de 999,000 DT <br /> ou 41,620 DT/mois.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative ">
                <img
                  src="/images/catbanner-03.jpg"
                  className="img-fluid rounded-3 color"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>NOUVEL ARRIVAGE</h4>
                  <h5>Mais iPad Air</h5>
                  <p>
                    À partir de 999,000 DT <br /> ou 41,620 DT/mois.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="main-banner position-relative ">
              <img
                src="/images/main-banner.jpg"
                className="img-fluid rounded-3"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute">
                <h4>SURALIMENTÉ POUR LES PROS.</h4>
                <h5>iPad S13+ Pro.</h5>
                <p>À partir de 999,000 DT ou 41,620 DT/mois.</p>
                <Link className="button">ACHETER MAINTENANT</Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between">
              {services?.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={j}>
                    <img src={i.images} alt="services" />
                    <div>
                      <h6>{i.title}</h6>
                      <p className="mb-0">{i.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
      <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="famous-card position-relative">
                <img
                  src="images/montre.jpg"
                  className="img-fluid"
                  alt="montre"
                />
                <div className="famous-content position-absolute">
                  <h5>Grand écran</h5>
                  <h6>Série de montres intelligentes 7</h6>
                  <p>
                    À partir de 399,000 DT ou 16,620 DT/mois. pendant 24 mois.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative">
                <img
                  src="images/ecran.jpg"
                  className="img-fluid"
                  alt="famous"
                />
                <div className="famous-content position-absolute">
                  <h5 className="text-dark">Affichage Studio</h5>
                  <h6 className="text-dark">600 nits de luminosité.</h6>
                  <p className="text-dark">Écran Retina 5k de 27 pouces</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative">
                <img
                  src="images/iphone.jpg"
                  className="img-fluid"
                  alt="iphone"
                />
                <div className="famous-content position-absolute">
                  <h5>Smartphones</h5>
                  <h6>Smartphone 13 Pro</h6>
                  <p>
                    Maintenant en vert À partir de 999,00 DT ou 41,62 DT/mois.
                    pour 24 mois. Noeud de pied*
                  </p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative">
                <img
                  src="images/haut-1.jpg"
                  className="img-fluid"
                  alt="famous"
                />
                <div className="famous-content position-absolute">
                  <h5 className="text-dark">Haut-parleurs pour la maison</h5>
                  <h6 className="text-dark">Un son qui remplit la pièce.</h6>
                  <p className="text-dark">
                    Rom 699 DT ou 116,58 DT/mois. pendant 12 mois*
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading text-center">
              Collection en vedette
            </h3>
          </div>
          {productState &&
            Object.values(
              productState.reduce((categories, product) => {
                if (product.tags === "featured") {
                  if (!categories[product.category]) {
                    categories[product.category] = product;
                  }
                }
                return categories;
              }, {})
            ).map((item, index) => (
              <div key={index} className={"col-3"}>
                <div className="product-card position-relative">
                  <div className="wishlist-icon position-absolute">
                    <button className="border-0 bg-transparent">
                    <MdOutlineHowToVote className=" mt-2 fs-4" />
                    <MdOutlineFavoriteBorder onClick={()=>{addToWish(item?._id);}} className=" mt-2 fs-4" />
                    </button>
                  </div>
                  <div className="product-image">
                    <img
                      src={item?.photo?.[0]?.url}
                      className="img-fluid mx-auto"
                      width={220}
                      alt="product image"
                    />
                  </div>
                  <div className="product-details">
                    <h6 className="brand">{item?.brand}</h6>
                    <h5 className="product-title">{item?.title}</h5>
                    <ReactStars
                      classNames="position"
                      count={5}
                      size={24}
                      value={item?.totalrating.toString()}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="price">{item?.price} DT</p>
                    <Link className="button btn btn-primary">Ajouter Panier
                  <span className="count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    99+
                  </span></Link>
                  </div>
                  <div className="action-bar position-absolute">
                    <div className="d-flex flex-column gap-15">
                      {/* <button className="border-0 bg-transparent">
                        <img src={prodcompare} alt="compare" />
                      </button> */}
                      <button className="border-0 bg-transparent">
                        <img onClick={()=>navigate("/product/"+item?._id)} src={view} alt="view" />
                      </button>
                      {/* <button className="border-0 bg-transparent">
                        <img src={addcart} alt="addcart" />
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading text-center">
              Collection en Populaire
            </h3>
          </div>
          {productState &&
            Object.values(
              productState.reduce((categories, product) => {
                if (product.tags === "popular") {
                  if (!categories[product.category]) {
                    categories[product.category] = product;
                  }
                }
                return categories;
              }, {})
            ).slice(0, 4).map((item, index) => (
              <div key={index} className={"col-3"}>
                <div className="product-card position-relative">
                  <div className="wishlist-icon position-absolute">
                    <button className="border-0 bg-transparent">
                      
                    <MdOutlineHowToVote className=" mt-2 fs-4" />
                    <MdOutlineFavoriteBorder onClick={()=>{addToWish(item?._id);}} className=" mt-2 fs-4" />
                    </button>
                  </div>
                  <div className="product-image">
                    <img
                      src={item?.photo?.[0]?.url}
                      className="img-fluid mx-auto"
                      width={220}
                      alt="product image"
                    />
                  </div>
                  <div className="product-details">
                    <h6 className="brand">{item?.brand}</h6>
                    <h5 className="product-title">{item?.title}</h5>
                    <ReactStars
                      classNames="position"
                      count={5}
                      size={24}
                      value={item?.totalrating.toString()}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="price">{item?.price} DT</p>
                    <Link className="button btn btn-primary">Ajouter Panier
                  <span className="count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    99+
                  </span></Link>
                  </div>
                  <div className="action-bar position-absolute">
                    <div className="d-flex flex-column gap-15">
                      {/* <button className="border-0 bg-transparent">
                        <img src={prodcompare} alt="compare" />
                      </button> */}
                      <button className="border-0 bg-transparent">
                        <img onClick={()=>navigate("/product/"+item?._id)} src={view} alt="view" />
                      </button>
                      {/* <button className="border-0 bg-transparent">
                        <img src={addcart} alt="addcart" />
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Container>
      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading text-center">Produits speciaux</h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState
              ?.reduce((acc, item, index) => {
                if (item.tags === "special") {
                  const categoryIndex = acc.findIndex(
                    (product) => product.category === item.category
                  );
                  if (categoryIndex === -1 && acc.length < 4) {
                    acc.push({
                      category: item.category,
                      product: (
                        <SpecialProduct
                          key={index}
                          id={item?._id}
                          image={item?.photo[0]?.url}
                          title={item?.title}
                          brand={item?.brand}
                          totalrating={item?.totalrating.toString()}
                          price={item?.price}
                          sold={item?.sold}
                          quantite={item?.quantite}
                        />
                      ),
                    });
                  }
                }
                return acc;
              }, [])
              .map((categoryProduct) => categoryProduct.product)}
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex justify-content-between flex-wrap align-items-center">
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Vetements Femmes</h6>
                  <p>10 articles</p>
                </div>
                <img src="images/vet-f.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Parfum</h6>
                  <p>10 articles</p>
                </div>
                <img src="images/beaute.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Accessoire Femmes</h6>
                  <p>10 articles</p>
                </div>
                <img src="images/femme.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Accessoires Voitures</h6>
                  <p>10 articles</p>
                </div>
                <img src="images/voi-1.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Vetements Hommes</h6>
                  <p>10 articles</p>
                </div>
                <img src="images/vet-h.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Maquillage</h6>
                  <p>10 articles</p>
                </div>
                <img src="images/beaute-1.jpg" alt="cos" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Accessoire Hommes</h6>
                  <p>10 articles</p>
                </div>
                <img src="images/homme.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Accessoires Voitures</h6>
                  <p>10 articles</p>
                </div>
                <img src="images/voi.jpg" alt="camera" />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading text-center">Nos derniers blogs</h3>
          </div>
        </div>
        <Marquee className="" style={{ "--gradient-color": "transparent", "--gradient-width": "200px" }}> 
        <div className="blog d-flex">
          {blogState &&
            blogState.map((item, index) => {
                return (
                    <div className="col-3" key={index}>
                <BlogCard
                      id={item?._id}
                      title={item?.title}
                      description={item?.description}
                      image={item?.images[0]?.url}
                      date={moment(item?.createdAt).format(
                        "MMMM Do YYYY, h:mm a"
                      )}
                    />
                  </div>
                );
            })}
        </div>
        </Marquee>
      </Container>
      <Container class1="marque-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="images/marque-01.png" alt="marque" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/marque-02.png" alt="marque" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/marque-03.jpg" alt="marque" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/marque-04.png" alt="marque" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/marque-05.png" alt="marque" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/marque-06.png" alt="marque" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/marque-07.png" alt="marque" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/marque-08.jpg" alt="marque" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
