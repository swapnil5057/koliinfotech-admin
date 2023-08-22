import axios from "axios";

const token = localStorage.getItem("ADMIN");

const headersParam = {
    Authorization: `${token}`,
    Origin: "*",
};

const baseUrl = "http://192.168.1.16:3000/api/";
// const baseUrl = process.env.REACT_APP_BASE_URL;

export const loadOurTopBlogsApi = async () => await axios.get(`${baseUrl}ourBlog/getAll-ourBlog/`, { headers: headersParam });

export const getSingleBlogApi = async (id) => await axios.get(`${baseUrl}ourBlog/${id}/`,  { headers: headersParam });

export const addOurBlogApi = async (newService) => await axios.post(`${baseUrl}ourBlog/create/`, newService, { headers: headersParam });

export const deleteOurBlogApi = async (deleteBlog) => await axios.delete(`${baseUrl}ourBlog/${deleteBlog}/`, { headers: headersParam });

export const updateOurBlogApi = async (updateOurBlog) => await axios.put(`${baseUrl}ourBlog/${updateOurBlog.get("id")}`, updateOurBlog, { headers: headersParam });
