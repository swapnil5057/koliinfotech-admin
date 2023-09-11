import axios from "axios";

const token = localStorage.getItem("ADMIN");
console.log("token value ----------------------", token);

const headersParam = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `${token}`,
    
    Origin: "*",
};


console.log("headersParam ----------------------", headersParam);

// const baseUrl ='https://api-v1.koliinfotech.com/api/';
const baseUrl ='http://192.168.1.12:3000/api/';

export const userRegisterApi = async (user) => await axios.post(`${baseUrl}user/create`, user, { headers: headersParam });

export const adminLoginApi = async (user) => await axios.post(`${baseUrl}user/login`, user);

export const loadUsersApi = async () => await axios.get(`${baseUrl}user/getall`, { headers: headersParam });

export const deleteUsersApi = async (deleteuser) => await axios.delete(`${baseUrl}user/${deleteuser}`, { headers: headersParam });

export const getSingleUserApi = async (singluser) => await axios.get(`${baseUrl}user/${singluser}`, { headers: headersParam });

export const updateUserApi = async (updateUser) => await axios.patch(`${baseUrl}user/${updateUser.get("id")}`, updateUser, { headers: headersParam });