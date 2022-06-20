import { action, thunk } from "easy-peasy";
import { getCommissionsData, addCommissionsData } from "./services/perUnitCommissionsService";

const PerUnitCommissionsStore = {
  /* states */
  isLoading: false,
  commissions: [],
  error: "",
  drawerVisible: false,

  /* actions */
  setIsLoadingAction: action((state) => {
    state.isLoading = !state.isLoading;
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
  getCommissionsThunk: thunk(async (action) => {
    action.setIsLoadingAction();

    try {
      let { data } = await getCommissionsData();
      action.setCommissionsction(data);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsLoadingAction();
  }),
  addCommissionsThunk: thunk(async (action, data) => {
    action.setIsLoadingAction();

    try {
      await addCommissionsData(data);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsLoadingAction();
  }),
};

export default PerUnitCommissionsStore;
