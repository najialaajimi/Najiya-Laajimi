import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from "formik";
import { array, number, object, string } from "yup";
import { createCategory, getProductCategory, resetState ,updateProductCategory} from "../features/pcategory/pcategorySlice";

let schema = object({
  title: string().required("category Names is required"),
});

const AddCategory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getPCatId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const newcategory = useSelector((state) => state.pCategoryadmin);
  const {isSuccess, isError, isLoading, createdCategory, updatedCategory,CategoryName } = newcategory;
  useEffect(() =>{
    if (getPCatId !== undefined) {
      dispatch(getProductCategory(getPCatId));
    }else{
      dispatch(resetState());
    }
  },[getPCatId]);
  useEffect(()=>{
    if(isSuccess && createdCategory){
      toast.success('Ajouter categorie avec Succéss!');
    }
    if (isSuccess && updatedCategory) {
      toast.success('Mise a jour categorie avec Succéss!');
      navigate("/admin/list-category");
    }
    if(isError){
      toast.error("Une erreur s'est produite. Veuillez réessayer!");
    }
  },[isSuccess, isError, isLoading, createdCategory]);


  const formik = useFormik({
    enableReinitialize: true ,
    initialValues: {
      title: CategoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getPCatId !== undefined) {
        const data= {id:getPCatId, PCatData:values}
        dispatch(updateProductCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        },300);
      }
    },
  });
  return (
    <div>
        <h3 className="mb-4 title_admin">{getPCatId !== undefined ? "Mise a jour" : "Ajouter"} Categorie</h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput type="text" label="Entrer Categorie" 
                name="title"
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
            {getPCatId !== undefined ? "Mise a jour" : "Ajouter"} Categorie
          </button>
            </form>
        </div>
    </div>
  )
}

export default AddCategory