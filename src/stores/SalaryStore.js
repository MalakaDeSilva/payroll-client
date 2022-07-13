import { action, thunk } from "easy-peasy";
import {
  getSalaryDataById,
  getSalaryDataEmpId,
  getSalaryDataPayCycle,
  getSalaryDataEmpIdPayCycle,
  addSalaryData,
  updateSalaryData,
  deleteSalaryData,
} from "../services/SalaryService";

const SalaryStore = {
  /* states */
  isSalariesLoading: false,
  salaries: [],
  error: "",
  drawerVisible: false,

  /* actions */
  setIsSalariesLoadingAction: action((state) => {
    state.isSalariesLoading = !state.isSalariesLoading;
  }),
  setErrorAction: action((state, error) => {
    state.error = error;
  }),
  setSalariesAction: action((state, salaries) => {
    state.salaries = salaries;
  }),
  pushSalariesAction: action((state, salary) => {
    state.salaries.push(salary);
  }),
  popSalariesAction: action((state, _id) => {
    state.salaries = state.salaries.filter((salary) => salary._id !== _id);
  }),
  updateSalariesAction: action((state, salary) => {
    state.salaries = state.salaries.map((_salary) => {
      if (_salary["_id"] === salary["_id"]) {
        _salary = salary;
      }

      return _salary;
    });
  }),
  actionDrawer: action((state) => {
    state.drawerVisible = !state.drawerVisible;
  }),

  /* thunks */
  getSalariesByIdThunk: thunk(async (action, _data) => {
    action.setIsSalariesLoadingAction();
    let { salId } = _data;

    try {
      let { data } = await getSalaryDataById(salId);
      action.setSalariesAction(data);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsSalariesLoadingAction();
  }),
  getSalariesByEmpIdThunk: thunk(async (action, _data) => {
    action.setIsSalariesLoadingAction();
    let { empId } = _data;

    try {
      let { data } = await getSalaryDataEmpId(empId);
      action.setSalariesAction(data);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsSalariesLoadingAction();
  }),
  getSalariesByPayCycleThunk: thunk(async (action, _data) => {
    action.setIsSalariesLoadingAction();
    let { payCycle } = _data;

    try {
      let { data } = await getSalaryDataPayCycle(payCycle);
      action.setSalariesAction(data);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsSalariesLoadingAction();
  }),
  getSalariesByEmpIdPayCycleThunk: thunk(async (action, _data) => {
    action.setIsSalariesLoadingAction();
    let { empId, payCycle } = _data;

    try {
      let { data } = await getSalaryDataEmpIdPayCycle(empId, payCycle);
      action.setSalariesAction(data);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsSalariesLoadingAction();
  }),
  addSalaryThunk: thunk(async (action, data) => {
    action.setIsSalariesLoadingAction();

    try {
      let result = await addSalaryData(data);
      action.pushSalariesAction(result["data"]["createdSalary"]);
      return result;
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsSalariesLoadingAction();
  }),
  updateSalaryThunk: thunk(async (action, data) => {
    action.setIsSalariesLoadingAction();

    try {
      let result = await updateSalaryData(data);
      action.updateSalariesAction(result["data"]["updatedSalary"]);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsSalariesLoadingAction();
  }),
  deleteSalaryThunk: thunk(async (action, id) => {
    action.setIsSalariesLoadingAction();

    try {
      let result = await deleteSalaryData(id);
      action.popSalariesAction(result["data"]["deletedSalary"]["_id"]);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsSalariesLoadingAction();
  }),
};

export default SalaryStore;
