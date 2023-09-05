import axios from "axios";

const token = localStorage.getItem("ADMIN");

const headersParam = {
    Authorization: `${token}`,
    Origin: "*",
};

const baseUrl = "https://api-v1.koliinfotech.com/api/";
// const baseUrl = process.env.REACT_APP_BASE_URL;

export const loadAppliedForJobApi = async () => await axios.get(`${baseUrl}applyjob/getAll/`, { headers: headersParam });

export const getSingleAppliedApi = async (id) => await axios.get(`${baseUrl}applyjob/${id}/`,  { headers: headersParam });

export const deleteAppliedApi = async (deleteContact) => await axios.delete(`${baseUrl}applyjob/${deleteContact}/`, { headers: headersParam });

