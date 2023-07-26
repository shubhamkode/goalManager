import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = "http://localhost:8080/v1/api";

axios.defaults.withCredentials = true

export default axiosClient