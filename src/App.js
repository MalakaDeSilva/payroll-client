import { createStore, StoreProvider } from "easy-peasy";
import "./App.css";

import EmployeeStore from "./stores/EmployeeStore";
import FixedCommissionsStore from "./stores/FixedCommissionsStore";
import PerUnitCommissionsStore from "./stores/PerUnitCommissionsStore";
import DesignationsStore from "./stores/DesignationsStore";
import AddOnsStore from "./stores/AddOnsStore";

import SideBar from "./common/SideBar";

const globalStore = {
  fixedCommissions: FixedCommissionsStore,
  perUnitCommissions: PerUnitCommissionsStore,
  employees: EmployeeStore,
  designations: DesignationsStore,
  addOns: AddOnsStore,
};

const store = createStore(globalStore);

function App() {
  return (
    <StoreProvider store={store}>
      <div className="App">
        <SideBar></SideBar>
      </div>
    </StoreProvider>
  );
}

export default App;
