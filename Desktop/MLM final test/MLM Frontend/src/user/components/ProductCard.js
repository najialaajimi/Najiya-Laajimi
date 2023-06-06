import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import addcart from "../images/add-cart.svg";
import { MdOutlineHowToVote ,MdOutlineFavoriteBorder} from "react-icons/md"
import view from "../images/view.svg";
import { useDispatch } from "react-redux";
import {addToWishlist} from "../feature/produit/productSlice";
import { config } from "../utils/config";
import axios from "axios";


const ProductCard = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user",user)
  console.log("config",config)
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
const ajouter_vote=async(id)=>{
  try {
    //axios.put("http://localhost:5000/api/product/vote/"+id,config).then(res=>res.json()).then(data=>{console.log(data)})
await fetch("http://localhost:5000/api/product/vote/"+id, {
      method: "Put",
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      }

      
    }).then(res=>res.json()).then(data=>{
      console.log(data)
    })
  } catch (error) {
    console.log(error)
    
  }
}


  return (
    <>
      {
        data?.map((item, index) =>{
          return (
            <div
            key={index}
              className={` ${
                location.pathname === "/product" ? `gr-${grid}` : "col-4 pb-3 mb-4"
              } `}
            >
              <Link
                 /* to={`${
                  location.pathname === "/"
                    ? "/product/:id"
                    : location.pathname === "/product/:id"
                    ? "/product/:id"
                    : ":id"
                }`}  */
                className="product-card-user position-relative"
              >
                <div className="wishlist-icon position-absolute">
                <button className="border-0 bg-transparent">
                    <MdOutlineHowToVote className=" mt-2 fs-4" onClick={()=>{ajouter_vote(item._id)}} /> {/* voteeeee */}
                 
                  </button>
                  <button className="border-0 bg-transparent">
                    {/* voteeeee */}
                    <MdOutlineFavoriteBorder onClick={()=>{addToWish(item?._id);}} className=" mt-2 fs-4" />
                  </button>
                </div>
                <div className="product-image">
                  <img src={item?.images?.[0]?.url} className="img-fluid mx-auto" width={250} alt="product image" />
                  {/* <img src={item?.images?.[0]?.url} className="img-fluid mx-auto" width={250} alt="product image" /> */}
                </div>
                <div className="product-details">
                  <h6 className="brand">{item?.brand}</h6>
                  <h5 className="product-title">
                    {item?.title}
                  </h5>
                  <ReactStars
                    count={5}
                    size={24}
                    value={item?.totalrating.toString()}
                    edit={false}
                    activeColor="#ffd700"
                    classNames="position"
                  />
                  <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}
                  dangerouslySetInnerHTML={{__html:item?.description}} >
                  </p>
                  <p className="price">{item?.price} DT</p>
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
        })
      }
    </>
  );
};

export default ProductCard;
