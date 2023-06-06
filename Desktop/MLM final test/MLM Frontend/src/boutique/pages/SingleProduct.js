import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
/* import ReactImageZoom from "react-image-zoom"; */
import Color from "../components/Color";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { addrating, getAProduct } from "../features/Product/productSlice";
import { toast } from "react-toastify";
import { addProdcart } from "../features/user/userSlice";
import { getAcart } from "../features/user/userSlice";

const SingleProduct = () => {
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1); 
  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);
  const [alreadyAdded , setAlreadyAdded ] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getProductId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const productstate = useSelector(state => state.productweb.singleproduct);
  const cartState = useSelector(state=>state.authweb.cartProducts)
/*   const productsState = useSelector((state)=>state?.productweb?.product);
 */
  
  /* najiya */
  /* const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addrating({ productId:productstate._id, rating, comment }));
    setRating(0);
    setComment('');
  };
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  }; */

  /* end */
  useEffect(() => {
    dispatch(getAProduct(getProductId));
    dispatch(getAcart())
  }, []);

  useEffect(()=>{
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
        setAlreadyAdded(true);
      }
      
    }
  },[])

  const uploadCart = () => {
    if (color === null) {
      toast.error("Please choose Color");
      return false;
    } else {
      dispatch(
        addProdcart({
          productId: productstate?._id,
          quantity,
          color,
          price: productstate?.price,
        })
      );
      navigate('/cart')
    }
  };

  const props = {
    width: 594,
    height: 600,
    zoomWidth: 600,

    img: productstate?.images[0]?.url ? productstate?.images[0]?.url : "",
  };
/* 
  const [orderedProduct, setorderedProduct] = useState(true); */
  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  const addRatingToProduct = () =>{
    if (star === null) {
      toast.error("Ajouter les star")
      return false
    } else if (comment === null) {
      toast.error("saisir commentaire pour ce produit");
      return false
    } else{
      dispatch(addrating({
        star: star , comment:comment , prodId:getProductId
      }))
      setTimeout(()=> {
        dispatch(getAProduct(getProductId));
      },100)
      return false
    }
    return false;
  }

  /* const ratingChanged = () => {
    dispatch(addrating());
  }; */

  /* const [popularProduct , setPopularProduct]= useState([])
  useEffect(() =>{
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      
    }
  },[productState]) */

  return (
    <>
      <Meta title={"Nom du produit"} />
      <BreadCrumb title={productstate?.title} />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            {/* <div className="main-product-image">
              <div>
                <ReactImageZoom {...props} />
              </div>
            </div> */}
            <div className="other-product-images d-flex flex-wrap gap-15">
              {productstate?.images.map((item ,index) => {
                return (
                  <div>
                    <img src={item?.url} className="img-fluid" alt="" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">{productstate?.title}</h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">{productstate?.price} DT</p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                      size={24}
                      value={productstate?.totalrating}
                      edit={false}
                      activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">{productstate?.ratings.length} Commentaire</p>
                </div>
                <a className="review-btn" href="#review">
                  Write a Review
                </a>
              </div>
              <div className=" py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Tapez :</h3>
                  <p className="product-data">Regarder</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Marque :</h3>
                  <p className="product-data">{productstate?.brand}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Catégorie :</h3>
                  <p className="product-data">{productstate?.category}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Tags:</h3>
                  <p className="product-data">{productstate?.tags}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Disponibilité :</h3>
                  <p className="product-data">En stock</p>
                </div>
                {/* <div className="d-flex gap-10 flex-column mt-2 mb-3">
                   <h3 className="product-heading">Taille :</h3>
                   <div className="d-flex flex-wrap gap-15">
                     <span className="badge border border-1 bg-white text-dark border-secondaire">
                       S
                     </span>
                     <span className="badge border border-1 bg-white text-dark border-secondaire">
                       M
                     </span>
                     <span className="badge border border-1 bg-white text-dark border-secondaire">
                       XL
                     </span>
                     <span className="badge border border-1 bg-white text-dark border-secondaire">
                       XXL
                    </span>
                  </div>
                </div> */}
                {
                  alreadyAdded === false && <>
                  <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Couleur :</h3>
                  <Color setColor={setColor} colorData={productstate?.color} />
                </div>
                </>
                }
                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  {
                    alreadyAdded === false && <>
                    <h3 className="product-heading">Quantité :</h3>
                  <div className="">
                    <input
                      type="number"
                      name=""
                      min={1}
                      max={10}
                      className="form-control"
                      style={{ width: "70px" }}
                      id=""
                      onChange={(e) => setQuantity(e.target.value)}
                      value={quantity}
                    />
                  </div>
                  </>
                  }
                  <div className={ alreadyAdded?"ms-0 ":"ms-5" + 'd-flex align-items-center gap-30 ms-5'}>
                    <button
                      className="button border-0"
                      /* data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop" */
                      type="button"
                      onClick={() => {
                        alreadyAdded? navigate('/cart'):uploadCart();
                      }}
                    >
                      {
                        alreadyAdded?"Aller au panier" : "Ajouter au panier"
                      }
                      
                    </button>
                    {/* <button className="button signup">
                      Achetez-le maintenant
                    </button> */}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div>
                    <a href="">
                      <TbGitCompare className="fs-5 me-2" /> Ajouter pour
                      comparer
                    </a>
                  </div>
                  <div>
                    <a href="">
                      <AiOutlineHeart className="fs-5 me-2" /> Ajouter à la
                      liste de souhaits
                    </a>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column  my-3">
                  <h3 className="product-heading">Expédition & Retours :</h3>
                  <p className="product-data">
                    Livraison et retours gratuits disponibles sur toutes les
                    commandes ! <br /> Nous expédier toutes les commandes
                    intérieures américaines dans
                    <b>5 à 10 jours ouvrés !</b>
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center my-3">
                  <h3 className="product-heading">Lien produit :</h3>
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      copyToClipboard(window.location.href);
                    }}
                  >
                    Copier le lien du produit
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p
                dangerouslySetInnerHTML={{
                  __html: productstate?.description,
                }}
              ></p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Commentaire</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Avis des clients</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={productstate?.totalrating}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">{productstate?.ratings.length} Commentaire</p>
                  </div>
                </div>
              </div>
              <div className="review-form py-4">
                <h4>Rédiger un avis</h4>
                {/* <form onSubmit={addRatingToProduct}  className="d-flex flex-column gap-15"> */}
                  <div>
                    <ReactStars
                    size={24}
                      count={5}
                      value={4}
                      edit={true} /* onChange={handleRatingChange} */
                      activeColor="#ffd700"
                      onChange={(e) => {
                        setStar(e)
                      }}
                    />
                  </div>
                  <div>
                    <textarea
                    name=""
                    id=""
                    className="w-100 form-control"
                    cols="30"
                    rows="4"
                    onChange={(e) => {
                      setComment(e.target.value)
                    }}
                    placeholder="Saisir commentaire"
                      /* value={comment} onChange={(e) => setComment(e.target.value)} */
                    ></textarea>
                  </div>
                  <div className="d-flex mt-3 justify-content-end">
                    <button type="button" onClick={addRatingToProduct} className="button border-0">Submit Review</button>
                  </div>
                {/* </form> */}
              </div>
              <div className="reviews mt-4">
                  {
                    productstate && productstate.ratings?.map((item, index)=>{
                      return(<>
                        <div key={index} className="review">{/* 
                      <p className="mt-3">{item?.postedby}</p> */}
                        <p className="mt-3">{item?.comment}</p>
                </div>
                      </>)
                    })
                  } 
                  
              </div>
            </div>
          </div>
        </div>
      </Container>

      
    </>
  );
};

export default SingleProduct;
