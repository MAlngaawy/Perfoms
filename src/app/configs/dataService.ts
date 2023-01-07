import axios from "axios";
import Cookies from "js-cookie";

// export const BASE_URL = "http://20.151.65.27";
export const BASE_URL = "https://api.performs.app";

// export const BASE_URL = import.meta.env.VITE_API_URL;

export const BASE_HEADERS = (headers: any, api: any) => {
  // headers.set("Accept", "application/json");
  // headers.set("Content-Type", "application/json");
  Cookies.get("token") &&
    headers.set("Authorization", `Bearer ${Cookies.get("token")}`);
  return headers;
};

console.log("Cookies", Cookies.get("token"));

console.log("document.cookie", document.cookie);

export const dataServerToken = Cookies.get("token");

export const BASE_AXIOS_HEADERS = () => ({
  Authorization: `Bearer ${Cookies.get("token")}`,
});

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});
