import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Row, Col, Card, Breadcrumb, Typography } from "antd";
import { Link, useParams } from "react-router-dom";

import { getMonthYearFromPayCycle } from "../util/Utils";

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
    border: "1px solid",
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
        <Row
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
        <Row
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
            <Row
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
            <Row
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
                {!isSalariesLoading && typeof salaries[0] !== "undefined"
                  ? "LKR " + salaries[0]["fixedAllowance"].toFixed(2)
                  : "N/A"}
              </Col>
            </Row>
            <Row
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
                {!isSalariesLoading && typeof salaries[0] !== "undefined"
                  ? "LKR " + salaries[0]["increment"].toFixed(2)
                  : "N/A"}
              </Col>
            </Row>
            <Row
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
                  <Row
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
              <Row
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

            <Row
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
                  <Row
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
              <Row
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
            <Row
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
              <Col span={12}></Col>
            </Row>
            <Row
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
              <Col span={12}></Col>
            </Row>
            <Row
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
              <Col span={12}></Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default SalarySheet;
