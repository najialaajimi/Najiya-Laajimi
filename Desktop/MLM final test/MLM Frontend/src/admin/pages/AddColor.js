import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from "formik";
import { array, number, object, string } from "yup";
import { createColor, resetState , ColorName , updateColor, getColor} from "../features/color/colorSlice";


let schema = object({
  title: string().required("Saisir Couleur est obligatoire"),
});


const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getColorId = location.pathname.split("/")[3];
  const newcolor = useSelector((state) => state.coloradmin);
  const {isSuccess, isError, isLoading, createdColor ,ColorName ,updatedColor} = newcolor;
  useEffect(() =>{
    if (getColorId !== undefined) {
      dispatch(getColor(getColorId));
    }else{
      dispatch(resetState());
    }
  },[getColorId]);
  
  useEffect(()=>{
    if(isSuccess && createdColor){
      toast.success('Ajouter Couleur avec Succéss!');
    }
    if (isSuccess && updatedColor) {
      toast.success('Mise a jour couleur avec Succéss!');
      navigate("/admin/list-color");
    }
    if(isError){
      toast.error("Une erreur s'est produite. Veuillez réessayer!");
    }
  },[isSuccess, isError, isLoading, createdColor]);


  const formik = useFormik({
    enableReinitialize: true ,
    initialValues: {
      title: ColorName || ""
    },
    validationSchema: schema,
    onSubmit: (values) => {/* 
      alert(JSON.stringify(values)) */
      if (getColorId !== undefined) {
        const data= {id:getColorId, ColorData:values}
        dispatch(updateColor(data));
        dispatch(resetState());
      }else{
        dispatch(createColor(values));
        console.log(values)
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/list-color");
        },300); 
      }
    },
  });
  return (
    <div>
        <h3 className="mb-4 title_admin">{getColorId !== undefined ? "Mise a jour" : "Ajouter"}  Couleur</h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput type="color" label="Entrer Couleur" name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
            id="color" />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
                <button
            className="btn btn-success rounded-3 border-0 my-5"
            type="submit"
          >
            {getColorId !== undefined ? "Mise a jour" : "Ajouter"}  Couleur
          </button>
            </form>
        </div>
    </div>
  )
}

export default AddColor