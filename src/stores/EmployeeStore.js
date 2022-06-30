import { action, thunk } from "easy-peasy";
import {
  getEmployeeData,
  addEmployeeData,
  updateEmployeeData,
  deleteEmployeeData,
} from "../services/employeeService";

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
  pushEmployeesAction: action((state, employee) => {
    state.employees.push(employee);
  }),
  popEmployeesAction: action((state, _id) => {
    state.employees = state.employees.filter(
      (employee) => employee._id !== _id
    );
  }),
  updateEmployeeAction: action((state, employee) => {
    state.employees = state.employees.map((emp) => {
      if (emp["_id"] === employee["_id"]) {
        emp = employee;
      }

      return emp;
    });
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
      action.pushEmployeesAction(data); // TODO: check result before pushing
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsEmpLoadingAction();
  }),
  updateEmployeeThunk: thunk(async (action, data) => {
    action.setIsEmpLoadingAction();

    try {
      let result = await updateEmployeeData(data);
      action.updateEmployeeAction(result["data"]["updatedEmployee"]);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsEmpLoadingAction();
  }),
  deleteEmployeeThunk: thunk(async (action, id) => {
    action.setIsEmpLoadingAction();

    try {
      await deleteEmployeeData(id);
      action.popEmployeesAction(id); // TODO: check result before popping
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsEmpLoadingAction();
  }),
};

export default EmployeeStore;
