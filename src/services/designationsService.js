import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

export async function getDesignationsData() {
  return await axios.get(`${baseURL}/designations/`);
}

export async function addDesignationsData(data) {
  return await axios.post(`${baseURL}/designations/`, data);
}
