import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartProduct,
  getAcart,
  updateCartProduct,
} from "../feature/user/userSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const [productUpdateDetails, setProductUpdateDetails] = useState(null)
  const [totalAmount, setTotalAmount] = useState(null)
  const cartState = useSelector((state) => state.authweb.cartProducts);
  useEffect(() => {
    dispatch(getAcart());
  }, []);
  useEffect(() => {
    if (productUpdateDetails !== null) {
      dispatch(
        updateCartProduct({
          cartItemId: productUpdateDetails?.cartItemId,
          quantity: productUpdateDetails?.quantity,
        })
      );
      setTimeout(() => {
        dispatch(getAcart());
      }, 200);
    }
  }, [productUpdateDetails]);
  const deleteACartProduct = (id) => {
    dispatch(deleteCartProduct(id));
    setTimeout(() => {
      dispatch(getAcart());
    }, 200);
  }; /* 
  const updateACartProduct = (productUpdateDetails) => {
    dispatch(
      updateCartProduct({
        cartItemId: productUpdateDetails?.cartItemId,
        quantity: productUpdateDetails?.quantity,
      })
    );
    setTimeout(() => {
      dispatch(getAcart());
    }, 200);
  }; */
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity) * cartState[index].price;
      setTotalAmount(sum)
    }
  }, [cartState]);
  return (
    <>
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Produit</h4>
              <h4 className="cart-col-2">Prix</h4>
              <h4 className="cart-col-3">Quantité</h4>
              <h4 className="cart-col-4">Totale</h4>
            </div>
            {cartState &&
              cartState?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center"
                  >
                    <div className="cart-col-1 gap-15 d-flex align-items-center">
                      <div className="w-25">
                        <img
                          src={item?.productId?.images[0]?.url}
                          className="img-fluid"
                          alt="product image"
                        />
                      </div>
                      <div className="w-75">
                        <p>{item?.productId.title}</p>
                        <p>
                          Color:
                          <ul className="colors ps-0">
                            {item?.color ? (
                              <li
                                style={{ backgroundColor: item.color.title }}
                              ></li>
                            ) : (
                              "n'existe pas couleur"
                            )}
                          </ul>
                        </p>
                      </div>
                    </div>
                    <div className="cart-col-2">
                      <h5 className="price">{item?.price} DT</h5>
                    </div>
                    <div className="cart-col-3 d-flex align-items-center gap-15">
                      <div>
                        <input
                          className="form-control"
                          type="number"
                          name=""
                          min={1}
                          max={10}
                          value={
                            productUpdateDetails
                              ? productUpdateDetails.quantity
                              : item?.quantity
                          }
                          onChange={(e) => {
                            setProductUpdateDetails({
                              cartItemId: item?._id,
                              quantity: e.target.value,
                            });
                          }}
                          id=""
                        />
                      </div>
                      <div>
                        <AiFillDelete
                          onClick={() => {
                            deleteACartProduct(item?._id);
                          }}
                          className="text-danger "
                        />
                      </div>
                    </div>
                    <div className="cart-col-4">
                      <h5 className="price">{item?.price * item?.quantity}</h5>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/product" className="button">
                Continuer à magasiner
              </Link>
              {
                (totalAmount !== null || totalAmount !== 0) &&
                <div className="d-flex flex-column align-items-end">
                <h4>Sous-total: <b className="text-danger"> {totalAmount} DT</b></h4>
                <p>Taxes et frais de port calculés au moment du paiement</p>
                <Link to="/checkout" className="button">
                  Vérifier
                </Link>
              </div>
              }
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
