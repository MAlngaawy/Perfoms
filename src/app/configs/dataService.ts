import axios from "axios";
import Cookies from "js-cookie";

export const BASE_URL = "https://performs.pythonanywhere.com";

export const BASE_HEADERS = (headers: any, api: any) => {
  headers.set("Accept", "application/json");
  headers.set("Content-Type", "application/json");
  api.endpoint !== "signin" &&
    headers.set("Authorization", `Bearer ${Cookies.get("token")}`);
  console.log(Object.fromEntries([...headers]));
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
