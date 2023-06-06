import axios from 'axios'
import { base_url } from '../../utils/base_url'
import {config} from '../../utils/axiosconfig';


const getProductCategories = async() => {
    const response = await axios.get(`${base_url}category/`);
    return response.data;
};

const createCategory = async(cat) => {
    const response = await axios.post(`${base_url}category/`,cat,config);
    return response.data;
};

const updateProductCategory = async(category) => {
    console.log(category);
    const response = await axios.put(`${base_url}category/${category.id}`,{title: category.PCatData.title}, config);
    return response.data;
};

const getProductCategory = async(id) => {
    const response = await axios.get(`${base_url}category/${id}`,config);
    return response.data;
};
const deleteProductCategory = async(id) => {
    const response = await axios.delete(`${base_url}category/${id}`,config);
    return response.data;
};

const pCategoryService = {
    getProductCategories,
    createCategory ,
    updateProductCategory,
    getProductCategory,
    deleteProductCategory
};
export default pCategoryService;
