import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import watch2 from "../images/watch-1.avif";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch } from "react-redux";
import {addToWishlist} from "../features/Product/productSlice";
import { MdOutlineHowToVote ,MdOutlineFavoriteBorder} from "react-icons/md"

const Beaute = (props) => {
  const { grid , data } = props;
  console.log(data);
  let location = useLocation();
  const dispatch = useDispatch();

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };
  /* 
  if (!Array.isArray(data)) {
    return <p>No data available.</p>;
  } */

  return (
    <>
      {
        data?.map((item, index) =>{
          if (item.category == "Beauté") {
            return (
              <div
              key={index}
                className={` ${
                  location.pathname === "/product" ? `gr-${grid}` : "col-4 pb-2"
                } `}
              >
                <Link
                   to={`${
                    location.pathname === "/"
                      ? "/product/:id"
                      : location.pathname === "/product/:id"
                      ? "/product/:id"
                      : ":id"
                  }`} 
                  className="product-card position-relative"
                >
                  <div className="wishlist-icon position-absolute">
                    <button className="border-0 bg-transparent">
                    <MdOutlineHowToVote className=" mt-2 fs-4" />
                    <MdOutlineFavoriteBorder onClick={()=>{addToWish(item?._id);}} className=" mt-2 fs-4" />
                    </button>
                  </div>
                  <div className="product-image">
                      <img src={item?.images?.[0]?.url} className="img-fluid mx-auto" width={220} alt="product image" />{/* 
                    <img src={item?.images?.[0]?.url} className="img-fluid mx-auto" width={220} alt="product image" /> */}
                  </div>
                  <div className="product-details">
                    <h6 className="brand">{item?.brand}</h6>
                    <h5 className="product-title">
                      {item?.title}
                    </h5>
                    <ReactStars
                    classNames="position"
                      count={5}
                      size={24}
                      value={item?.totalrating.toString()}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}
                    dangerouslySetInnerHTML={{__html:item?.description}} >
                    </p>
                    <p className="price"> {item?.price} DT</p>
                    <Link className="button btn btn-primary">Ajouter Panier
                  <span className="count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    99+
                  </span></Link>
                  </div>
                  <div className="action-bar position-absolute">
                    <div className="d-flex flex-column gap-15">
                      <button className="border-0 bg-transparent">
                        <img src={prodcompare} alt="compare" />
                      </button>
                      <button className="border-0 bg-transparent">
                        <img src={view} alt="view" />
                      </button>
                      <button className="border-0 bg-transparent">
                        <img src={addcart} alt="addcart" />
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
              )
          }
        })
      }
    </>
  );
};

export default Beaute;
