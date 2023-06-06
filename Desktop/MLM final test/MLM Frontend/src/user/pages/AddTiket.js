import axios from "axios";
import React, { useState , useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { array, number, object, string } from "yup";
import { ToastContainer, toast } from 'react-toastify';
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createTicket } from "../feature/ticket/ticketSlice";


let schema = object({
  sujet: string().required("Saisir sujet est obligatoire"),
  description: string().required("Saisir Description de produit est obligatoire"),
  type: string().required("Saisir mot clés est obligatoire"),
});
const AddTiket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newTicket = useSelector((state) =>state.tickets);
  
  const {isSuccess, isError, isLoading, createdTicket } = newTicket;
  useEffect(()=>{
    if(isSuccess && createdTicket){
      toast.success('Ajouter Ticket avec Succéss!');
    }
    if(isError){
      toast.error("Une erreur s'est ticket. Veuillez réessayer!");
    }
  },[isSuccess, isError, isLoading]);
  const formik = useFormik({
    initialValues: {
      sujet: "",
      description: "",
      type:"",
    },
    validationSchema: schema,
    onSubmit: (values) => {/* 
      alert(JSON.stringify(values)) */
      dispatch(createTicket(values));
      formik.resetForm();
    },
  });
  return (
    <div className="col-12">
      <div className="d-flex justify-content-center ">
        <div>
          <h3 className="contact-title mb-4">Ticket</h3>
          <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
            <select
            id=""
            className="py-3 mb-3 form-control"
            name="type"
            onChange={formik.handleChange("type")}
            onBlur={formik.handleBlur("type")}
            value={formik.values.type}
          >
            <option value="" disabled>Select mot clé</option>
            <option value="avis">avis</option>
            <option value="assisstance">assisstance</option>
          </select>
          <div className="error">
            {formik.touched.type && formik.errors.type}
          </div>
          <CustomInput
            type="text"
            className=""
            label="Entrer sujet"
            name="sujet"
            onCh={formik.handleChange("sujet")}
            onBl={formik.handleBlur("sujet")}
            val={formik.values.sujet}
          />
          <div className="error">
            {formik.touched.sujet && formik.errors.sujet}
          </div>
          <div className="">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
              <button
                className="btn btn-success rounded-3 border-0 my-3"
                type="submit"
              >
                Envoyer
              </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTiket;
