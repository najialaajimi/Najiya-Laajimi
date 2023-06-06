import axios from "axios";
import {config} from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url";

const createTicket = async(ticket) => {
    const response = await axios.post(`${base_url}ticket/`,ticket,config);
    return response.data;
};
const getTickets = async() => {
    const response = await axios.get(`${base_url}ticket/`,config);
    return response.data;
};
const getAticket = async(id)=>{
    const response = await axios.get(`${base_url}ticket/${id}`,config);
    if (response.data) {
        return response.data;
    }
}


const ticketService = {
    createTicket,
    getTickets,
    getAticket,
};
export default ticketService;