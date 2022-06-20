import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

export async function getEmployeeData() {
  return await axios.get(`${baseURL}/employees/`);
}

export async function addEmployeeData(data) {
  return await axios.post(`${baseURL}/employees/`, data);
}
