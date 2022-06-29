import { action, thunk } from "easy-peasy";
import {
  getDesignationsData,
  addDesignationsData,
  getDesignationByCodeData,
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
      await addDesignationsData(data);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsDesgLoadingAction();
  }),
};

export default DesignationsStore;
