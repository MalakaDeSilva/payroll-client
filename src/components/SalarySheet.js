import React from "react";
import { Row, Col } from "antd";

function SalarySheet(props) {
  const style = {
    background: "#0092ff",
    padding: "8px 0",
    height: "100%",
  };

  return (
    <Row
      gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}
    >
      <Col className="gutter-row" span={12}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={12}>
        <Row>
          <Col className="gutter-row" span={24}>
            <div style={style}>col-6</div>
          </Col>
        </Row>
        <Row>
          <Col className="gutter-row" span={24}>
            <div style={style}>col-6</div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default SalarySheet;
