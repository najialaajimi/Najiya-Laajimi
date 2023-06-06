import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";
import { MdOutlineCompare, MdFavorite } from "react-icons/md";
import { TbCategory2 } from "react-icons/tb";
import { FaCartArrowDown } from "react-icons/fa";
import {ImSearch} from "react-icons/im";
import menu from "../images/menu.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAProduct } from "../features/Product/productSlice";
import {
  AiOutlineDashboard,
} from "react-icons/ai";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const cartState = useSelector(state => state?.authweb?.cartProducts);
  const authState = useSelector(state => state.authweb)
  const [total , setTotal] = useState(null)
  const [paginate, setPaginate] = useState(true);
  const productState = useSelector(state => state.productweb?.product)
  const [productOpt ,setProductOpt] = useState([])
  const navigate = useNavigate()

useEffect(()=>{
  let data =[]
  for (let index = 0; index < productState.length; index++) {
    const element = productState[index];
    data.push({id:index , prod:element?._id, name:element?.title})
  }
  setProductOpt(data)
},[productState])

  useEffect(() =>{
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + (Number(cartState[index].quantity) * Number(cartState[index].price))
      setTotal(sum)
    }
  },[cartState])

  function handleClick() {
    setShowSearch(!showSearch);
  }
/* 
  const handleLogout= () => {
    localStorage.clear();
    window.location.reload()
  } */
  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Ligne d'assistance :
                <a className="text-white" href="tel:+216 25432098">
                  +216 25432098
                </a>
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Avenue de la République 5000 Monastir, Tunisie
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2 d-flex mt-2">
              <Link to="/">
                <img src="images/Logo.png" alt="" width={75} />
              </Link>
                <Link to="/"><h3 className="ms-3 fw-medium text-white">Altiso Marketing</h3></Link>
            </div>
            <div className="col-5 ">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                {/* <div>
                  <Link
                    to="/compare-product"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <MdOutlineCompare className="fs-2" />
                    <p className="mb-0">
                      Comparer 
                    </p>
                  </Link>
                </div> */}
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <MdFavorite className="fs-2" />
                    <p className="mb-0">
                      Favoris 
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to={authState?.user === null ? "/login" : "my-profile"}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <BsPersonFill className="fs-2" />
                    { authState?.user === null ? <p className="mb-0">
                      Se connecter 
                    </p> : <p className=" mb-0">
                      Bienvenue <b>{authState?.user?.firstname}</b> 
                      <AiOutlineDashboard className="fs-2 ms-3 me-1" /> <Link to="/user" className="text-white" >Voir Dashboard</Link>
                    </p>
                    }
                  </Link>
                </div>
                <div className="position-relative">
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <FaCartArrowDown className="fs-1" />
                      <span className="badge total rounded-cercle p-1 position-absolute bg-white text-dark">{cartState?.length ? cartState?.length : 0}</span>
                    {/* <div className="d-flex flex-column text-center gap-10">
                      <p className="mb-0">{total ? total : 0} DT</p>
                    </div> */}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/product">Vetements</NavLink>
                    <NavLink to="/beaute">Cosmétiques</NavLink>
                    <NavLink to="/accessoires">Accessoires</NavLink>
                    <NavLink to="/voiture"> Accessoires Voitures </NavLink>
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                  </div>
                </div>
                <div className="col-5">
                  <div className="input-group-search">
                    <ImSearch
                      onClick={handleClick}
                      className="search-icon fs-2 text-white"
                    />

                    {showSearch && (
                      <div className="search-container">
                        <input
                          type="text"
                          className="form-control py-2 rounded-5"
                          placeholder="Rechercher un produit ici..."
                          aria-label="Rechercher un produit ici..."
                          aria-describedby="basic-addon2"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
