import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getEnquiry, resetState, updateEnquiry } from "../features/enquiry/enquirySlice";
import { BiArrowBack } from "react-icons/bi";

const ViewEnq = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getEnqId = location.pathname.split("/")[3];
  const enqState = useSelector((state) => state.enquiryadmin);
  const { EnqName, EnqEmail, EnqMobile, EnqComment, EnqStatus } = enqState;

  useEffect(() => {
    dispatch(getEnquiry(getEnqId));
  }, [getEnqId]);
  console.log(EnqName, EnqEmail, EnqMobile, EnqComment, EnqStatus);
  const goBack = () => {
    navigate(-1);
  };
  const setEnquiryStatus = (e, i) => {
    console.log(e, i);
    const data = { id: i, EnqData: e };
    dispatch(updateEnquiry(data));
    dispatch(resetState());
    setTimeout(() => {
        dispatch(getEnquiry(getEnqId));
    },100)
  };
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title_admin">View Enquiries</h3>
        <button
          className="bg-transparent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
          onClick={goBack}
        >
          {" "}
          <BiArrowBack className="fs-5" /> Retourner
        </button>
      </div>
      <div className="mt-5 bg-white p-4 rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Nom :</h6>
          <p className="mb-0">{EnqName}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Telephone :</h6>
          <p className="mb-0">
            <a href={`tel:+91 ${EnqMobile}`}>{EnqMobile}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Email :</h6>
          <p className="mb-0">
            <a href={`mailto:${EnqEmail}`}>{EnqEmail}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Commentaire :</h6>
          <p className="mb-0">{EnqComment}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Status :</h6>
          <p className="mb-0">{EnqStatus}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Change Status :</h6>
          <div>
            <select
              name=""
              id=""
              className="form-control form-select"

            >
            <option value="etat">---Etat---</option>
            <option value="ouvert">Ouvrir</option>
            <option value="fermer">Fermer</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEnq;
