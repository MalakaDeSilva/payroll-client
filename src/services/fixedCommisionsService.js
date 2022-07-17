import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

export async function getCommissionsData(data) {
  if (data["userId"] === "all" && data["payCycle"] === "all") {
    return await axios.get(`${baseURL}/fixed-commissions/`);
  } else if (data["userId"] !== "all" && data["payCycle"] !== "all") {
    return await axios.get(
      `${baseURL}/fixed-commissions/by-emp-pc/${data["userId"]}/${data["payCycle"]}`
    );
  } else if (data["userId"] === "all" && data["payCycle"] !== "all") {
    return await axios.get(`${baseURL}/fixed-commissions/by-pay-cycle/${data["payCycle"]}`);
  } else if (data["userId"] !== "all" && data["payCycle"] === "all") {
    return await axios.get(`${baseURL}/fixed-commissions/by-emp-id/${data["userId"]}`);
  }
}

export async function addCommissionsData(data) {
  return await axios.post(`${baseURL}/fixed-commissions/`, data);
}

export async function updateCommissionsData(data) {
  return await axios.put(`${baseURL}/fixed-commissions/${data["_id"]}`, data);
}

export async function deleteCommissionsData(id) {
  return await axios.delete(`${baseURL}/fixed-commissions/${id}`);
}
