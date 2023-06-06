import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from "formik";
import { array, number, object, string } from "yup";
import { createBrand, getBrand, resetState, updateBrand } from "../features/brand/brandSlice";


let schema = object({
  title: string().required("Saisir Marque est obligatoire"),
});


const AddBrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getBrandId = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state.brandadmin);
  const {isSuccess, isError, isLoading, createdBrand, BrandName ,updatedBrand} = newBrand;
  useEffect(() =>{
    if (getBrandId !== undefined) {
      dispatch(getBrand(getBrandId));
    }else{
      dispatch(resetState());
    }
  },[getBrandId]);
  const navigate = useNavigate();
  useEffect(()=>{
    if(isSuccess && createdBrand){
      toast.success('Ajouter Marque avec Succéss!');
    }
    if (isSuccess && updatedBrand) {
      toast.success('Mise a jour Marque avec Succéss!');
      navigate("/admin/list-brand");
    }
    if(isError){
      toast.error("Une erreur s'est produite. Veuillez réessayer!");
    }
  },[isSuccess, isError, isLoading]);


  const formik = useFormik({
    enableReinitialize: true ,
    initialValues: {
      title: BrandName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBrandId !== undefined) {
        const data= {id:getBrandId, brandData:values}
        dispatch(updateBrand(data));
        dispatch(resetState());
      } else {
        dispatch(createBrand(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        },1000);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title_admin">{getBrandId !== undefined ? "Mise a jour" : "Ajouter"} Marque</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput type="text" label="Entrer Titre de Marque" id="brand" name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}/>
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
          <button
            className="btn btn-success rounded-3 border-0 my-5"
            type="submit"
          >
            {getBrandId !== undefined ? "Mise a jour" : "Ajouter"} Marque
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
