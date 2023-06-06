import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteEnquiry,
  getEnquiries,
  resetState,
  updateEnquiry,
} from "../features/enquiry/enquirySlice";
import CustomModal from "../components/CustomModal";

//table
const columns = [
  {
    title: "#",
    dataIndex: "key",
  },
  {
    title: "Nom",
    dataIndex: "name",
  },
  {
    title: "email",
    dataIndex: "email",
  },
  {
    title: "Telephone",
    dataIndex: "mobile",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const Enquiries = () => {
  const [open, setOpen] = useState(false);
  const [enqId, setenqId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setenqId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEnquiries());
    dispatch(resetState());
  }, []);
  const enqState = useSelector((state) => state.enquiryadmin.enquiries);
  const data1 = [];
  for (let i = 0; i < enqState.length; i++) {
    data1.push({
      key: i + 1,
      name: enqState[i].name,
      email: enqState[i].email,
      mobile: enqState[i].mobile,
      status: (
        <>
          <div className="d-flex align-items-center gap-3">
            <h6 className="mb-0">Change Status :</h6>
            <div>
              <select
                name=""
                id=""
                defaultValue={
                  enqState[i].status ? enqState[i].status : "Submitted"
                }
                className="form-control form-select"
                onChange={(e) => setEnquiryStatus(e.target.value , enqState[i]._id)}
              >
                <option value="Submitted">Submitted</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progresse">In Progresse</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
        </>
      ),
      action: (
        <>
          <Link
            className="text-danger fs-3"
            to={`/admin/enquiries/${enqState[i]._id}`}
          >
            <AiOutlineEye />
          </Link>
          <button
            className="text-danger fs-3 ms-3 bg-transparent border-0"
            onClick={() => showModal(enqState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const setEnquiryStatus = (e , i) => {
    console.log(e , i);
    const data = { id:i , EnqData:e};
    dispatch(updateEnquiry(data))
  }
  const deleteEnquiries = (e) => {
    dispatch(deleteEnquiry(e));
    console.log(e);
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100);
  };
  return (
    <div className="mt-4">
      <h3 className="mb-4 title_admin">Enquiries</h3>
      <div>
        <Table columns={columns} className='table' dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteEnquiries(enqId);
        }}
        title="Êtes-vous sûr de vouloir supprimer cette Enquiries ?"
      />
    </div>
  );
};

export default Enquiries;
