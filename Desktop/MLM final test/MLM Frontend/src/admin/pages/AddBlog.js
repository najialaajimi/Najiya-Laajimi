import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import { array, number, object, string } from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import {
  createBlog,
  getBlog,
  resetState,
  updateBlog,
} from "../features/blogs/blogSlice";
import { getCategories } from "../features/bcategory/bcategorySlice";

let schema = object({
  title: string().required("Saisir Titre est obligatoire"),
  description: string().required("Saisir Description est obligatoire"),
  category: string().required("Select Categorie est obligatoire"),
});

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /* const [images, setImages] = useState([]); */
  const location = useLocation();
  const getBlogID = location.pathname.split("/")[3];
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (getBlog !== undefined) {
      dispatch(getBlog(getBlogID));
    } else {
      dispatch(resetState());
    }
  }, [getBlogID]);

  const imgState = useSelector((state) => state.uploadadmin.images);
  const bCatState = useSelector((state) => state.bCategoryadmin.bCategories);
  const blogState = useSelector((state) => state.blogadmin);

  const { isSuccess, isError, isLoading, createdBlog, updatedBlog, BlogName,BlogDesc,BlogCategory,BlogImages } =
    blogState;
  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Ajouter Blog avec Succées!");
    }
    if (isSuccess && updatedBlog) {
      toast.success("Mise a jour Blog Succés!");
      navigate("/admin/blog-list");
    }
    if (isError) {
      toast.error("Une erreur s'est produite. Veuillez réessayer!");
    }
  }, [isSuccess, isError, isLoading]);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
  }, [img]);
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: BlogName || "",
      description: BlogDesc || "",
      category: BlogCategory || "",
      images: BlogImages || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogID !== undefined) {
        const data = { id: getBlogID, BlogData: values };
        dispatch(updateBlog(data));
        dispatch(resetState());
      } else {
        /* 
        alert(JSON.stringify(values)) */
        dispatch(createBlog(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/blog-list");
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title_admin">
        {getBlogID !== undefined ? "Mise a jour" : "Ajouter"} Blog
      </h3>
      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <CustomInput
              type="text"
              className=""
              label="Entrer titre blog"
              name="title"
              onCh={formik.handleChange("title")}
              onBl={formik.handleBlur("title")}
              val={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
          </div>
          <select
            id=""
            className="py-3 mb-3 mt-3 form-control"
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
          >
            {" "}
            <option value="">Select Blog Category</option>
            {bCatState.map((i, j) => {
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
          <div className="">
            <ReactQuill
              theme="snow"
              className="mb-3 mt-3"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <div className="bg-white border-1 text-center p-5">
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
          </div>

          <div className="showimages d-flex flex-wrap gap-3">
            {imgState?.map((i, j) => {
              return (
                <div className="position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-success rounded-3 border-0 my-5"
            type="submit"
          >
            {getBlogID !== undefined ? "Mise a jour" : "Ajouter"} Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
