import axios from "axios";

const API = axios.create({
  baseURL: "https://e-commerce-2026.onrender.com",
  withCredentials: true, // cookie send karne ke liye MUST
});

export default API;
