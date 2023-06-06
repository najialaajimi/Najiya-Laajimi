import React ,{useEffect , useState} from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTickets } from '../feature/ticket/ticketSlice';
import { BsEyeFill } from 'react-icons/bs';
import {Link} from'react-router-dom';
import { config } from '../utils/config';
import axios from 'axios';


const Tiketlist = () => {
  const [ticket, setTiket] = useState([]);

const getAllTicket = () => {
  axios.get("http://localhost:5000/api/ticket/getallTicket" , config)
    .then((res) => {
      console.log("employe", res.data);
      setTimeout(() => {
        setTiket(res.data);
      }, 1000);
    })
    .catch((err) => console.log(err));
};


useEffect(() => {
  getAllTicket();
}, []);
  return (
    <>
    <table className='table'>
      <thead>
      <tr>
        <td>N° Ticket</td>
        <td>Code Adherant</td>
        <td>Nom</td>
        <td>Date</td>
        <td>Type</td>
        <td>Sujet</td>
        <td>Status</td>
        <td>Action</td>
      </tr>
      </thead>
      {ticket.map((t,i) => (
      <tr className='text-center' key={t.key}>
        <td>{t.nTicket}</td>
        <td>{t.userId.codeAdherent}</td>
        <td>{t.userId.firstname}</td>
        <td>{new Date(t.createdAt).toLocaleString()}</td>
        <td>{t.type}</td>
        <td>{t.sujet}</td>
        <td className='badge pos-' style={{ backgroundColor: t.statut === 'ouvrir' ? 'red' : '#479f76' }}>
          {t.statut}
        </td>
        <td>
          <Link className='text-success text-center fs-3' to={`/user/list-tiket/${t._id}`}>
            <BsEyeFill/>
          </Link>
        </td>
      </tr>
    ))}
    </table>
    </>
  )
}

export default Tiketlist