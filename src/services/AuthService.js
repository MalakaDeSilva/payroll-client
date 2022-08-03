import axiosIns from "../util/Axios";

/* const baseURL = process.env.REACT_APP_BASE_URL; */

export async function login(data) {
  return await axiosIns.post(`/auth/login`, data);
}

export function onAuthenticated(token) {
  localStorage.setItem("token", token);
}

export async function verify() {
  return await axiosIns.post("/auth/verify");
}

export function logout() {
  localStorage.removeItem("token");
}
