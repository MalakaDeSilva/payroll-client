import axiosIns from "../util/Axios";

/* const baseURL = process.env.REACT_APP_BASE_URL; */

export async function getCommissionsData(data) {
  if (data["userId"] === "all" && data["payCycle"] === "all") {
    return await axiosIns.get(`/per-unit-commissions/`);
  } else if (data["userId"] !== "all" && data["payCycle"] !== "all") {
    return await axiosIns.get(
      `/per-unit-commissions/by-emp-pc/${data["userId"]}/${data["payCycle"]}`
    );
  } else if (data["userId"] === "all" && data["payCycle"] !== "all") {
    return await axiosIns.get(
      `/per-unit-commissions/by-pay-cycle/${data["payCycle"]}`
    );
  } else if (data["userId"] !== "all" && data["payCycle"] === "all") {
    return await axiosIns.get(
      `/per-unit-commissions/by-emp-id/${data["userId"]}`
    );
  }
}
export async function addCommissionsData(data) {
  return await axiosIns.post(`/per-unit-commissions/`, data);
}

export async function updateCommissionsData(data) {
  return await axiosIns.put(`/per-unit-commissions/${data["_id"]}`, data);
}

export async function deleteCommissionsData(id) {
  return await axiosIns.delete(`/per-unit-commissions/${id}`);
}
