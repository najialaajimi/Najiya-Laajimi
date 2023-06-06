import React, {useState, useEffect } from 'react'
import { Table } from 'antd';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { useDispatch ,useSelector} from 'react-redux';
import {Link} from'react-router-dom';
import { deleteCoupon, getCoupons, resetState } from '../features/coupon/couponSlice';
import CustomModal from "../components/CustomModal";

  //table
  const columns = [
    {
      title: '#',
      dataIndex: 'key',
    },
    {
      title: 'Nom',
      dataIndex: 'name',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.discount.length - b.discount.length,
    },
    {
      title: 'Expiry',
      dataIndex: 'expiry',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];

const Couponlist = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setcouponId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcouponId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  /* console.log(couponId); */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCoupons());
  },[]);
  const couponState = useSelector((state)=> state.couponadmin.coupons)
  const data1 = [];
  for (let i = 0; i < couponState.length; i++) {
    data1.push({
      key: i + 1,
      name: couponState[i].name,
      discount: couponState[i].discount,
      expiry: new Date( couponState[i].expiry).toLocaleString(),
      action:(<>
       <Link  className='text-danger fs-3' to={`/admin/coupon/${couponState[i]._id}`} ><BiEdit/></Link>
       <button
            className="text-danger fs-3 ms-3 bg-transparent border-0"
            onClick={() => showModal(couponState[i]._id)}
          >
            <AiFillDelete />
          </button>
      </>)
    });
  }
  const deleteCoupons = (e) => {
    dispatch(deleteCoupon(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCoupons());
    },100)
  }

  return (
    <div className="mt-4">
        <h3 className="mb-4 title_admin">Coupon list </h3>
        <div>
        <Table columns={columns} className='table' dataSource={data1} />
        </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction  ={() =>{deleteCoupons(couponId);} }
        title="Êtes-vous sûr de vouloir supprimer cette coupon ?"
      />
      </div>
  )
}

export default Couponlist