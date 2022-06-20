import { createStore, StoreProvider } from "easy-peasy";
import "./App.css";

import EmployeeStore from "./EmployeeStore";
import FixedCommissionsStore from "./FixedCommissionsStore";
import PerUnitCommissionsStore from "./PerUnitCommissionsStore";
import DesignationsStore from "./DesignationsStore";
import AddOnsStore from "./AddOnsStore";

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
