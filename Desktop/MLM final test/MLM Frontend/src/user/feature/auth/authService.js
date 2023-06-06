import axios from 'axios'
import { base_url } from '../../utils/base_url'/* 
import {config} from'../../utils/axiosconfig' */
/* 
const getTokenFromLocalStorage = localStorage.getItem("user")
? JSON.parse(localStorage.getItem("user"))
:null;

const config = {
    headers: {
        'Authorization': `Bearer ${getTokenFromLocalStorage.token}`,
        'Accept'       : 'application/json'
       }
} */

const login = async(userData) => {
    const response = await axios.post(`${base_url}user/loginuser`, userData);
    if(response.data){
        localStorage.setItem("user" , JSON.stringify(response.data))
    }
    return response.data;
};

const authService = {
    login,
};
export default authService;
