import axios from "axios";
import Cookies from "js-cookie";

// export const BASE_URL = "https://staging-api.performs.app/"; //* Staging
// export const BASE_URL = "https://api.performs.app"; //* production

export const BASE_URL = import.meta.env.VITE_API_URL; //! enviornment variables
export const BASE_URL2 = "https://fit-stg.performs.app";
export const BASE_HEADERS = (headers: any, api: any) => {
  // headers.set("Accept", "application/json");
  // headers.set("Content-Type", "application/json");
  Cookies.get("token") &&
    headers.set("Authorization", `Bearer ${Cookies.get("token")}`);
  return headers;
};

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
