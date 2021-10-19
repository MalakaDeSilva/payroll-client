import axios from "axios";

const baseURL = "http://127.0.0.1:8080";

export async function getEmployeeData() {
  return await axios.get(`${baseURL}/employees/`);
}

export async function addEmployeeData(data) {
  return await axios.post(`${baseURL}/employees/`, data);
}
