import axios from "axios";

const api = axios.create({
  baseURL: "https://sher-s.onrender.com/api",
});

export default api;
