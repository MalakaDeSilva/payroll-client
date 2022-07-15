import { Col, Row } from "antd";
import React from "react";

function Overview() {
  return (
    <div>
      <Row gutter={16}>
        <Col span={11}>
          <iframe
            title="salary-by-emp"
            style={{
              background: "#f0f2f5",
              border: "none",
              borderRadius: "2px",
            }}
            width="640"
            height="480"
            src="https://charts.mongodb.com/charts-picaroon-payroll-ebcqs/embed/charts?id=62d0e4ec-79ab-49d6-8d06-690f4aad1e48&maxDataAge=3600&theme=light&autoRefresh=true"
          ></iframe>
        </Col>
        <Col span={11} offset={2}>
          <iframe
            title="commision-by-emp"
            style={{
              background: "#f0f2f5",
              border: "none",
              borderRadius: "2px",
            }}
            width="640"
            height="480"
            src="https://charts.mongodb.com/charts-picaroon-payroll-ebcqs/embed/charts?id=62d0ed1d-b545-4238-81cc-09285fac9725&maxDataAge=300&theme=light&autoRefresh=true"
          ></iframe>
        </Col>
      </Row>
    </div>
  );
}

export default Overview;
