import axios from "axios";
import {config} from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url";

const createTicket = async(ticket) => {
    const response = await axios.post(`${base_url}ticket/`,ticket,config);
    return response.data;
};
const getTickets = async () => {
    const response = await axios.get(`${base_url}ticket/getallTicket`,config);
    return response.data;
};
const getSingleTickets = async (id) => {
    const response = await axios.get(`${base_url}ticket/singleticket/${id}`,config);
    return response.data;
};
const AddDescription = async(id,data) => {
    const response = await axios.post(`${base_url}ticket/${id}`,data,config);
    return response.data;
};


const ticketService = {
    createTicket,
    getTickets,
    getSingleTickets,
    AddDescription,
};
export default ticketService;