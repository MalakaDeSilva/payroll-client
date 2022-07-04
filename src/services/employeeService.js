import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

export async function getEmployeeData() {
  return await axios.get(`${baseURL}/employees/`);
}

export async function addEmployeeData(data) {
  return await axios.post(`${baseURL}/employees/`, data);
}

export async function updateEmployeeData(data) {
  return await axios.put(`${baseURL}/employees/${data["_id"]}`, data);
}

export async function deleteEmployeeData(id) {
  return await axios.delete(`${baseURL}/employees/${id}`);
}
