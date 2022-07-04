import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

export async function getCommissionsData(data) {
  if (typeof data["userId"] == "undefined") {
    return await axios.get(`${baseURL}/per-unit-commissions/${data["payCycle"]}`);
  } else {
    return await axios.get(`${baseURL}/per-unit-commissions/${data["userId"]}/${data["payCycle"]}`);
  }
}
export async function addCommissionsData(data) {
  return await axios.post(`${baseURL}/per-unit-commissions/`, data);
}

export async function updateCommissionsData(data) {
  return await axios.put(`${baseURL}/per-unit-commissions/${data["_id"]}`, data);
}

export async function deleteCommissionsData(id) {
  return await axios.delete(`${baseURL}/per-unit-commissions/${id}`);
}
