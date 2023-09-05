import axios from "axios";

const token = localStorage.getItem("ADMIN");

const headersParam = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `${token}`,
    // Origin: "*",
};



const baseUrl ='https://api-v1.koliinfotech.com/api/';

export const loadClientsApi = async () => await axios.get(`${baseUrl}ourClient/getAll-ourClient`, { headers: headersParam });

export const getSingleClientApi = async (singlclient) => await axios.get(`${baseUrl}ourClient/${singlclient}`, { headers: headersParam });

export const AddOurClientApi = async (client) => await axios.post(`${baseUrl}ourClient/create`, client, { headers: headersParam });

export const deleteOurClientApi = async (deleteClient) => await axios.delete(`${baseUrl}ourClient/${deleteClient}`, { headers: headersParam });

export const updateClientApi = async (updateClient) => await axios.put(`${baseUrl}ourClient/${updateClient.get("id")}`, updateClient, { headers: headersParam });

