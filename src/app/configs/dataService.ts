import axios from "axios";
import Cookies from "js-cookie";

export const BASE_URL = "https://performs.pythonanywhere.com";

export const BASE_HEADERS = (headers: any, api: any) => {
  // headers.set("Accept", "application/json");
  // headers.set("Content-Type", "application/json");
  Cookies.get("token") &&
    headers.set("Authorization", `Bearer ${Cookies.get("token")}`);
  console.log(Cookies.get("token"));
  return headers;
};

export const BASE_AXIOS_HEADERS = () => ({
  Authorization: `Bearer ${Cookies.get("token")}`,
});

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});
