import axios from 'axios';

const axiosClient = axios.create({
  baseURL: "http://localhost:4000"
})

axiosClient.defaults.headers.post["Content-Type"] = "application/json";

export default axiosClient;