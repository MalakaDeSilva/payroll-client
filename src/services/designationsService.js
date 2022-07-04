import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

export async function getDesignationsData() {
  return await axios.get(`${baseURL}/designations/`);
}

export async function getDesignationByCodeData(code) {
  return await axios.get(`${baseURL}/designations/${code}`);
}

export async function addDesignationsData(data) {
  return await axios.post(`${baseURL}/designations/`, data);
}

export async function updateDesignationsData(data) {
  return await axios.put(`${baseURL}/designations/${data["_id"]}`, data);
}

export async function deleteDesignationsData(id) {
  return await axios.delete(`${baseURL}/designations/${id}`);
}
