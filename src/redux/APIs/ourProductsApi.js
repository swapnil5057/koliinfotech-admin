import axios from "axios";

const token = localStorage.getItem("ADMIN");

const headersParam = {
    Authorization: `${token}`,
    Origin: "*",
};

const baseUrl = "https://api-v1.koliinfotech.com/api/";
// const baseUrl = process.env.REACT_APP_BASE_URL;

export const loadOurProductssApi = async () => await axios.get(`${baseUrl}ourProduct/getAll-ourProduct`, { headers: headersParam });

export const getSingleProductApi = async (id) => await axios.get(`${baseUrl}ourProduct/${id}/`,  { headers: headersParam });

export const addOurProductApi = async (newProduct) => await axios.post(`${baseUrl}ourProduct/create`, newProduct, { headers: headersParam });

export const deleteProductApi = async (deleteProduct) => await axios.delete(`${baseUrl}ourProduct/${deleteProduct}/`, { headers: headersParam });

export const updateProductApi = async (updateOurProduct) => await axios.put(`${baseUrl}ourProduct/${updateOurProduct.get("id")}`, updateOurProduct, { headers: headersParam });
