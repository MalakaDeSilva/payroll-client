import { action, thunk } from "easy-peasy";
import { login, onAuthenticated } from "../services/AuthService";

const AuthStore = {
  /* states */
  isAuthenticated: false,
  user: {},

  /* actions */
  setIsAuthenticated: action((state) => {
    state.isAuthenticated = true;
  }),
  setUser: action((state, user) => {
    state.user = user;
  }),

  /*thunks*/
  loginThunk: thunk(async (action, data) => {
    try {
      let result = await login(data);
      if (typeof result["data"]["token"] != "undefined") {
        action.setUser(result["data"]["user"][0]);
        action.setIsAuthenticated();
        onAuthenticated(result["data"]["token"]);
        
        return { message: "Authentication successful." };
      } else {
        return result;
      }
    } catch (e) {
      return { message: "Authentication failed." };
    }
  }),
};

export default AuthStore;
