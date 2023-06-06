import React, { useEffect } from 'react'
import { Table } from 'antd';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { useDispatch ,useSelector} from 'react-redux';
import {Link, useLocation} from'react-router-dom';
import { getOrderByUser, getOrders } from '../features/auth/authSlice';

  //table
  const columns = [
    {
      title: 'SNo',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Count',
      dataIndex: 'count',
    },
    {
      title: 'Couleur',
      dataIndex: 'color',
    },
    {
      title: 'Montant',
      dataIndex: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];


const ViewOrder = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getOrderByUser(userId));
    },[]);
    const orderState = useSelector((state)=>state.authadmin.orderbyuser.products)
    console.log(orderState);
    const data1 = [];
    for (let i = 0; i < orderState.length; i++) {
      data1.push({
        key: i + 1 ,
        name: orderState[i].product.title,
        count:orderState[i].count,
        amount:  orderState[i].product.price,
        color:  orderState[i].product.color,
        date:  orderState[i].product.createdAt,
        action:(<>
          <Link  className='text-danger fs-3' to="/" ><BiEdit/></Link>
         <Link  className='text-danger fs-3 ms-3' to="/"><AiFillDelete/></Link>
         </>)
      });
    } 
    return (
      <div className="mt-4">
          <h3 className="mb-4 title_admin">Afficher les commandes des utilisateurs </h3>
          <div>
          <Table columns={columns} className='table' dataSource={data1} />
          </div>
        </div>
    )
  }
  

export default ViewOrder