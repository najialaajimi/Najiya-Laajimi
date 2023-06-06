import axios from "axios";
import {config} from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url";

const getMeets = async() => {
    const response = await axios.get(`${base_url}meet/`,config);
    return response.data;
};


const meetService = {
    getMeets,
};
export default meetService;