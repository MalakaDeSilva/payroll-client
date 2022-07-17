import { action, thunk } from "easy-peasy";
import {
  getCommissionsData,
  addCommissionsData,
  updateCommissionsData,
  deleteCommissionsData,
} from "../services/fixedCommisionsService";

const FixedCommissionsStore = {
  /* states */
  init: true,
  payCycles: [],
  isComLoading: false,
  commissions: [],
  error: "",
  drawerVisible: false,

  /* actions */
  setInitAction: action((state) => {
    state.init = false;
  }),
  setPayCyclesAction: action((state, commissions) => {
    if (state.init) {
      state.payCycles = [...new Set(commissions.map((item) => item.payCycle))];
    }
  }),
  setIsComLoadingAction: action((state) => {
    state.isComLoading = !state.isComLoading;
  }),
  setErrorAction: action((state, error) => {
    state.error = error;
  }),
  setCommissionsAction: action((state, commissions) => {
    state.commissions = commissions;
  }),
  pushCommissionAction: action((state, commission) => {
    state.commissions.push(commission);
  }),
  popCommissionAction: action((state, _id) => {
    state.commissions = state.commissions.filter(
      (commission) => commission._id !== _id
    );
  }),
  updateCommissionAction: action((state, commission) => {
    state.commissions = state.commissions.map((com) => {
      if (com["_id"] === commission["_id"]) {
        com = commission;
      }

      return com;
    });
  }),
  actionDrawer: action((state) => {
    state.drawerVisible = !state.drawerVisible;
  }),

  /* thunks */
  getCommissionsThunk: thunk(async (action, _data) => {
    action.setIsComLoadingAction();

    try {
      let { data } = await getCommissionsData(_data);
      action.setCommissionsAction(data);

      action.setPayCyclesAction(data);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setInitAction();
    action.setIsComLoadingAction();
  }),
  addCommissionsThunk: thunk(async (action, data) => {
    action.setIsComLoadingAction();

    try {
      let result = await addCommissionsData(data);
      if (typeof result["data"]["createdCommission"] != "undefined")
        action.pushCommissionAction(result["data"]["createdCommission"]);

      action.setIsComLoadingAction();
      return result;
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsComLoadingAction();
  }),
  updateCommissionsThunk: thunk(async (action, data) => {
    action.setIsComLoadingAction();

    try {
      let result = await updateCommissionsData(data);
      if (typeof result["data"]["updatedCommission"] != "undefined")
        action.updateCommissionAction(result["data"]["updatedCommission"]);

      action.setIsComLoadingAction();
      return result;
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsComLoadingAction();
  }),
  deleteCommissionsThunk: thunk(async (action, id) => {
    action.setIsComLoadingAction();

    try {
      let result = await deleteCommissionsData(id);
      if (typeof result["data"]["deletedCommission"] != "undefined")
        action.popCommissionAction(id);

      action.setIsComLoadingAction();
      return result;
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsComLoadingAction();
  }),
};

export default FixedCommissionsStore;
