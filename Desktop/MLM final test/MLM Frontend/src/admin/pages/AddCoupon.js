import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import { array, date, number, object, string } from "yup";
import {
  createCoupon,
  getCoupon,
  resetState,
  updateCoupon,
} from "../features/coupon/couponSlice";

let schema = object({
  name: string().required("Saisir Coupon est obligatoire"),
  expiry: date().required("Saisir Expiry date est obligatoire"),
  discount: number().required("Saisir Discount percentage est obligatoire"),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCouponId = location.pathname.split("/")[3];
  const newCoupon = useSelector((state) => state.couponadmin);

  const {
    isSuccess,
    isError,
    isLoading,
    createdCoupon,
    CouponName,
    CouponDiscount,
    CouponExpiry,
    updatedCoupon,
  } = newCoupon;

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getCoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [getCouponId]);
  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Ajouter Coupon avec Succéss!");
    }
    if (isSuccess && updatedCoupon) {
      toast.success("Mise a jour Coupon avec Succéss!");
      navigate("/admin/coupon-list");
    }
    if (isError) {
      toast.error("Une erreur s'est produite. Veuillez réessayer!");
    }
  }, [isSuccess, isError, isLoading]);

  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [year, month, day]= newDate.split("/");
    return [year, month, day].join("-");
  };
  console.log(CouponExpiry);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: CouponName || "",
      expiry: changeDateFormat(CouponExpiry) || "" /* CouponExpiry || */,
      discount: CouponDiscount || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      /* 
      alert(JSON.stringify(values)) */
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values };
        dispatch(updateCoupon(data));
        dispatch(resetState());
      } else {
        dispatch(createCoupon(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          navigate("/admin/coupon-list");
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title_admin">
        {getCouponId !== undefined ? "Mise a jour" : "Ajouter"} Coupon
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Entrer title coupon"
            id="name"
            name="name"
            onCh={formik.handleChange("name")}
            onBl={formik.handleBlur("name")}
            val={formik.values.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="date"
            label="Entrer Expiry date"
            id="date"
            name="expiry"
            onCh={formik.handleChange("expiry")}
            onBl={formik.handleBlur("expiry")}
            val={formik.values.expiry}
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <CustomInput
            type="number"
            label="Entrer Discount"
            id="discount"
            name="discount"
            onCh={formik.handleChange("discount")}
            onBl={formik.handleBlur("discount")}
            val={formik.values.discount}
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button
            className="btn btn-success rounded-3 border-0 my-5"
            type="submit"
          >
            {getCouponId !== undefined ? "Mise a jour" : "Ajouter"} Coupon
          </button>
        </form>
      </div>
    </div>
  );
}; /* 29:51 */

export default AddCoupon;
