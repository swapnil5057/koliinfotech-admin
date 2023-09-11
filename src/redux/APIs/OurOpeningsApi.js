import axios from "axios";

const token = localStorage.getItem("ADMIN");
// console.log("token value ----------------------", token);

const headersParam = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `${token}`,
    Origin: "*",
};


// console.log("headersParam ----------------------", headersParam);

const baseUrl ='https://api-v1.koliinfotech.com/api/';

export const loadOurOpeningsApi = async () => await axios.get(`${baseUrl}openings/getAll-openings`, { headers: headersParam });

export const getSingleOpeningApi = async (singlOpening) => await axios.get(`${baseUrl}openings/${singlOpening}`, { headers: headersParam });

export const deleteOpeningApi = async (deleteOpening) => await axios.delete(`${baseUrl}openings/${deleteOpening}`, { headers: headersParam });

export const addOurOpeningApi = async (newOpening) => await axios.post(`${baseUrl}openings/create/`, newOpening, { headers: headersParam });

export const updateOpeningApi = async (updateOpening) => await axios.put(`${baseUrl}openings/${updateOpening.get("id")}`, updateOpening, { headers: headersParam });