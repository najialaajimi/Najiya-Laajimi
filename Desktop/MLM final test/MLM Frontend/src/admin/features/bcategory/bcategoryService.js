import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getBlogCategories = async () => {
  const response = await axios.get(`${base_url}blogcategory/`);
  return response.data;
};

const createBCategory = async (bcat) => {
  const response = await axios.post(`${base_url}blogcategory/`, bcat, config);
  return response.data;
};

const updateBCategory = async (bcat) => {
  const response = await axios.put(
    `${base_url}blogcategory/${bcat.id}`,
    { title: bcat.BcategoryData.title },
    config
  );
  return response.data;
};

const getBCategory = async (id) => {
  const response = await axios.get(`${base_url}blogcategory/${id}`, config);
  return response.data;
};
const deleteBCategory = async (id) => {
  const response = await axios.delete(`${base_url}blogcategory/${id}`, config);
  return response.data;
};

const bCategoryService = {
  getBlogCategories,
  createBCategory,
  updateBCategory,
  getBCategory,
  deleteBCategory,
};
export default bCategoryService;
