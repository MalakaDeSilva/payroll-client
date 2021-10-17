import { createStore, StoreProvider } from "easy-peasy";
import "./App.css";

import Employee from "./components/Employee";
import Store from "./Store";
import SideBar from "./common/SideBar";

const store = createStore(Store);

function App() {
  return (
    <StoreProvider store={store}>
      <div className="App">
        <SideBar content={<Employee />}></SideBar>
      </div>
    </StoreProvider>
  );
}

export default App;
