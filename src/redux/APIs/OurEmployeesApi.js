import axios from "axios";

const token = localStorage.getItem("ADMIN");
// console.log("token value ----------------------", token);

const headersParam = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `${token}`,
    // Origin: "*",
};


// console.log("headersParam ----------------------", headersParam);

const baseUrl ='http://192.168.1.16:3000/api/';

export const loadOurEmployeesApi = async () => await axios.get(`${baseUrl}employee/getAll-employee`, { headers: headersParam });

export const getsingleEmployeeApi = async (singlEmployee) => await axios.get(`${baseUrl}employee/${singlEmployee}`, { headers: headersParam });

export const deleteEmployeeApi = async (deleteEmployee) => await axios.delete(`${baseUrl}employee/${deleteEmployee}`, { headers: headersParam });

export const addOurEmployeeApi = async (newEmployee) => await axios.post(`${baseUrl}employee/create/`, newEmployee, { headers: headersParam });

export const updateEmployeeApi = async (updateEmployee) => await axios.put(`${baseUrl}employee/${updateEmployee.get("id")}`, updateEmployee, { headers: headersParam });