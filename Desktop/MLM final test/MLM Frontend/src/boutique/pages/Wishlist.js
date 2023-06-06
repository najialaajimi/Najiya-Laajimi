import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductWishlist } from "../features/user/userSlice";
import { addToWishlist } from "../features/Product/productSlice";
import ReactStars from "react-rating-stars-component";
import { Link} from "react-router-dom";
import wish from "../images/wish.svg";
import { MdOutlineHowToVote ,MdOutlineClose , MdOutlineFavorite} from "react-icons/md"

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistState = useSelector((state) => state.authweb.wishlist?.wishlist);
  useEffect(() => {
    getWishlist();
  }, []);
  const getWishlist = () => {
    dispatch(getUserProductWishlist());
  };
  const removeWishlist = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 300);
  }
  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
        {wishlistState?.length === 0 && (
            <div className="text-center fs-3">No Data</div>
          )}
          {wishlistState?.map((item, index) => {
            return (
              <div className="col-3" key={index}>
                <div className="product-card-user position-relative">
                  <div className="wishlist-icon position-absolute">
                  <button className="border-0 bg-transparent">
                    <MdOutlineClose onClick={() => {removeWishlist(item?._id)}} className="fs-4 " /> <br />
                    <MdOutlineFavorite className="fs-4 text-danger" /> <br />
                    <MdOutlineHowToVote className="fs-4" />
                  </button>
                </div>
                  <div className="product-image">
                    <img
                      src={
                        item?.images[0].url
                          ? item?.images[0].url
                          : "null"
                      }
                      className="img-fluid w-100 d-block mx-auto"
                      alt="watch"
                      width={250}
                    />
                  </div>
                  <div className="product-details py-3 px-3">
                    <h5 className="product-title">{item?.title}</h5>
                  <ReactStars
                    count={5}
                    size={24}
                    value={item?.totalrating.toString()}
                    edit={false}
                    activeColor="#ffd700"
                    classNames="position"
                  />
                    <p className="price">{item?.price} DT</p>
                  <Link className="button btn btn-primary">Ajouter Panier
                  <span className="count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    99+
                  </span></Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
