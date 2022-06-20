import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

export async function getAddOnsDataEmpId(empId) {
  return await axios.get(`${baseURL}/add-ons/${empId}`);
}

export async function getAddOnsDataEmpIdPayCycle(empId, payCycle) {
  return await axios.get(`${baseURL}/add-ons/${empId}/${payCycle}`);
}

export async function addAddOnsData(data) {
  return await axios.post(`${baseURL}/add-ons/`, data);
}
