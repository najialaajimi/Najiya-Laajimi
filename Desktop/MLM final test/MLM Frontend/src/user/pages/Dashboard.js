import React from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from 'antd';


const Dashboard = () => {
  //statistique
  const data = [
    {
      type: "Jan",
      sales: 38,
    },
    {
      type: "Fev",
      sales: 52,
    },
    {
      type: "Mar",
      sales: 61,
    },
    {
      type: "Apr",
      sales: 145,
    },
    {
      type: "Mai",
      sales: 48,
    },
    {
      type: "Jui",
      sales: 38,
    },
    {
      type: "Jul",
      sales: 38,
    },
    {
      type: "Aug",
      sales: 38,
    },
    {
      type: "Sep",
      sales: 38,
    },
    {
      type: "Oct",
      sales: 38,
    },
    {
      type: "Nov",
      sales: 38,
    },
    {
      type: "Dec",
      sales: 38,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
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
      title: 'Product',
      dataIndex: 'product',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];
  const data1 = [];
  for (let i = 0; i < 46; i++) {
    data1.push({
      key: i,
      name: `Edward King ${i}`,
      product: 32,
      status: `London, Park Lane no. ${i}`,
    });
  }
  
  return (
    <div>
      <h3 className="mb-4 title_admin">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc_admin">Total</p>
            <h4 className="mb-0 sub-title_admin">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0 desc_admin">Compared To Appril 2022</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc_admin">Total</p>
            <h4 className="mb-0 sub-title_admin">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowUpRight /> 32%
            </h6>
            <p className="mb-0 desc_admin">Compared To Appril 2022</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc_admin">Total</p>
            <h4 className="mb-0 sub-title_admin">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0 desc_admin">Compared To Appril 2022</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5">Income Statics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5">Recent Orders</h3>
        <div>
        <Table columns={columns} dataSource={data1} />
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
