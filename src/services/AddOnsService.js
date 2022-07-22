import axiosIns from "../util/Axios";
/* 
const baseURL = process.env.REACT_APP_BASE_URL; */

export async function getAddOnsDataEmpId(empId) {
  return await axiosIns.get(`/add-ons/by-emp/${empId}`);
}

export async function getAddOnsDataPayCycle(payCycle) {
  return await axiosIns.get(`/add-ons/by-pay-cycle/${payCycle}`);
}

export async function getAddOnsDataEmpIdPayCycle(empId, payCycle) {
  return await axiosIns.get(`/add-ons/by-emp-pay-cycle/${empId}/${payCycle}`);
}

export async function addAddOnsData(data) {
  return await axiosIns.post(`/add-ons/`, data);
}

export async function updateAddOnsData(data) {
  return await axiosIns.put(`/add-ons/${data["_id"]}`, data);
}

export async function deleteAddOnsData(id) {
  return await axiosIns.delete(`/add-ons/${id}`);
}
