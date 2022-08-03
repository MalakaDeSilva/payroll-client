import { action, thunk } from "easy-peasy";
import {
  login,
  onAuthenticated,
  verify,
  logout,
} from "../services/AuthService";

const AuthStore = {
  /* states */
  user: {},
  verification: {},

  /* actions */
  setUser: action((state, user) => {
    state.user = user;
  }),
  setVerification: action((state, verification) => {
    state.verification = verification;
  }),

  /*thunks*/
  loginThunk: thunk(async (action, data) => {
    try {
      let result = await login(data);
      if (typeof result["data"]["token"] != "undefined") {
        action.setUser(result["data"]["user"][0]);
        onAuthenticated(result["data"]["token"]);
        action.setVerification({ verified: true });
        return { result: true, message: "Authentication successful." };
      } else {
        action.setVerification({
          verified: false,
          message: "",
          reason: "JsonWebTokenError",
        });
        return { ...result, result: false };
      }
    } catch (e) {
      action.setVerification({
        verified: false,
        message: "",
        reason: "JsonWebTokenError",
      });
      return { result: false, message: "Authentication failed." };
    }
  }),
  verifyThunk: thunk(async (action) => {
    try {
      let result = await verify();
      if (typeof result["data"]["error"] != "undefined") {
        action.setVerification({
          verified: false,
          message: result["data"]["error"]["message"],
          reason: result["data"]["error"]["name"],
        });
        return {
          verified: false,
          message: result["data"]["error"]["message"],
          reason: result["data"]["error"]["name"],
        };
      } else {
        action.setVerification({ verified: true, message: "" });
        return { verified: true, message: "" };
      }
    } catch (e) {
      action.setVerification({
        verified: false,
        message: "",
        reason: e.response.data.error.name,
      });
      return {
        verified: false,
        message: "",
        reason: e.response.data.error.name,
      };
    }
  }),
  logOutThunk: thunk((action) => {
    logout();
    action.setVerification({});
  }),
};

export default AuthStore;
