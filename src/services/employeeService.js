import axiosIns from "../util/Axios";

/* const baseURL = process.env.REACT_APP_BASE_URL; */

export async function getEmployeeData() {
  return await axiosIns.get(`/employees/`);
}

export async function addEmployeeData(data) {
  return await axiosIns.post(`/employees/`, data);
}

export async function updateEmployeeData(data) {
  return await axiosIns.put(`/employees/${data["_id"]}`, data);
}

export async function deleteEmployeeData(id) {
  return await axiosIns.delete(`/employees/${id}`);
}
