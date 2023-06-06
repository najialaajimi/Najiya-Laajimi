import React ,{useEffect} from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMeets } from '../features/Event/eventSlice';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineSlowMotionVideo } from 'react-icons/md';

const columns = [
    {
      title: '#',
      dataIndex: 'key',
    },
    {
      title: 'Code Event',
      dataIndex: 'uid',
    },
    {
      title: 'Sujet',
      dataIndex: 'title',
    },
    {
      title: 'Nom',
      dataIndex: 'firstname',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Heure',
      dataIndex: 'time',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];


const ListEvent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMeets());
  },[]);
  const MeetState = useSelector((state) => state.meetadmin.meets);
  const data1 = [];
  for (let i = 0; i < MeetState.length; i++) {
    data1.push({
      key: i + 1,
      uid: MeetState[i].uid,
      title: MeetState[i].title,
      firstname: MeetState[i].userId.firstname,
      date: MeetState[i].date,
      time: MeetState[i].time,
      action:(<><Link  className='text-success text-center fs-3' to={`/admin/meet/${MeetState[i]._id}`} > <AiOutlineEdit /> </Link>
      <Link className='text-info text-center fs-3 ms-3' to="https://meet.jit.si/CulturalLitresOrganizeFundamentally" > <MdOutlineSlowMotionVideo /> </Link>
      </>
      )
    });
  }
  return (
    <>
    <Table columns={columns} className='table' dataSource={data1}/>
    </>
  )
}

export default ListEvent