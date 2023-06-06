import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { Form } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { config } from "../utils/axiosconfig";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getBrands } from "../features/brand/brandSlice";


const TestProductImg = () => {
const dispatch = useDispatch();
const [navigate, setNavigate] = useState(null);

useEffect(() => {
dispatch(getCategories());
dispatch(getBrands());
}, []);

const brandState = useSelector((state) => state.brandadmin.brands);
const CatState = useSelector((state) => state.pCategoryadmin.pCategories);

const [category, setCategory] = useState("");
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [price, setPrice] = useState("");
const [quantite, setQuantite] = useState("");
const [photo, setPhoto] = useState(null);
const [brand, setBrand] = useState("");
const [tags, setTags] = useState("");
const handleCreate = async (e) => {
e.preventDefault();
try {
const productData = new FormData();
    productData.append("title", title);
    productData.append("brand", brand);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("quantite", quantite);
    productData.append("category", category);
    productData.append("tags", tags);/* 
    productData.append("color", color); */
    productData.append("photo", photo);
const { data } = await axios.post("http://localhost:5000/api/product/", productData,config);
if (data?.success) {
toast.success('Product Created Successfully');
if (navigate) {
navigate("/admin/list-product");
}
} else {
toast.error(data?.message);
}
} catch (error) {
console.log(error);
toast.error('Something Went Wrong');
}
};

return (
<div title={"Dashboard - Create Product"}>
<div className="container-fluid m-3 p-3">
<div className="row">
<div className="col-md-9">
<h1>Create Product</h1>
<div className="m-1 w-75">
    
<input
            type="text"
            className="form-control"
            label="Entrer titre de produit"
            name="title"
            placeholder="Sasir titre de produit"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="">
          <ReactQuill
  theme="snow"
  name="description"
  onChange={(value) => setDescription(value)}
  value={description}
/>
          </div>
          <input
            type="number"
            className="form-control"
            label="Entrer prix de produit"
            name="price"
            onChange={(e)=>setPrice(e.target.value)}
          />
          <select
            id=""
            className="py-3 mb-3 form-control"
            name="brand"
            onChange={(e)=>setBrand(e.target.value)}
          >
            <option value="">Select Marque</option>
            {brandState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
<select
placeholder="Select a category"
className="form-select mb-3"
onChange={(e) => setCategory(e.target.value)}
value={category}
>
<option value="">Select Category</option>
{CatState?.map((i, j) => {
return (
<option key={j} value={i.title}>
{i.title}
</option>
);
})}
</select>
<select
            id=""
            className="py-3 mb-3 form-control"
            name="tags"
            onChange={(e)=>setTags(e.target.value)}
          >
            <option value="" disabled>Select mot clé</option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
<div className="mb-3">
<label className="btn btn-outline-secondary col-md-12">
{photo ? photo.name : "Upload photo"}
<input type="file" name="photo" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} hidden />
</label>
</div>
<div className="mb-3">
{photo && (
<div className="text-center">
<img
                   src={URL.createObjectURL(photo)}
                   alt="product-photo"
                   height={200}
                   className="img img-responsive"
                 />
</div>
)}
</div>
<div className="mb-3">
<input
type="number"
value={quantite}
placeholder="Write a Quantity"
className="form-control"
onChange={(e) => setQuantite(e.target.value)}
/>
</div>

<div className="mb-3">
<button className="btn btn-primary" onClick={handleCreate}>Create Product</button>
</div>
</div>
</div>
</div>
</div>
</div>
);
};

export default TestProductImg;