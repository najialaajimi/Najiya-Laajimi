import React ,{useState , useEffect}from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { config } from "../utils/axiosconfig";
import { array, number, object, string } from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { getTicketsById } from '../features/ticketadmin/ticketSlice';
import { descTicket } from '../features/ticketadmin/ticketSlice';
import axios from 'axios';


let ticketschema = object({
  description: string().required("Saisir Description est obligatoire"),
});

const initialState = {
  description: "",
};
const SingleTicket = () => {

  const [ticket, setTicket] = useState(initialState);
  const [tickets, setTickets] = useState([]);
  const location = useLocation();
  const id = location.pathname;

  const getTickets = async () => {
    const ch = id.substr(13, id.length);
    try {
      const response = await axios.get(`http://localhost:5000/api/ticket/singleticket/${ch}`, config);
      console.log("ticket", response.data);
      setTickets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ch = id.substr(13, id.length);
    tickets.description.push(ticket);

    try {
      const response = await axios.post(`http://localhost:5000/api/ticket/${ch}/desc`, ticket,config);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="ticket my-5">
        <div>
          <h3 className="mb-5 text-center">
            <b className="fs-3">Ticket :</b> {tickets.nTicket}
          </h3>
          <div className="row">
            <div className="col-4">
              <p className="text-start">
                <b className="fs-6">Type :</b> {tickets.type}
              </p>
            </div>
            <div className="col-4">
              <p className="text-center ">
                <b className="fs-6">Sujet :</b> {tickets.sujet}
              </p>
            </div>
            <div className="col-4">
              <p className="text-end  mb-0">
                <b className="fs-6">Status : </b>
                <span className="badge rounded-pill fs-6 text-bg-success ">
                  {tickets.statut}
                </span>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <b className="fs-6">Message :</b>
              <br />
              <div >{tickets?.description?.map((m,i)=>(
                <div className="ticketdesc" key={i}>
                     <p className="text-start ms-3" dangerouslySetInnerHTML={{ __html: m.description}}></p>
                     <p className="text-end me-3">
                       <b>{new Date(m.createdAt).toLocaleString()}</b>
                     </p>
                </div>
                    
              ))}
               
              </div>
            </div>
          </div>
        </div>

        <br />
        <textarea type="text" className="w-100 form-control"
                    cols="30"
                    rows="4" name="description" onChange={handleChangeInput} />
       
        <br />
        <div className="row">
          <div className="col-4">
            <button className="buttonTicket text-start" onClick={handleSubmit}>
              Envoyer Reponse
            </button>
          </div>
          <div className="d-flex changeStatus col-4 align-items-center gap-3 text-end">
            <h6 className="mb-0">
              <b>Change Status :</b>
            </h6>
            <div>
              <select name="" id="" className="form-control form-select">
                <option value="etat">---Etat---</option>
                <option value="ouvert">Ouvrir</option>
                <option value="fermer">Fermer</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleTicket