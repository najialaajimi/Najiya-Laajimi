import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/config";


const register = async(userData)=>{
    const response = await axios.post(`${base_url}user/register`, userData);
    if (response.data) {
        if(response.data){
            return response.data;
        }
    }
}

const login = async(userData)=>{
    const response = await axios.post(`${base_url}user/loginuser`, userData);
    if (response.data) {
        localStorage.setItem("user" , JSON.stringify(response.data));
        return response.data;
    }
}

const getUserWishlist = async () => {
    const response = await axios.get(`${base_url}user/wishlist`, config);
    if (response.data) {
        return response.data;
    }
};

const addToCart = async (cartData) => {
    const response = await axios.post(`${base_url}user/cart`,cartData ,config);
    if (response.data) {
        return response.data;
    }
}

const getCart = async () => {
    const response = await axios.get(`${base_url}user/cart`,config);
    if (response.data) {
        return response.data;
    }
}

const removeProductFromcart = async (cartItemId) => {
    const response = await axios.delete(`${base_url}user/deletecart/${cartItemId}`,config);
    if (response.data) {
        return response.data;
    }
}

const updateProductQuantityFromCart= async (cartdetail) => {
    const response = await axios.delete(`${base_url}user/updatecart/${cartdetail.cartItemId}/${cartdetail.quantity}`,config);
    if (response.data) {
        return response.data;
    }
}

export const authService = {
    register,
    login, 
    getUserWishlist,
    addToCart,
    getCart,
    removeProductFromcart,
    updateProductQuantityFromCart,
}