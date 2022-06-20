import { action, thunk } from "easy-peasy";
import { getEmployeeData, addEmployeeData } from "./services/employeeService";

const EmployeeStore = {
  /* states */
  isEmpLoading: false,
  employees: [],
  error: "",
  drawerVisible: false,

  /* actions */
  setIsEmpLoadingAction: action((state) => {
    state.isEmpLoading = !state.isEmpLoading;
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
    action.setIsEmpLoadingAction();

    try {
      let { data } = await getEmployeeData();
      action.setEmployeesAction(data);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsEmpLoadingAction();
  }),
  addEmployeeThunk: thunk(async (action, data) => {
    action.setIsEmpLoadingAction();

    try {
      await addEmployeeData(data);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsEmpLoadingAction();
  }),
};

export default EmployeeStore;
