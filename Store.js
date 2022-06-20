import { action, createContextStore, thunk } from "easy-peasy";
import { getEmployeeData } from "./src/services/employeeService";

const ClientStore = createContextStore({
  /* states */
  isLoading: false,
  employees: [],
  error: "",

  /* actions */
  setIsLoading: action((state) => {
    state.isLoading = !state.isLoading;
  }),
  setError: action((state, error) => {
    state.error = error;
  }),

  /* thunks */
  addEmployeesAction: action((state, employees) => {
    employees.forEach((employee) => state.employees.push(employee));
  }),
  getEmployeesThunk: thunk(async (action) => {
    action.setIsLoading();

    try {
      const { data } = await getEmployeeData();
      action.addEmployeesAction(data);
    } catch (e) {
      action.setError(e);
    }
  }),
});
