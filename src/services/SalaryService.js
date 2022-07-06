import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

export async function getSalaryDataById(id) {
  return await axios.get(`${baseURL}/salary/${id}`);
}

export async function getSalaryDataEmpId(empId) {
  return await axios.get(`${baseURL}/salary/by-employee/${empId}`);
}

export async function getSalaryDataPayCycle(payCycle) {
  return await axios.get(`${baseURL}/salary/by-pay-cycle/${payCycle}`);
}

export async function getSalaryDataEmpIdPayCycle(empId, payCycle) {
  return await axios.get(
    `${baseURL}/salary/by-employee-pay-cycle/${empId}/${payCycle}`
  );
}

export async function addSalaryData(data) {
  return await axios.post(`${baseURL}/salary/`, data);
}

export async function updateSalaryData(data) {
  return await axios.put(`${baseURL}/salary/${data["_id"]}`, data);
}

export async function deleteSalaryData(id) {
  return await axios.delete(`${baseURL}/salary/${id}`);
}
