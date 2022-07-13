import { action, thunk } from "easy-peasy";
import {
  getCommissionsData,
  addCommissionsData,
  deleteCommissionsData,
  updateCommissionsData,
} from "../services/perUnitCommissionsService";

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
  pushCommissionAction: action((state, commission) => {
    state.puCommissions.push(commission);
  }),
  popCommissionAction: action((state, _id) => {
    state.puCommissions = state.puCommissions.filter(
      (commission) => commission._id !== _id
    );
  }),
  updateCommissionAction: action((state, commission) => {
    state.puCommissions = state.puCommissions.map((com) => {
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

export default PerUnitCommissionsStore;
