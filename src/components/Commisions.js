import React from "react";
import { Tabs, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import FixedCommissions from "./FixedCommissions";
import PerUnitCommissions from "./PerUnitCommissions";
const { TabPane } = Tabs;

const onChange = (key) => {
  console.log(key);
};

function Commisions() {
  return (
    <div>
      <Breadcrumb
        style={{
          display: "flex",
          justifyContent: "start",
          margin: "20px 40px",
        }}
      >
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/commissions">Commissions</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Tabs
        defaultActiveKey="1"
        onChange={onChange}
        style={{ marginLeft: "30px" }}
      >
        <TabPane tab="Fixed Commissions" key="1">
          <FixedCommissions />
        </TabPane>
        <TabPane tab="Per Unit Commissions" key="2">
          <PerUnitCommissions />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Commisions;
