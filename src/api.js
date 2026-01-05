import axios from "axios";

const api = axios.create({
  baseURL: "https://kasirkami-backend.up.railway.app",
});

export default api;
