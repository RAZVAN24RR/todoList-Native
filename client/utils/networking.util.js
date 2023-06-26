import axios from "axios";
export const host = 8000;
export const baseHttpURL = `https://9be3-81-181-70-241.ngrok-free.app/api`;
export const baseURLPref = `${baseHttpURL}`;
const timeout = 30000e3;

export const axiosInstanceToApi = axios.create({
  baseURL: baseURLPref,
  timeout,
});
