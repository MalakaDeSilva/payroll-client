import { createStore, StoreProvider } from "easy-peasy";
import "./App.css";

import Employee from "./components/Employee";

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
  designations: DesignationsStore
};

const store = createStore(globalStore);

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
