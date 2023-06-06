import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
/* Boutique */
import Layout from "../src/boutique/components/Layout";
import Home from "../src/boutique/pages/Home";
import About from "../src/boutique/pages/About";
import Contact from "../src/boutique/pages/Contact";
import OurStore from "../src/boutique/pages/OurStore";
import Blog from "../src/boutique/pages/Blog";
import CompareProduct from "../src/boutique/pages/CompareProduct";
import Wishlist from "../src/boutique/pages/Wishlist";
import Login from "../src/boutique/pages/Login";
import Forgotpassword from "../src/boutique/pages/Forgotpassword";
import Signup from "../src/boutique/pages/Signup";
import Resetpassword from "../src/boutique/pages/Resetpassword";
import SingleBlog from "../src/boutique/pages/SingleBlog";
import PrivacyPolicy from "../src/boutique/pages/PrivacyPolicy";
import RefundPloicy from "../src/boutique/pages/RefundPolicy";
import ShippingPolicy from "../src/boutique/pages/ShippingPolicy";
import SingleProduct from "../src/boutique/pages/SingleProduct";
import Cart from "../src/boutique/pages/Cart";
import Checkout from "../src/boutique/pages/Checkout";
import TermAndContions from "../src/boutique/pages/TermAndCondition";
import Accessoires from "../src/boutique/pages/Accessoires";
import Voitures from "../src/boutique/pages/Voitures";
import Beaute from "../src/boutique/pages/Beaute";
import Profile from "./boutique/pages/Profile";
import { PrivateRoute } from "./boutique/Routing/PrivateRoute";
/* admin */
import MainLayout from '../src/admin/components/MainLayout';
import Dashboard from '../src/admin/pages/Dashboard';
/* import DashboardAppPage from "./admin/pages/DashboardAppPage"; */
import Enquiries from '../src/admin/pages/Enquiries';
import Bloglist from '../src/admin/pages/Bloglist';
import BlogCatlist from '../src/admin/pages/BlogCatlist';
import Orders from '../src/admin/pages/Orders';
import Customers from '../src/admin/pages/Customers';
import Colorlist from '../src/admin/pages/Colorlist';
import Categorylist from '../src/admin/pages/Categorylist';
import Productlist from '../src/admin/pages/Productlist';
import Brandlist from '../src/admin/pages/Brandlist';
import AddBlog from '../src/admin/pages/AddBlog';
import Addblogcat from '../src/admin/pages/Addblogcat';
import AddColor from '../src/admin/pages/AddColor';
import AddCategory from '../src/admin/pages/AddCategory';
import AddProduct from '../src/admin/pages/AddProduct';
import AddBrand from '../src/admin/pages/AddBrand';
import AddCoupon from '../src/admin/pages/AddCoupon';
import Couponlist from '../src/admin/pages/Couponlist';
import ViewEnq from '../src/admin/pages/ViewEnq';
import ViewOrder from '../src/admin/pages/ViewOrder';
import Tiket from "./admin/pages/Tiket";
import SingleTicket from "./admin/pages/SingleTicket";
/* user */
import MainLayoutuser from '../src/user/components/MainLayout';
import Dashboarduser from '../src/user/pages/Dashboard';
import Productuser from '../src/user/pages/Product';
import Favorisuser from '../src/user/pages/Favoris';
import Compteuser from '../src/user/pages/compte';
import Cartuser from '../src/user/pages/Cart';
import AddTiket from "./user/pages/AddTiket";
import Tiketlist from "./user/pages/Tiketlist";
import Star from "./user/pages/Star";
import Ticket from "./user/pages/Ticket";
import Staradmin from "./admin/pages/Staradmin";
import Loginadmin from "./admin/pages/Loginadmin";
import Comptadmin from "./admin/pages/Comptadmin";
import HCommande from "./user/pages/HCommande";
import Event from "./user/pages/Event";
import Adherant from "./user/pages/Adherant";
import ListEvent from "./admin/pages/ListEvent";
import AddEvent from "./admin/pages/AddEvent";
import NotFound from "./NotFound";
import TestProductImg from "./admin/pages/TestProductImg";

function App() {
  return (
    <>
      <Routes>
        {/* Boutique */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product" element={<OurStore />} />
          <Route path="/accessoires" element={<Accessoires />} />
          <Route path="/beaute" element={<Beaute />} />
          <Route path="/voiture" element={<Voitures />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          
          <Route
            path="/my-profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/compare-product" element={<CompareProduct />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<Forgotpassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<Resetpassword />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPloicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/term-conditions" element={<TermAndContions />} />
        </Route>
        {/* Admin */}
        <Route path="/connexion" element={<Loginadmin />} />
        <Route path='/admin' element={<MainLayout />} >
          {/* dashboard */}
        <Route index element={<Dashboard />} /> 
        {/* <Route index element={<DashboardAppPage />} />*/}
        {/* customers */}
        <Route path='customers' element={<Customers />} />
        {/* catalogue */}
        {/* product */}
        <Route path='product' element={<AddProduct />} />
        <Route path='product/:id' element={<AddProduct />} />
        <Route path='list-product' element={<Productlist />} />
        {/* brand */}
        <Route path='brand' element={<AddBrand />} />
        <Route path='list-brand' element={<Brandlist />} />
        <Route path='brand/:id' element={<AddBrand />} />
        {/* categorie produit */}
        <Route path='category' element={<AddCategory />} />
        <Route path='category/:id' element={<AddCategory />} />
        <Route path='list-category' element={<Categorylist />} />
        {/* color */}
        <Route path='color' element={<AddColor />} />
        <Route path='color/:id' element={<AddColor />} />
        <Route path='list-color' element={<Colorlist />} />
        {/* orders */}
        <Route path='orders' element={<Orders />} />
        <Route path='orders/:id' element={<ViewOrder/>} />
        {/* Marketing */}
        <Route path="coupon" element={<AddCoupon />} />
        <Route path="coupon/:id" element={<AddCoupon />} />
        <Route path="coupon-list" element={<Couponlist />} />
        {/* blog */}
        <Route path='blog' element={<AddBlog />} />
        <Route path='blog/:id' element={<AddBlog />} />
        <Route path='blog-list' element={<Bloglist />} />
        {/* categorie Blog */}
        <Route path='blog-category' element={<Addblogcat />} />
        <Route path='blog-category/:id' element={<Addblogcat />} />
        <Route path='blog-category-list' element={<BlogCatlist />} />
        {/* enquiries */}
        <Route path='enquiries' element={<Enquiries />} />
        <Route path='enquiries/:id' element={<ViewEnq />} />
        {/* EventRoom */}
        <Route path="add-event" element={<AddEvent />} />
        <Route path="list-event" element={<ListEvent />} />
        {/* ticket */}
        <Route path="tiket" element={<Tiket />} />
        <Route path="tiket/:id" element={<SingleTicket/> } />
        {/* Vote */}
        <Route path="star" element={<Staradmin />} />
        <Route path="test" element={<TestProductImg/>}/>
        {/* compte */}
        <Route path="compte" element={<Comptadmin />} />
        </Route>
        {/* User */}
        <Route path='/user' element={<MainLayoutuser />} >
          {/* dashboard */}
        <Route index element={<Dashboarduser />} />
        {/* Adherant */}
        <Route path='adherant' element={<Adherant />} />
        {/* Product */}
        <Route path='product' element={<Productuser />} />
        {/* Cart */}
        <Route path='achat' element={<Cartuser />} />
        {/* Favoris */}
        <Route path='favoris' element={<Favorisuser />} />
        {/* Star Produit */}
        <Route path='star' element={<Star />}/>
        {/* compte */}
        <Route path='compte' element={<Compteuser />} />
        {/* Tiket */}
        <Route path='add-tiket' element={<AddTiket />} />
        <Route path='list-tiket' element={<Tiketlist />} />
        <Route path='list-tiket/:id' element={<Ticket />} />
        {/* historique commande */}
        <Route path="hcommande" element={<HCommande/>} />
        {/* evenement */}
        <Route path="event" element={<Event />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
