import { action, thunk } from "easy-peasy";
import { getEmployeeData } from "./services/employeeService";

export default {
  /* states */
  isLoading: false,
  employees: [],
  error: "",

  /* actions */
  setIsLoadingAction: action((state) => {
    state.isLoading = !state.isLoading;
  }),
  setErrorAction: action((state, error) => {
    state.error = error;
  }),
  setEmployeesAction: action((state, employees) => {
    state.employees = employees;
  }),

  /* thunks */
  getEmployeesThunk: thunk(async (action) => {
    action.setIsLoadingAction();

    try {
      let { data } = await getEmployeeData();
      action.setEmployeesAction(data);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsLoadingAction();
  }),
};
