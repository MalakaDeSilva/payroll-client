import React from "react";
import { Tabs } from "antd";
import FixedCommissions from "./FixedCommissions";
import PerUnitCommissions from "./PerUnitCommissions";
const { TabPane } = Tabs;

const onChange = (key) => {
  console.log(key);
};

function Commisions() {
  return (
    <Tabs
      defaultActiveKey="1"
      onChange={onChange}
      style={{ marginLeft: "30px" }}
    >
      <TabPane tab="Fixed Commissions" key="1">
        <FixedCommissions />
      </TabPane>
      <TabPane tab="Per Unit Commission" key="2">
        <PerUnitCommissions />
      </TabPane>
    </Tabs>
  );
}

export default Commisions;
