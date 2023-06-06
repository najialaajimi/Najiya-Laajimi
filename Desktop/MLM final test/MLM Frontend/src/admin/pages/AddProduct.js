import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import {Select} from"antd";
import Dropzone from "react-dropzone";
import { useFormik } from "formik";
import { array, number, object, string } from "yup";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts, resetState } from "../features/product/productSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { config } from "../utils/axiosconfig";


let schema = object({
  title: string().required("Saisir titre de produit est obligatoire"),
  description: string().required("Saisir Description de produit est obligatoire"),
  price: number().required("Saisir prix est obligatoire"),
  brand: string().required("Saisir Marque est obligatoire"),
  category: string().required("Saisir Categorie est obligatoire"),
  tags: string().required("Saisir mot clés est obligatoire"),
  quantite: number().required("Quantite est obligatoire"),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [color, setColor] = useState([]);
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, []);

  const brandState = useSelector((state) => state.brandadmin.brands);
  const CatState = useSelector((state) => state.pCategoryadmin.pCategories);
  const colorState = useSelector((state) => state.coloradmin.colors);
  /* const imgState = useSelector((state) => state.uploadadmin.images); */
  /* const newProduct = useSelector((state) => state.productadmin); */
  
/*   const {isSuccess, isError, isLoading, createdProduct } = newProduct;
  useEffect(()=>{
    if(isSuccess && createdProduct){
      toast.success('Ajouter Produit avec Succéss!');
    }
    if(isError){
      toast.error("Une erreur s'est produite. Veuillez réessayer!");
    }
  },[isSuccess, isError, isLoading]); */

/* 
  const coloropt = [];
  colorState.forEach((i) => {
    coloropt.push({
      label: i.title,
      value: i._id,
    });
  }); */
  /* 
  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });
 */
/*   useEffect(() => {
    formik.values.color = color ? color : " ";
     formik.values.images = img; 
  },[color]); , img  */

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      tags:"",
      quantite: "",
      photo:""
    },
    validationSchema: schema,
    onSubmit: (values) => {/* 
      alert(JSON.stringify(values)) */
      /* dispatch(createProducts(values)); */
      formik.resetForm();
      setColor(null);
    },
  });
/*   const handleColors = (e) => {
    setColor(e);
    console.log(color)
  }
 */
  
const [category, setCategory] = useState("");
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [price, setPrice] = useState("");
const [quantite, setQuantity] = useState("");/* 
const [shipping, setShipping] = useState(""); */
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
    productData.append("tags", tags);
    productData.append("color", color);
    productData.append("photo", photo); // Déplacez cette ligne après les autres append

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      "http://localhost:5000/api/product/",
      productData,
      config
    );

    if (data?.success) {
      toast.success("Product Created Successfully");
      if (navigate) {
        navigate("/admin/list-product");
      }
    } else {
      toast.error(data?.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Something Went Wrong");
  }
};

  
  return (
    <div>
      <h3 className="mb-4 title_admin">Ajouter Product</h3>
      <div>
        <form
          /* onSubmit={formik.handleSubmit} */
          className="d-flex gap-3 flex-column"
        >
          <input
            type="text"
            className="form-control"
            label="Entrer titre de produit"
            name="title"
            placeholder="Sasir titre de produit"
            /* onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title} */
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="">
          <ReactQuill
  theme="snow"
  name="description"
  onChange={(value) => setDescription(value)}
  value={description}
/>
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <input
            type="number"
            className="form-control"
            label="Entrer prix de produit"
            name="price"
            /* onCh={formik.handleChange("price")}
            onBl={formik.handleBlur("price")}
            val={formik.values.price} */
            onChange={(e)=>setPrice(e.target.value)}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            id=""
            className="py-3 mb-3 form-control"
            name="brand"
           /*  onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand} */
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
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <select
            id=""
            className="py-3 mb-3 form-control"
            name="category"
            /* onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category} */
            onChange={(e)=>setCategory(e.target.value)}
          >
            <option value="">Select Categorie</option>
            {CatState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <select
            id=""
            className="py-3 mb-3 form-control"
            name="tags"
            /* onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            value={formik.values.tags} */
            onChange={(e)=>setTags(e.target.value)}
          >
            <option value="" disabled>Select mot clé</option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>
          <select
            id=""
            className="py-3 mb-3 form-control"
            name="color"
           /*  onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand} */
            onChange={(e)=>setColor(e.target.value)}
          >
            <option value="">Select Color</option>
            {colorState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>
          <input
            type="number"
            className=""
            label="Entrer le Quantité"
            name="quantite"
            /* onCh={formik.handleChange("quantite")}
            onBl={formik.handleBlur("quantite")}
            val={formik.values.quantite} */
            onChange={(e)=>setQuantity(e.target.value)}
          />
          <div className="error">
            {formik.touched.quantite && formik.errors.quantite}
          </div>
          {/* <div className="bg-white border-1 text-center p-5">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                    Faites glisser et déposez des fichiers ici, ou cliquez pour sélectionner des fichiers
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div> */}
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
          {/* <div className="showimages d-flex flex-wrap gap-3">
              {imgState?.map((i, j) => {
                return (
                  <div className="position-relative" key={j}>
                    <button type="button" onClick={() => dispatch(delImg(i.public_id))}
                      className="btn-close position-absolute"
                      style={{ top: "10px", right: "10px" }}
                    ></button>
                    <img src={i.url} alt="" width={200} height={200} />
                  </div>
                );
              })}
            </div> */}
          <button
            className="btn btn-success rounded-3 border-0 my-5"
            /* type="submit" */onClick={handleCreate}
          >
            Ajouter Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
/* 2:24:01 */
