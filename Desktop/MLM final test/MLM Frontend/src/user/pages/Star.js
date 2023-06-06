import axios from "axios";
import React, { useState, useEffect } from "react";
import { base_url } from "../utils/base_url";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import wish from "../images/wish.svg";
import prodcompare from "../images/prodcompare.svg";
import { MdOutlineHowToVote, MdOutlineFavoriteBorder } from "react-icons/md";
import { config } from "../utils/config";


const Star = () => {
  const [precedent, setPrecedent] = useState([]);
  const [nouvelle, setNouvelle] = useState([]);
  const Product_precedant = async () => {
    let today = new Date();
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    
    try {
      const response = await axios.get("http://localhost:5000/api/product");
      const data = response.data;
      
      const filtre = data.filter((em) => em.moins < mm);
      filtre.sort(function(a, b){return b.total_vote - a.total_vote});
      
      let precedentArray = [];
      for(let i = 0; i < 3; i++){
        precedentArray.push(filtre[i]);
      }
      
      setPrecedent(precedentArray);
    } catch (error) {
      console.log(error);
    }
  };
  


  const mes_votes = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    let today = new Date();
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    console.log("config", user);
    try {
      const response = await axios.get("http://localhost:5000/api/product");
      const data = response.data;
      const array = [];
      array.push(data);
      for (let i = 0; i < array.length; i++) {
        console.log("data", array[i]);
      }
      // const filtre = data.vote.filter((em) => em.data < mm);
      // console.log("filtre",filtre)
      // filtre.sort(function(a, b){return b.total_vote - a.total_vote});
      // for(let i=0; i<3;i++){
      //   setPrecedent((precedent) => [...precedent, filtre[i]]);
      // }
    } catch (error) {
      console.error(error);
    }
  };
  
const nouvelle_product = async () => {
  let today = new Date();
  let mm = String(today.getMonth() + 1).padStart(2, "0"); // janvier = 0

  try {
    const response = await axios.get("http://localhost:5000/api/product");
    const data = response.data;

    const filtre = data.filter((em) => em.moins == mm);
    filtre.sort(function(a, b){return b.total_vote - a.total_vote});
    
    for(let i=0; i<3;i++){
      setNouvelle((precedent) => [...precedent, filtre[i]]);
      //console.log("i",filtre[i])
    }
    //console.log(filtre)

  } catch (error) {
    console.log(error);
  }
};


  useEffect(() => {
    Product_precedant();
    nouvelle_product()
    mes_votes()
  }, []);

  return (
    <>
      <div className="text-center">
        <h3 className="mb-5">Meilleur vote mois précedant</h3>
      </div>
      <div className="row">
        <div className="col-9 starvote d-flex">
           {
        precedent.map((p,i) => (
          <div className="col-3 star" key={i}>
          <div className="">
            <button className="pos border-0 bg-transparent mb-2">
              <MdOutlineHowToVote className=" fs-4" />
              <MdOutlineFavoriteBorder className=" fs-4" />
            </button>
            <div className="product-image">
              <img
                src={p?.photo[0]?.url}
                className="mx-auto text-center"
                width={240}
                alt="product image"
              />
            </div>
            <div className="product-details">
              <h6 className="brand">{p?.brand} </h6>
              <h5 className="product-title">{p?.title} </h5>
              <ReactStars
                count={5}
                size={24}
                value="3"
                edit={false}
                activeColor="#ffd700"
                classNames="position"
              />
              <p className="price">{p?.price} </p>
              <button className="starbutton btn btn-primary position-relative">
                Acheter
                <span className="count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                 {p?.total_vote}
                </span>
              </button>
            </div>
            
          </div>
            <div>
              {
                i===0 ?(
                  <div>
                    <img src="/images/1.png" className="medale" width={100} alt="" />
                  </div>
                ):i===1? (  <div>
                  <img src="/images/2.png" className="medale" width={100} alt="" />
                </div>):(
                   <div>
                   <img src="/images/3.png" className="medale" width={100} alt="" />
                 </div>
                )
              }
            </div>
          
        {/*   <img src="/images/2.png" className="medale" width={100} alt="" />
          <img src="/images/3.png" className="medale" width={100} alt="" /> */}
        </div>
       
       ))
      } 

          {/* <div className="col-3 star">
            <div className="">
              <button className="pos border-0 bg-transparent mb-2">
                <MdOutlineHowToVote className=" fs-4" />
                <MdOutlineFavoriteBorder className=" fs-4" />
              </button>
              <div className="product-image">
                <img
                  src="/images/vet-f.jpg"
                  className="mx-auto text-center"
                  width={240}
                  alt="product image"
                />
              </div>
              <div className="product-details">
                <h6 className="brand">Marque</h6>
                <h5 className="product-title">titre</h5>
                <ReactStars
                  count={5}
                  size={24}
                  value="3"
                  edit={false}
                  activeColor="#ffd700"
                  classNames="position"
                />
                <p className="price">Prix DT</p>
                <button className="starbutton btn btn-primary position-relative">
                  Acheter
                  <span className="count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    99+
                  </span>
                </button>
              </div>
              
            </div>
            <img src="/images/1.png" className="medale" width={100} alt="" />
          </div>
          <div className="col-3 star">
            <div className="">
              <button className="pos border-0 bg-transparent mb-2">
                <MdOutlineHowToVote className="fs-4" />
                <MdOutlineFavoriteBorder className="fs-4" />
              </button>
              <div className="product-image">
                <img
                  src="/images/vet-f.jpg"
                  className="mx-auto text-center"
                  width={240}
                  alt="product image"
                />
              </div>
              <div className="product-details">
                <h6 className="brand">Marque</h6>
                <h5 className="product-title">titre</h5>
                <ReactStars
                  count={5}
                  size={24}
                  value="3"
                  edit={false}
                  activeColor="#ffd700"
                  classNames="position"
                />
                <p className="price">Prix DT</p>
                <button className="starbutton btn btn-primary position-relative">
                  Acheter
                  <span className="count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    99+
                  </span>
                </button>
              </div>
              
            </div>
            <img src="/images/2.png" className="medale" width={100} alt="" />
          </div>
          <div className="col-3 star">
            <div className="">
              <button className="pos border-0 bg-transparent mb-2">
                <MdOutlineHowToVote className="fs-4" />
                <MdOutlineFavoriteBorder className="fs-4" />
              </button>
              <div className="product-image">
                <img
                  src="/images/vet-f.jpg"
                  className="mx-auto text-center"
                  width={240}
                  alt="product image"
                />
              </div>
              <div className="product-details">
                <h6 className="brand">Marque</h6>
                <h5 className="product-title">titre</h5>
                <ReactStars
                  count={5}
                  size={24}
                  value="3"
                  edit={false}
                  activeColor="#ffd700"
                  classNames="position"
                />
                <p className="price">Prix DT</p>
                <button className="starbutton btn btn-primary position-relative">
                  Acheter
                  <span className="count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    99+
                  </span>
                </button>
              </div>
              
            </div>
            <img src="/images/3.png" className="medale" width={100} alt="" />
          </div> */}
        </div>
      </div>
      <div className="row my-5 py-5">
        <div className="">
          <h3 className="">Votre vote cette Mois</h3>
          <br />
          <br />
          <div className="text-start star-detail col-3">
            <button className="mb-2 iconvote border-0 bg-transparent">
              <MdOutlineHowToVote className="text-success  fs-4" />
              <MdOutlineFavoriteBorder className=" fs-4" />
            </button>
            <div className="product-image">
              <img
                src="/images/vet-f.jpg"
                className="mx-auto"
                width={270}
                alt="product image"
              />
            </div>
            <div className="product-details mt-2">
              <h5 className="product-title">Pack sweatshirt et jogging</h5>
              <h6 className="brand">Vetement</h6>
              <ReactStars
                count={5}
                size={24}
                value="3"
                edit={false}
                activeColor="#ffd700"
                classNames="position"
              />
              <p className="ms-2">
                <b>Prix :</b> 30 DT
              </p>
              <button className="starbutton">Acheter</button>
            </div>
          </div>
        </div>
        <div className="col-9 vote">
          <h3 className="text-center">Vote cette Mois</h3>
          <br />
          <br />
          <table className="vote-Table table table-striped">
            <thead className="text-center">
              <tr>
                <th scope="col">place</th>
                <th scope="col">photo</th>
                <th scope="col">Nom</th>
                <th scope="col">Prix</th>
                <th scope="col">Nombre Vote</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">

{
      nouvelle.map((n,i)=>(
        <tr>
              
              {
                i===0 ?(
                  <td>
                    <img src="/images/1.png" className="img-fluid" width={50} alt="" />
                  </td>
                ):i===1? (  <td>
                  <img src="/images/2.png" className="img-fluid" width={50} alt="" />
                </td>):(
                   <td>
                   <img src="/images/3.png" className="img-fluid" width={50} alt="" />
                 </td>
                )
              }
                <td>
                  {/* <img src={n?.photo[0]?.url} alt="product image" width={90} /> */}
                </td>
                <td>{n?.title} </td>
                <td>{n?.price} </td>
                <td>{n?.total_vote} </td>
                <td>
                  <button className="starbuttonuser">Acheter</button>
                </td>
              </tr>
      ))
}

         
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Star;
