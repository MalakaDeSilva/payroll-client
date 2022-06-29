import { action, thunk } from "easy-peasy";
import {
  getCommissionsData,
  addCommissionsData,
} from "../services/fixedCommisionsService";

const FixedCommissionsStore = {
  /* states */
  isComLoading: false,
  commissions: [],
  error: "",
  drawerVisible: false,

  /* actions */
  setIsComLoadingAction: action((state) => {
    state.isComLoading = !state.isComLoading;
  }),
  setErrorAction: action((state, error) => {
    state.error = error;
  }),
  setCommissionsction: action((state, commissions) => {
    state.commissions = commissions;
  }),
  actionDrawer: action((state) => {
    state.drawerVisible = !state.drawerVisible;
  }),

  /* thunks */
  getCommissionsByUserIdPayCycleThunk: thunk(async (action, _data) => {
    action.setIsComLoadingAction();

    try {
      let { data } = await getCommissionsData(_data);
      action.setCommissionsction(data);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsComLoadingAction();
  }),
  getCommissionsByPayCycleThunk: thunk(async (action, _data) => {
    action.setIsComLoadingAction();

    try {
      let { data } = await getCommissionsData(_data);
      action.setCommissionsction(data);
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

export default FixedCommissionsStore;
