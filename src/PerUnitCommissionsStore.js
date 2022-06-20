import { action, thunk } from "easy-peasy";
import {
  getCommissionsData,
  addCommissionsData,
} from "./services/PerUnitCommissionsService";

const PerUnitCommissionsStore = {
  /* states */
  isPUComLoading: false,
  puCommissions: [],
  error: "",
  drawerVisible: false,

  /* actions */
  setIsComLoadingAction: action((state) => {
    state.isPUComLoading = !state.isPUComLoading;
  }),
  setErrorAction: action((state, error) => {
    state.error = error;
  }),
  setCommissionsAction: action((state, puCommissions) => {
    state.puCommissions = puCommissions;
  }),
  actionDrawer: action((state) => {
    state.drawerVisible = !state.drawerVisible;
  }),

  /* thunks */
  getCommissionsByUserIdPayCycleThunk: thunk(async (action, _data) => {
    action.setIsComLoadingAction();

    try {
      let { data } = await getCommissionsData(_data);
      action.setCommissionsAction(data);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsComLoadingAction();
  }),
  getCommissionsByPayCycleThunk: thunk(async (action, _data) => {
    action.setIsComLoadingAction();
    
    try {
      let { data } = await getCommissionsData(_data);
      action.setCommissionsAction(data);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsComLoadingAction();
  }),
  addCommissionsThunk: thunk(async (action, data) => {
    action.setIsComLoadingAction();

    try {
      await addCommissionsData(data);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsComLoadingAction();
  }),
};

export default PerUnitCommissionsStore;
