import { action, thunk } from "easy-peasy";
import {
  getAddOnsDataEmpId,
  getAddOnsDataEmpIdPayCycle,
  addAddOnsData,
  getAddOnsDataPayCycle,
  updateAddOnsData,
  deleteAddOnsData,
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
  pushAddOnsAction: action((state, addOn) => {
    state.addOns.push(addOn);
  }),
  popAddOnsAction: action((state, _id) => {
    state.addOns = state.addOns.filter((addOn) => addOn._id !== _id);
  }),
  updateAddOnsAction: action((state, addOn) => {
    state.addOns = state.addOns.map((_addOn) => {
      if (_addOn["_id"] === addOn["_id"]) {
        _addOn = addOn;
      }

      return _addOn;
    });
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
      let result = await addAddOnsData(data);
      action.pushAddOnsAction(result["data"]["createdAddOn"]);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsAddOnsLoadingAction();
  }),
  updateAddOnThunk: thunk(async (action, data) => {
    action.setIsAddOnsLoadingAction();

    try {
      let result = await updateAddOnsData(data);
      action.updateAddOnsAction(result["data"]["updatedAddOn"]);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsAddOnsLoadingAction();
  }),
  deleteAddOnThunk: thunk(async (action, id) => {
    action.setIsAddOnsLoadingAction();

    try {
      let result = await deleteAddOnsData(id);
      action.popAddOnsAction(result["data"]["deletedAddOn"]["_id"]);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsAddOnsLoadingAction();
  }),
};

export default AddOnsStore;
