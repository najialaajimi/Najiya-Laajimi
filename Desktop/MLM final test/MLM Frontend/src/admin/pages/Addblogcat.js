import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import { array, number, object, string } from "yup";
import {
  createBcategory,
  getBcategory,
  resetState,
  updateBcategory,
} from "../features/bcategory/bcategorySlice";

let schema = object({
  title: string().required("Saisir Titre de blog categorie est obligatoire"),
});

const Addblogcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBCatId = location.pathname.split("/")[3];
  const newBlogCategory = useSelector((state) => state.bCategoryadmin);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBcategories,
    BcategoryName,
    updatedBcategory,
  } = newBlogCategory;
  useEffect(() => {
    if (getBCatId !== undefined) {
      dispatch(getBcategory(getBCatId));
    } else {
      dispatch(resetState());
    }
  },[getBCatId]);
  useEffect(() => {
    if (isSuccess && createdBcategories) {
      toast.success("Ajouter Blog category avec Succéss!");
    }
    if (isSuccess && updatedBcategory) {
      toast.success('Mise a jour Blog de Categorie avec succéss!');
      navigate("/admin/blog-category-list");
    }
    if (isError) {
      toast.error("Une erreur s'est produite. Veuillez réessayer!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true ,
    initialValues: {
      title: BcategoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      /* 
      alert(JSON.stringify(values)) */
      if (getBCatId !== undefined) {
        const data={id:getBCatId , BcategoryData:values}
        dispatch(updateBcategory(data));
        dispatch(resetState());
      } else {
        dispatch(createBcategory(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/blog-category-list");
      }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title_admin">{getBCatId !== undefined ? "Mise a jour" : "Ajouter"} Blog Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter titre blog de categorie"
            id="bcat"
            name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success rounded-3 border-0 my-5"
            type="submit"
          >
            {getBCatId !== undefined ? "Mise a jour" : "Ajouter"} Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblogcat;
