import { createStore, StoreProvider } from "easy-peasy";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import EmployeeStore from "./stores/EmployeeStore";
import FixedCommissionsStore from "./stores/FixedCommissionsStore";
import PerUnitCommissionsStore from "./stores/PerUnitCommissionsStore";
import DesignationsStore from "./stores/DesignationsStore";
import AddOnsStore from "./stores/AddOnsStore";
import SalaryStore from "./stores/SalaryStore";
import AuthStore from "./stores/AuthStore";

import Login from "./components/Login";
import Employee from "./components/Employee";
import Commisions from "./components/Commisions";
import AddOns from "./components/AddOns";
import Designations from "./components/Designations";
import Overview from "./common/Overview";
import EmployeeSalary from "./components/EmployeeSalary";
import SalarySlips from "./components/SalarySlips";
import SalarySheet from "./components/SalarySheet";

import SideBar from "./common/SideBar";

const globalStore = {
  fixedCommissions: FixedCommissionsStore,
  perUnitCommissions: PerUnitCommissionsStore,
  employees: EmployeeStore,
  designations: DesignationsStore,
  addOns: AddOnsStore,
  salaries: SalaryStore,
  auth: AuthStore,
};

const store = createStore(globalStore);

function App() {
  return (
    <StoreProvider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route exact path="/" element={<SideBar />}>
              <Route path="/" element={<Overview />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/commissions" element={<Commisions />} />
              <Route path="/add-ons" element={<AddOns />} />
              <Route path="/designations" element={<Designations />} />
              <Route path="/employee-salary" element={<EmployeeSalary />} />
              <Route exact path="/salary-slips" element={<SalarySlips />} />
              <Route
                path="/salary-slips/salary-sheet/:empId/:payCycle"
                element={<SalarySheet />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </StoreProvider>
  );
}

export default App;
