import axios from "axios";

const token = localStorage.getItem("ADMIN");

const headersParam = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `${token}`,
    Origin: "*",
};
const queryParameters = new URLSearchParams(window.location.search)
const token1 = queryParameters.get("token")


const baseUrl ='https://api-v1.koliinfotech.com/api/';

export const ForgotPassApi = async (forgotPass) => await axios.post(`${baseUrl}user/forgot_password`, forgotPass, { headers: headersParam });

export const ChangePassApi = async (ChangePass) => await axios.patch(`${baseUrl}user/change-password/`, ChangePass, { headers: headersParam });

export const ResetPassApi = async (ResetPass) => await axios.post(`${baseUrl}user/reset_password/${token1}`, ResetPass, { headers: headersParam });

