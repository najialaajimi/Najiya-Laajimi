import axios from "axios";
import {config} from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url";

const createMeet = async(meet) => {
    const response = await axios.post(`${base_url}meet/`,meet,config);
    return response.data;
};
const getMeets = async() => {
    const response = await axios.get(`${base_url}meet/`,config);
    return response.data;
};


const meetService = {
    createMeet,
    getMeets,
};
export default meetService;