import { action, thunk } from "easy-peasy";
import {
  getCommissionsData,
  addCommissionsData,
  updateCommissionsData,
  deleteCommissionsData,
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
      action.pushCommissionAction(result["data"]["createdCommission"]);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsComLoadingAction();
  }),
  updateCommissionsThunk: thunk(async (action, data) => {
    action.setIsComLoadingAction();

    try {
      let result = await updateCommissionsData(data);
      action.updateCommissionAction(result["data"]["updatedCommission"]);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsComLoadingAction();
  }),
  deleteCommissionsThunk: thunk(async (action, id) => {
    action.setIsComLoadingAction();

    try {
      await deleteCommissionsData(id);
      action.popCommissionAction(id);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsComLoadingAction();
  }),
};

export default FixedCommissionsStore;
