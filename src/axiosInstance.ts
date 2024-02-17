import axios, { AxiosInstance } from "axios";
const axiosHandler: AxiosInstance = axios.create({
  baseURL: "https://reqres.in",
  headers: {
    Accept: "application/json",
  },
});

export default axiosHandler;
