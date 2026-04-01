import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, // cookie send karne ke liye MUST
});

export default API;
