import axios from "axios";

const baseURL = "http://127.0.0.1:8080";

export async function getEmployeeData() {
  return await axios.get(`${baseURL}/employees/`);
}
