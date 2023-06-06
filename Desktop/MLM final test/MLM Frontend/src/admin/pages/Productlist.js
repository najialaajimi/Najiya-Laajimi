import React, { useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import "./style.css";
import { useState } from "react";
//table
const columns = [
  {
    title: "#",
    dataIndex: "key",
  },
  {
    title: "Titre produit",
    dataIndex: "title",
  },
  {
    title: "Marque",
    dataIndex: "brand",
  },
  {
    title: "Categorie",
    dataIndex: "category",
  },
  {
    title: "Couleur",
    dataIndex: "color",
  },
  {
    title: "Prix",
    dataIndex: "price",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const [products, setProducts] = useState([]);

  const getAllProduct = () => {
    fetch("http://localhost:5000/api/product")
      .then((res) => res.json())
      .then((data) => {
        console.log("employe", data);
        // setLoad(true)
        setTimeout(() => {
          // console.log("msg",employe)
          setProducts(data);

          // setData(data)
        }, 1000);
      });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    //dispatch(getProducts());
    getAllProduct();
  }, []);
  const productState = useSelector((state) => state.productadmin.products);
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    console.log("color", productState[i].color[0].title);
    data1.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      color: productState[i].color[0].title,
      price: `${productState[i].price} DT`,
      action: (
        <>
          <Link className="text-danger fs-3" to="/">
            <BiEdit />
          </Link>
          <Link className="text-danger fs-3 ms-3" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  return (
    <div className="mt-4">
      <h3 className="mb-4 title_admin">Product list </h3>

      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1"> #</div>
          <div className="col col-2">title</div>
          <div className="col col-3">brand</div>
          <div className="col col-4">category</div>
          <div className="col col-5">color</div>
          <div className="col col-6">price</div>
          <div className="col col-7">Actions</div>
        </li>
        {products.map((p, index) => (
          <li className="table-row" key={p.key}>
            <div className="col col-1" data-label="index">
              {index}
            </div>
            <div className="col col-2" data-label="titel">
              {p?.title}
            </div>
            <div className="col col-3" data-label="brand">
              {p?.brand}
            </div>
            <div className="col col-4" data-label="category">
              {p?.category}
            </div>
            <div className="col col-5" data-label="color">
              {p?.color?.map((c,i)=>(
               <p key={i}> {c.title} </p>
              
                ))}
            </div>
            <div className="col col-6" data-label="price">
              {p.price}
            </div>
            <div className="col col-7" data-label="Actions">
              <div className=""><Link className="text-danger fs-3" to="/">
            <BiEdit />
          </Link>
          <Link className="text-danger fs-3 ms-3" to="/">
            <AiFillDelete />
          </Link></div>
            </div>
          </li>
        ))}
      </ul>

      {/* <div>
        <Table columns={columns} className="table" dataSource={data1} />
      </div> */}
    </div>
  );
};

export default Productlist;
