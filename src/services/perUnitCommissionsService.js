import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

export async function getCommissionsData() {
  return await axios.get(`${baseURL}/per-unit-commissions/`);
}

export async function addCommissionsData(data) {
  return await axios.post(`${baseURL}/per-unit-commissions/`, data);
}
