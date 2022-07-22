import axiosIns from "../util/Axios";

/* const baseURL = process.env.REACT_APP_BASE_URL; */

export async function getSalaryDataById(id) {
  return await axiosIns.get(`/salary/${id}`);
}

export async function getSalaryDataEmpId(empId) {
  return await axiosIns.get(`/salary/by-employee/${empId}`);
}

export async function getSalaryDataPayCycle(payCycle) {
  return await axiosIns.get(`/salary/by-pay-cycle/${payCycle}`);
}

export async function getSalaryDataEmpIdPayCycle(empId, payCycle) {
  return await axiosIns.get(
    `/salary/by-employee-pay-cycle/${empId}/${payCycle}`
  );
}

export async function addSalaryData(data) {
  return await axiosIns.post(`/salary/`, data);
}

export async function updateSalaryData(data) {
  return await axiosIns.put(`/salary/${data["_id"]}`, data);
}

export async function deleteSalaryData(id) {
  return await axiosIns.delete(`/salary/${id}`);
}

export async function generateSlip(id) {
  return await axiosIns.get(`/salary/slip/generate/${id}`, {
    responseType: "arraybuffer",
    headers: {
      Accept: "application/pdf",
    },
  });
}
