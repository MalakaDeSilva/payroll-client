import { action, thunk } from "easy-peasy";
import { login, onAuthenticated } from "../services/AuthService";

const AuthStore = {
  /* states */
  user: {},

  /* actions */
  setUser: action((state, user) => {
    state.user = user;
  }),

  /*thunks*/
  loginThunk: thunk(async (action, data) => {
    try {
      let result = await login(data);
      if (typeof result["data"]["token"] != "undefined") {
        action.setUser(result["data"]["user"][0]);
        onAuthenticated(result["data"]["token"]);

        return { result: true, message: "Authentication successful." };
      } else {
        return { ...result, result: false };
      }
    } catch (e) {
      return { result: false, message: "Authentication failed." };
    }
  }),
};

export default AuthStore;
