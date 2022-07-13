import { action, thunk } from "easy-peasy";
import {
  getDesignationsData,
  addDesignationsData,
  getDesignationByCodeData,
  updateDesignationsData,
  deleteDesignationsData,
} from "../services/designationsService";

const DesignationsStore = {
  /* states */
  isDesgLoading: false,
  designations: [],
  error: "",
  drawerVisible: false,

  /* actions */
  setIsDesgLoadingAction: action((state) => {
    state.isDesgLoading = !state.isDesgLoading;
  }),
  setErrorAction: action((state, error) => {
    state.error = error;
  }),
  setDesignationsAction: action((state, designations) => {
    state.designations = designations;
  }),
  pushDesignationsAction: action((state, designation) => {
    state.designations.push(designation);
  }),
  popDesignationsAction: action((state, _id) => {
    state.designations = state.designations.filter(
      (designation) => designation._id !== _id
    );
  }),
  updateDesignationsAction: action((state, designation) => {
    state.designations = state.designations.map((_desg) => {
      if (_desg["_id"] === designation["_id"]) {
        _desg = designation;
      }

      return _desg;
    });
  }),
  actionDrawer: action((state) => {
    state.drawerVisible = !state.drawerVisible;
  }),

  /* thunks */
  getDesignationsThunk: thunk(async (action) => {
    action.setIsDesgLoadingAction();

    try {
      let { data } = await getDesignationsData();
      action.setDesignationsAction(data);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsDesgLoadingAction();
  }),
  getDesignationByCodeThunk: thunk(async (action, code) => {
    action.setIsDesgLoadingAction();

    try {
      let { data } = await getDesignationByCodeData(code);
      action.setDesignationsAction(data);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsDesgLoadingAction();
  }),
  addDesignationThunk: thunk(async (action, data) => {
    action.setIsDesgLoadingAction();

    try {
      let result = await addDesignationsData(data);
      if (typeof result["data"]["createdDesignation"] != "undefined")
        action.pushDesignationsAction(result["data"]["createdDesignation"]);

      action.setIsDesgLoadingAction();
      return result;
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsDesgLoadingAction();
  }),
  updateDesignationThunk: thunk(async (action, data) => {
    action.setIsDesgLoadingAction();

    try {
      let result = await updateDesignationsData(data);
      if (typeof result["data"]["updatedDesignation"] != "undefined")
        action.updateDesignationsAction(result["data"]["updatedDesignation"]);

      action.setIsDesgLoadingAction();
      return result;
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsDesgLoadingAction();
  }),
  deleteDesignationThunk: thunk(async (action, id) => {
    action.setIsDesgLoadingAction();

    try {
      let result = await deleteDesignationsData(id);
      if (typeof result["data"]["deletedDesignation"] != "undefined")
        action.popDesignationsAction(
          result["data"]["deletedDesignation"]["_id"]
        );

      action.setIsDesgLoadingAction();
      return result;
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsDesgLoadingAction();
  }),
};

export default DesignationsStore;
