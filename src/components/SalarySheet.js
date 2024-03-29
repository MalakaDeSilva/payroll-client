import React, { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Row, Col, Card, Breadcrumb, Typography, Divider, Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import { Link, useParams, useNavigate } from "react-router-dom";

import { generateSlip } from "../services/SalaryService";

import {
  getMonthYearFromPayCycle,
  toWords,
  capitalizeFirstLetter,
} from "../util/Utils";

function SalarySheet(props) {
  const { Title } = Typography;

  const { empId, payCycle } = useParams();
  const { month, year } = getMonthYearFromPayCycle(payCycle);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // eslint-disable-next-line
  const { employees, isEmpLoading } = useStoreState((state) => state.employees); // eslint-disable-next-line
  const { salaries, isSalariesLoading } = useStoreState(
    // eslint-disable-next-line
    (state) => state.salaries
  );
  const { designations, isDesgLoading } = useStoreState(
    (state) => state.designations
  );

  const { getEmployeesThunk } = useStoreActions((actions) => actions.employees);
  const { getSalariesByEmpIdPayCycleThunk } = useStoreActions(
    (actions) => actions.salaries
  );
  const { getDesignationsThunk } = useStoreActions(
    (actions) => actions.designations
  );

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/permission-error");
    }
    getDesignationsThunk();
    getEmployeesThunk();
    getSalariesByEmpIdPayCycleThunk({ empId, payCycle }); // eslint-disable-next-line
  }, []);

  const style = {
    padding: "8px 0",
    height: "100%",
    fontWeight: 700,
  };

  const getEmployee = (empId) => {
    return isEmpLoading || employees.length <= 0
      ? ""
      : employees.find((ele) => ele.employeeId === empId);
  };

  const getDesignation = (code) => {
    let desg = "";
    if (!isDesgLoading) {
      designations.forEach((value, index) => {
        if (value["designationCode"] === code) {
          desg = value["designationName"];
        }
      });
    }

    return desg;
  };

  const generateSalarySlip = () => {
    setLoading(true);
    let id = salaries[0]["_id"];
    generateSlip(id).then((response) => {
      setLoading(false);
      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${empId} - ${payCycle}.pdf`;
      link.click();
    });
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
        extra={
          <Button
            icon={<PrinterOutlined style={{ fontSize: "25px" }} />}
            shape="circle"
            size="large"
            loading={loading}
            onClick={generateSalarySlip}
          ></Button>
        }
        style={{ margin: "20px", borderRadius: "15px" }}
      >
        <Row
          key="org"
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col span={8} offset={8}>
            <Title level={1}>Picaroon Pvt. Ltd.</Title>
          </Col>
        </Row>
        <Row
          key={1}
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
          style={{ marginLeft: "40px" }}
        >
          <Col span={6}>
            <Row
              key={"sub1"}
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col
                span={24}
                style={{ textAlign: "left", fontWeight: 600, fontSize: "18px" }}
              >
                {getEmployee(empId).name}
              </Col>
            </Row>
            <Row
              key={"sub2"}
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col
                span={24}
                style={{ textAlign: "left", fontWeight: 600, fontSize: "18px" }}
              >
                {getDesignation(getEmployee(empId).designation)}
              </Col>
            </Row>
            <Row
              key={"sub3"}
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col
                span={24}
                style={{ textAlign: "left", fontWeight: 600, fontSize: "18px" }}
              >
                {"Employee ID: " + getEmployee(empId).employeeId}
              </Col>
            </Row>
            <Row
              key={"sub4"}
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col
                span={24}
                style={{ textAlign: "left", fontWeight: 600, fontSize: "18px" }}
              >
                {"Joining Date: " +
                  new Date(getEmployee(empId).joinedDate).toLocaleDateString()}
              </Col>
            </Row>
          </Col>
          <Col
            span={6}
            offset={12}
            style={{ fontWeight: 600, fontSize: "18px" }}
          >
            {"Salary Month: " + month + ", " + year}
          </Col>
        </Row>
        <Divider />
        <Row
          key={2}
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
            <Row
              key={3}
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
              key={4}
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
            <Row
              key={5}
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
            <Row
              key={6}
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
            <Row
              key={7}
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
                    key={i + "8"}
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
                key={9}
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
              key={10}
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
                    key={i + "11"}
                    gutter={{
                      xs: 8,
                      sm: 16,
                      md: 24,
                      lg: 32,
                    }}
                  >
                    <Col
                      span={5}
                      offset={7}
                      style={{ ...style, textAlign: "left" }}
                    >
                      {v["commissionName"]}
                    </Col>
                    <Col span={2} style={{ ...style, textAlign: "right" }}>
                      {v["units"]}
                    </Col>
                    <Col span={4} style={{ ...style, textAlign: "right" }}>
                      {"LKR " + v["commission"].toFixed(2)}
                    </Col>
                    <Col span={6} style={{ ...style, textAlign: "right" }}>
                      {"LKR " + v["totalCommission"].toFixed(2)}
                    </Col>
                  </Row>
                );
              })
            ) : (
              <Row
                key={12}
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
            <Row
              key={13}
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
        <Row
          key={14}
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col span={7} style={{ ...style, textAlign: "right" }}>
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
            span={9}
            style={{ ...style, textAlign: "right", fontSize: "1.1rem" }}
          >
            {!isSalariesLoading &&
            typeof salaries[0] !== "undefined" &&
            typeof salaries[0]["netSalary"] !== "undefined"
              ? "( " +
                capitalizeFirstLetter(toWords(salaries[0]["netSalary"])) +
                " )"
              : "N/A"}
          </Col>
        </Row>
        <Row
          key={15}
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col span={7} style={{ ...style, textAlign: "right" }}>
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
            span={9}
            style={{ ...style, textAlign: "right", fontSize: "1.1rem" }}
          >
            {!isSalariesLoading &&
            typeof salaries[0] !== "undefined" &&
            typeof salaries[0]["grossSalary"] !== "undefined"
              ? "( " +
                capitalizeFirstLetter(toWords(salaries[0]["grossSalary"])) +
                " )"
              : "N/A"}
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default SalarySheet;
