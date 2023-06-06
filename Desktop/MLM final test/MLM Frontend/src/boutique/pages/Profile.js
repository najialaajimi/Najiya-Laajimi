import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../features/user/userSlice";
import { FiEdit } from "react-icons/fi";

const ProfileSchema = yup.object({
  firstname: yup.string().required("Nom est obligatoire"),
  lastname: yup.string().required("Prénom est obligatoire"),
  email: yup
    .string()
    .email("Email est obligatoire")
    .required("Email est obligatoire"),
  mobile: yup.string().required("Numéro téléphone est obligatoire"),
});

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.authweb.user);
  const[edit , setEdit] = useState(true)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: userState?.firstname,
      lastname: userState?.lastname,
      email: userState?.email,
      mobile: userState?.mobile,
    },
    validationSchema: ProfileSchema,
    onSubmit: (values) => {
        dispatch(updateProfile(values));
        setEdit(true)
      /* 
           dispatch(loginUser(values)); 
           navigate("/user"); */
      /* alert(JSON.stringify(values)); */
    },
  });
  return (
    <>
      <BreadCrumb title="My Profile" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
            <div className="col-12">
                <div className="d-flex justify-content-between align-items-center">
                    <h3 className="my-3" >Modifier Profile</h3>
                    <FiEdit className="fs-3" onClick={() => setEdit(false)} />
                </div>
            </div>
          <div className="col-12">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="example1" className="form-label">
                  Nom
                </label>
                <input
                  type="text"
                  name="firstname"
                  className="form-control"
                  id="example1"
                  disabled={edit}
                  value={formik.values.firstname}
                  onChange={formik.handleChange('firstname')}
                  onBlur={formik.handleBlur('firstname')}
                />
                <div className="error">
                    {formik.touched.firstname && formik.errors.firstname}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="example2" className="form-label">
                  Prénom
                </label>
                <input
                  type="text"
                  name="lastname"
                  className="form-control"
                  id="example2"
                  disabled={edit}
                  value={formik.values.lastname}
                  onChange={formik.handleChange('lastname')}
                  onBlur={formik.handleBlur('lastname')}
                />
                <div className="error">
                    {formik.touched.lastname && formik.errors.lastname}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  disabled={edit}
                  aria-describedby="emailHelp"
                  value={formik.values.email}
                  onChange={formik.handleChange('email')}
                  onBlur={formik.handleBlur('email')}
                />
                <div className="error">
                    {formik.touched.email && formik.errors.email}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="example3" className="form-label">
                  N° Télephone
                </label>
                <input
                  type="text"
                  name="mobile"
                  className="form-control"
                  id="example3"
                  disabled={edit}
                  value={formik.values.mobile}
                  onChange={formik.handleChange('mobile')}
                  onBlur={formik.handleBlur('mobile')}
                />
                <div className="error">
                    {formik.touched.mobile && formik.errors.mobile}
                </div>
              </div>{edit === false && 
              <button type="submit" className="btn btn-primary">
                Save
              </button>}
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
