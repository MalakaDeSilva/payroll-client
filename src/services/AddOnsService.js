import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

export async function getAddOnsDataEmpId(empId) {
  return await axios.get(`${baseURL}/add-ons/by-emp/${empId}`);
}

export async function getAddOnsDataPayCycle(payCycle) {
  return await axios.get(`${baseURL}/add-ons/by-pay-cycle/${payCycle}`);
}

export async function getAddOnsDataEmpIdPayCycle(empId, payCycle) {
  return await axios.get(
    `${baseURL}/add-ons/by-emp-pay-cycle/${empId}/${payCycle}`
  );
}

export async function addAddOnsData(data) {
  return await axios.post(`${baseURL}/add-ons/`, data);
}

export async function updateAddOnsData(data) {
  return await axios.put(`${baseURL}/add-ons/${data["_id"]}`, data);
}

export async function deleteAddOnsData(id) {
  return await axios.delete(`${baseURL}/add-ons/${id}`);
}
