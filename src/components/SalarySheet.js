import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Row, Col, Card, Breadcrumb, Typography, Divider } from "antd";
import { Link, useParams } from "react-router-dom";

import { getMonthYearFromPayCycle, toWords } from "../util/Utils";

function SalarySheet(props) {
  const { Title } = Typography;

  const { empId, payCycle } = useParams();
  const { month, year } = getMonthYearFromPayCycle(payCycle);

  // eslint-disable-next-line
  const { employees, isEmpLoading } = useStoreState((state) => state.employees); // eslint-disable-next-line
  const { salaries, isSalariesLoading } = useStoreState(
    // eslint-disable-next-line
    (state) => state.salaries
  );

  const { getEmployeesThunk } = useStoreActions((actions) => actions.employees);
  const { getSalariesByEmpIdPayCycleThunk } = useStoreActions(
    (actions) => actions.salaries
  );

  useEffect(() => {
    getEmployeesThunk();
    getSalariesByEmpIdPayCycleThunk({ empId, payCycle }); // eslint-disable-next-line
  }, []);

  const style = {
    padding: "8px 0",
    height: "100%",
    fontWeight: 700,
  };

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
          <Link to="/salary-slips">Payslips</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={"/salary-sheet/" + empId + "/" + payCycle}>
            Salary Sheet
          </Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card
        title={
          "SALARY SLIP FOR THE MONTH OF " + month.toUpperCase() + ", " + year
        }
        style={{ margin: "20px", borderRadius: "15px" }}
      >
        <Row key={1}
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col span={6}>{payCycle}</Col>
          <Col span={6} offset={12}>
            {payCycle}
          </Col>
        </Row>
        <Row key={2}
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col className="gutter-row" span={11} offset={1}>
            <Title level={3} style={{ textAlign: "left" }}>
              Earnings
            </Title>
            <Divider />
            <Row  key={3}
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col span={12} style={{ ...style, textAlign: "left" }}>
                Basic Salary (LKR)
              </Col>
              <Col span={12} style={{ ...style, textAlign: "right" }}>
                {!isSalariesLoading && typeof salaries[0] !== "undefined"
                  ? "LKR " + salaries[0]["basic"].toFixed(2)
                  : ""}
              </Col>
            </Row>
            <Row  key={4}
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col span={12} style={{ ...style, textAlign: "left" }}>
                Fixed Allowance (LKR)
              </Col>
              <Col span={12} style={{ ...style, textAlign: "right" }}>
                {!isSalariesLoading &&
                typeof salaries[0] !== "undefined" &&
                typeof salaries[0]["fixedAllowance"] !== "undefined"
                  ? "LKR " + salaries[0]["fixedAllowance"].toFixed(2)
                  : "N/A"}
              </Col>
            </Row>
            <Row  key={5}
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col span={12} style={{ ...style, textAlign: "left" }}>
                Increment (LKR)
              </Col>
              <Col span={12} style={{ ...style, textAlign: "right" }}>
                {!isSalariesLoading &&
                typeof salaries[0] !== "undefined" &&
                typeof salaries[0]["increment"] !== "undefined"
                  ? "LKR " + salaries[0]["increment"].toFixed(2)
                  : "N/A"}
              </Col>
            </Row>
            <Row  key={6}
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col span={12} style={{ ...style, textAlign: "left" }}>
                Bonus (LKR)
              </Col>
              <Col span={12} style={{ ...style, textAlign: "right" }}>
                {!isSalariesLoading &&
                typeof salaries[0] !== "undefined" &&
                typeof salaries[0]["bonus"] !== "undefined"
                  ? "LKR " + salaries[0]["bonus"].toFixed(2)
                  : "N/A"}
              </Col>
            </Row>
            <Row  key={7}
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col span={7} style={{ ...style, textAlign: "left" }}>
                Fixed Commissions
              </Col>
            </Row>
            {!isSalariesLoading &&
            typeof salaries[0] !== "undefined" &&
            salaries[0]["fixedCommissions"].length !== 0 ? (
              salaries[0]["fixedCommissions"].map((v, i) => {
                return (
                  <Row  key={8}
                    gutter={{
                      xs: 8,
                      sm: 16,
                      md: 24,
                      lg: 32,
                    }}
                  >
                    <Col
                      span={8}
                      offset={7}
                      style={{ ...style, textAlign: "left" }}
                    >
                      {v["commissionName"]}
                    </Col>
                    <Col
                      span={9}
                      style={{
                        ...style,
                        textAlign: "right",
                      }}
                    >
                      {"LKR " + v["commission"].toFixed(2)}
                    </Col>
                  </Row>
                );
              })
            ) : (
              <Row  key={9}
                gutter={{
                  xs: 8,
                  sm: 16,
                  md: 24,
                  lg: 32,
                }}
              >
                <Col
                  span={8}
                  offset={7}
                  style={{ ...style, textAlign: "left" }}
                >
                  N/A
                </Col>
                <Col
                  span={9}
                  style={{
                    ...style,
                    textAlign: "right",
                  }}
                >
                  N/A
                </Col>
              </Row>
            )}

            <Row  key={10}
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col span={7} style={{ ...style, textAlign: "left" }}>
                Per Unit Commisions
              </Col>
            </Row>
            {!isSalariesLoading &&
            typeof salaries[0] !== "undefined" &&
            salaries[0]["perUnitCommissions"].length !== 0 ? (
              salaries[0]["perUnitCommissions"].map((v, i) => {
                return (
                  <Row key={11}
                    gutter={{
                      xs: 8,
                      sm: 16,
                      md: 24,
                      lg: 32,
                    }}
                  >
                    <Col
                      span={6}
                      offset={7}
                      style={{ ...style, textAlign: "left" }}
                    >
                      a
                    </Col>
                    <Col span={5} style={{ ...style, textAlign: "right" }}>
                      b
                    </Col>
                    <Col span={6} style={{ ...style, textAlign: "right" }}>
                      c
                    </Col>
                  </Row>
                );
              })
            ) : (
              <Row key={12}
                gutter={{
                  xs: 8,
                  sm: 16,
                  md: 24,
                  lg: 32,
                }}
              >
                <Col
                  span={6}
                  offset={7}
                  style={{ ...style, textAlign: "left" }}
                >
                  N/A
                </Col>
                <Col span={5} style={{ ...style, textAlign: "right" }}>
                  N/A
                </Col>
                <Col span={6} style={{ ...style, textAlign: "right" }}>
                  N/A
                </Col>
              </Row>
            )}
          </Col>
          <Col className="gutter-row" span={10} offset={1}>
            <Title level={3} style={{ textAlign: "left" }}>
              Deductions
            </Title>
            <Divider />
            <Row key={13}
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col span={12} style={{ ...style, textAlign: "left" }}>
                Reductions (LKR)
              </Col>
              <Col span={12} style={{ ...style, textAlign: "right" }}>
                {!isSalariesLoading &&
                typeof salaries[0] !== "undefined" &&
                typeof salaries[0]["reductions"] !== "undefined"
                  ? "LKR " + salaries[0]["reductions"].toFixed(2)
                  : "N/A"}
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider />
        <Row key={14}
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col span={8} style={{ ...style, textAlign: "right" }}>
            Net Salary (LKR)
          </Col>
          <Col
            span={8}
            style={{ ...style, textAlign: "right", fontSize: "1.5rem" }}
          >
            {!isSalariesLoading &&
            typeof salaries[0] !== "undefined" &&
            typeof salaries[0]["netSalary"] !== "undefined"
              ? "LKR " + salaries[0]["netSalary"].toFixed(2)
              : "N/A"}
          </Col>
          <Col
            span={8}
            style={{ ...style, textAlign: "right", fontSize: "1.5rem" }}
          >
            {!isSalariesLoading &&
            typeof salaries[0] !== "undefined" &&
            typeof salaries[0]["netSalary"] !== "undefined"
              ? toWords(salaries[0]["netSalary"])
              : "N/A"}
          </Col>
        </Row>
        <Row key={15}
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col span={8} style={{ ...style, textAlign: "right" }}>
            Gross Salary (LKR)
          </Col>
          <Col
            span={8}
            style={{ ...style, textAlign: "right", fontSize: "1.5rem" }}
          >
            {!isSalariesLoading &&
            typeof salaries[0] !== "undefined" &&
            typeof salaries[0]["grossSalary"] !== "undefined"
              ? "LKR " + salaries[0]["grossSalary"].toFixed(2)
              : "N/A"}
          </Col>
          <Col
            span={8}
            style={{ ...style, textAlign: "right", fontSize: "1.5rem" }}
          >
            {!isSalariesLoading &&
            typeof salaries[0] !== "undefined" &&
            typeof salaries[0]["grossSalary"] !== "undefined"
              ? toWords(salaries[0]["grossSalary"])
              : "N/A"}
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default SalarySheet;
