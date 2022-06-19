import { action, thunk } from "easy-peasy";
import { getEmployeeData, addEmployeeData } from "./services/employeeService";

const EmployeeStore = {
  /* states */
  isLoading: false,
  employees: [],
  error: "",
  drawerVisible: false,

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
  actionDrawer: action((state) => {
    state.drawerVisible = !state.drawerVisible;
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
  addEmployeeThunk: thunk(async (action, data) => {
    action.setIsLoadingAction();

    try {
      await addEmployeeData(data);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsLoadingAction();
  }),
};

export default EmployeeStore;
