import React, { useEffect } from 'react'
import { Table } from 'antd';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { useDispatch ,useSelector} from 'react-redux';
import {Link} from'react-router-dom';
import { getOrders } from '../features/auth/authSlice';

  //table
  const columns = [
    {
      title: '#',
      dataIndex: 'key',
    },
    {
      title: 'Nom',
      dataIndex: 'firstname',
    },
    {
      title: 'Produit',
      dataIndex: 'product',
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


const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  },[]);
  const orderState = useSelector((state)=>state.authadmin.orders)
  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1 ,
      firstname: orderState[i].orderby.firstname,
      product: <Link to={`/admin/orders/${orderState[i].orderby._id}`} >
        View Orders
      </Link> /*  orderState[i].products.map((i ,j) => {
        return (
        <ul key={j}>
          <li>{ i.product.title }</li>
          </ul>);
      }), */,
      amount: orderState[i].payementIntent.amount,
      date: new Date(orderState[i].createdAt).toLocaleString(),
      action:(<>
        <Link  className='text-danger fs-3' to="/" ><BiEdit/></Link>
       <Link  className='text-danger fs-3 ms-3' to="/"><AiFillDelete/></Link>
       </>)
    });
  }
  return (
    <div className="mt-4">
        <h3 className="mb-4 title_admin">Orders </h3>
        <div>
        <Table columns={columns} className='table' dataSource={data1} />
        </div>
      </div>
  )
}

export default Orders