import { action, thunk } from "easy-peasy";
import {
  getAddOnsDataEmpId,
  getAddOnsDataEmpIdPayCycle,
  addAddOnsData,
  getAddOnsDataPayCycle,
} from "../services/AddOnsService";

const AddOnsStore = {
  /* states */
  isAddOnsLoading: false,
  addOns: [],
  error: "",
  drawerVisible: false,

  /* actions */
  setIsAddOnsLoadingAction: action((state) => {
    state.isAddOnsLoading = !state.isAddOnsLoading;
  }),
  setErrorAction: action((state, error) => {
    state.error = error;
  }),
  setAddOnsAction: action((state, addOns) => {
    state.addOns = addOns;
  }),
  actionDrawer: action((state) => {
    state.drawerVisible = !state.drawerVisible;
  }),

  /* thunks */
  getAddOnsByEmpIdThunk: thunk(async (action, _data) => {
    action.setIsAddOnsLoadingAction();
    let { empId } = _data;

    try {
      let { data } = await getAddOnsDataEmpId(empId);
      action.setAddOnsAction(data);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsAddOnsLoadingAction();
  }),
  getAddOnsByPayCycleThunk: thunk(async (action, _data) => {
    action.setIsAddOnsLoadingAction();
    let { payCycle } = _data;

    try {
      let { data } = await getAddOnsDataPayCycle(payCycle);
      action.setAddOnsAction(data);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsAddOnsLoadingAction();
  }),
  getAddOnsByEmpIdPayCycleThunk: thunk(async (action, _data) => {
    action.setIsAddOnsLoadingAction();
    let { empId, payCycle } = _data;

    try {
      let { data } = await getAddOnsDataEmpIdPayCycle(empId, payCycle);
      action.setAddOnsAction(data);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsAddOnsLoadingAction();
  }),
  addAddOnThunk: thunk(async (action, data) => {
    action.setIsAddOnsLoadingAction();

    try {
      await addAddOnsData(data);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsAddOnsLoadingAction();
  }),
};

export default AddOnsStore;
