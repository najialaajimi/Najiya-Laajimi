import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from '../features/customers/customerSlice';

  //table
  const columns = [
    {
      title: '#',
      dataIndex: 'key',
    },
    {
      title: 'Nom',
      dataIndex: 'firstname',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.firstname.length - b.firstname.length,
    },
    {
      title: 'Prenom',
      dataIndex: 'lastname',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.lastname.length - b.lastname.length,
    },
    {
      title: 'Emails',
      dataIndex: 'email',
    },
    {
      title: 'Telephone',
      dataIndex: 'mobile',
    },
  ];
  


const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers())
  });
  const customerstate = useSelector((state)=>state.customeradmin.customers);
  const data1 = [];
  for (let i = 0; i < customerstate.length; i++) {
    if(customerstate[i].role !== "admin"){
      data1.push({
        key: i + 1,
        firstname: customerstate[i].firstname ,
        lastname: customerstate[i].lastname,
        email:customerstate[i].email,
        mobile: customerstate[i].mobile,
      });
    }
  }
  const { data } = customerstate;
  return (
    <div className="mt-4">
        <h3 className="mb-4 title_admin">Clients </h3>
        <div>
        <Table columns={columns} className='table' dataSource={data1} />
        </div>
      </div>
  )
}

export default Customers


/* 
  const onChange = (pagination, filters, sorter, extra)=>{
    console.log("params", pagination, filters, sorter, extra)
  }  tzid t7ot fi balise table onchange ={onChange}*/