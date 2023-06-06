import React, { useEffect , useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard";
import Color from "../components/Color";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../feature/produit/productSlice";

const Product = () => {
  const [grid, setGrid] = useState(4);
  const dispatch = useDispatch();
  const productState = useSelector((state)=>state?.product?.product);
  useEffect(() => {
    getProducts();
  },[])
  const getProducts = () => {
    dispatch(getAllProducts());
  }
  return (
    <>
      <Meta title={"Notre magasin"} />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="products-list pb-5">
              <div className="d-flex flex-wrap">
                <ProductCard data={productState ? productState : []} grid={grid} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Product;
