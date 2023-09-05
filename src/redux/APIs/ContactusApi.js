import axios from "axios";

const token = localStorage.getItem("ADMIN");

const headersParam = {
    Authorization: `${token}`,
    Origin: "*",
};

// const baseUrl = "http://192.168.1.16:3000/api/";
const baseUrl = "https://api-v1.koliinfotech.com/api/";
// const baseUrl = process.env.REACT_APP_BASE_URL;

export const loadContactUsApi = async () => await axios.get(`${baseUrl}contactUs/getAll-contactUs`, { headers: headersParam });

export const getSingleContactApi = async (id) => await axios.get(`${baseUrl}contactUs/${id}/`,  { headers: headersParam });

export const deleteContactApi = async (deleteContact) => await axios.delete(`${baseUrl}contactUs/${deleteContact}/`, { headers: headersParam });


