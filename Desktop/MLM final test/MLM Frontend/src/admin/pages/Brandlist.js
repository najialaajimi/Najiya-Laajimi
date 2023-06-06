import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteBrand, getBrands, resetState } from "../features/brand/brandSlice";
import CustomModal from "../components/CustomModal";

//table
const columns = [
  {
    title: "#",
    dataIndex: "key",
  },
  {
    title: "Titre",
    dataIndex: "title",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Brandlist = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setbrandId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setbrandId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  /* console.log(brandId); */

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
  }, []);
  const brandState = useSelector((state) => state.brandadmin.brands);
  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i + 1,
      title: brandState[i].title,
      action: (
        <>
          <Link
            className="text-danger fs-3"
            to={`/admin/brand/${brandState[i]._id}`}
          >
            <BiEdit />
          </Link>
          <button
            className="text-danger fs-3 ms-3 bg-transparent border-0"
            onClick={() => showModal(brandState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteBrands = (e) => {
    dispatch(deleteBrand(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());
    },100)
  }
  return (
    <div className="mt-4">
      <h3 className="mb-4 title_admin">Marque list </h3>
      <div>
        <Table columns={columns} className='table' dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction  ={() =>{deleteBrands(brandId);} }
        title="Êtes-vous sûr de vouloir supprimer cette Marque ?"
      />
    </div>
  );
};

export default Brandlist;
/* 18/:50 */