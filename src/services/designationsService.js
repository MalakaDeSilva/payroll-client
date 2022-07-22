import axiosIns from "../util/Axios";

/* const baseURL = process.env.REACT_APP_BASE_URL; */

export async function getDesignationsData() {
  return await axiosIns.get(`/designations/`);
}

export async function getDesignationByCodeData(code) {
  return await axiosIns.get(`/designations/${code}`);
}

export async function addDesignationsData(data) {
  return await axiosIns.post(`/designations/`, data);
}

export async function updateDesignationsData(data) {
  return await axiosIns.put(`/designations/${data["_id"]}`, data);
}

export async function deleteDesignationsData(id) {
  return await axiosIns.delete(`/designations/${id}`);
}
