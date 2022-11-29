import axios from "axios";
import Cookies from "js-cookie";

export const BASE_URL = "http://20.151.65.27";
//  This is the staging backend url ==> http://20.63.114.93

export const BASE_HEADERS = (headers: any, api: any) => {
  // headers.set("Accept", "application/json");
  // headers.set("Content-Type", "application/json");
  Cookies.get("token") &&
    headers.set("Authorization", `Bearer ${Cookies.get("token")}`);
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
