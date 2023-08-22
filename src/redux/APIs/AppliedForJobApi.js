import axios from "axios";

const token = localStorage.getItem("ADMIN");

const headersParam = {
    Authorization: `${token}`,
    Origin: "*",
};

const baseUrl = "http://192.168.1.16:3000/api/";
// const baseUrl = process.env.REACT_APP_BASE_URL;

export const loadAppliedForJobApi = async () => await axios.get(`${baseUrl}applyjob/getAll/`, { headers: headersParam });

export const getSingleAppliedApi = async (id) => await axios.get(`${baseUrl}applyjob/${id}/`,  { headers: headersParam });

export const deleteAppliedApi = async (deleteContact) => await axios.delete(`${baseUrl}applyjob/${deleteContact}/`, { headers: headersParam });

