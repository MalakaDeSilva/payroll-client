import React, { useEffect, useState } from "react";
import {
  Drawer,
  Form,
  Col,
  Row,
  Input,
  InputNumber,
  Select,
  Button,
  Space,
  message
} from "antd";
import { useStoreActions, useStoreState } from "easy-peasy";

function AddUpdateEmployee(props) {
  const [form] = Form.useForm();
  const { Option } = Select;

  const { visible, onClose, title, emp, action } = props;

  const [payRange, setPayRange] = useState({
    salFrom: 0,
    salTo: 0,
  });
  const [salaryField, setSalaryField] = useState(true);
  const [employee, setEmployee] = useState({});
  const {
    addEmployeeThunk,
    updateEmployeeThunk,
    getEmployeesThunk,
    actionDrawer,
  } = useStoreActions((actions) => actions.employees);
  const { getDesignationsThunk } = useStoreActions(
    (actions) => actions.designations
  );

  const { designations, isDesgLoading } = useStoreState(
    (state) => state.designations
  );

  //useStoreActions((actions) => actions.employees.setEmployeeAction(emp));

  useEffect(() => {
    getDesignationsThunk(); // eslint-disable-next-line
  }, [employee]);

  const toggleDrawer = () => {
    actionDrawer();
  };

  const onFinish = async (values) => {
    if (action === "ADD") {
      let result = await addEmployeeThunk(values);

      if(typeof result["data"]["createdEmployee"] != "undefined") {
        message.success("Employee added.")
      } else {
        message.error("An error occurred.")
      }
    } else if (action === "UPDATE") {
      values["_id"] = emp["_id"];
      let result = await updateEmployeeThunk(values);

      if(typeof result["data"]["updatedEmployee"] != "undefined") {
        message.success("Employee updated.")
      } else {
        message.error("An error occurred.")
      }
    }

    toggleDrawer();
    getEmployeesThunk();
  };

  const getDesignations = () => {
    if (isDesgLoading) {
      return "";
    } else {
      return designations.map((value, index) => {
        return (
          <Option value={value.designationCode} key={value._id}>
            {value.designationName}
          </Option>
        );
      });
    }
  };

  const onDesignationSelected = (code, option) => {
    setSalaryField(false);
    if (isDesgLoading) {
      setPayRange({
        salFrom: 0,
        salTo: 0,
      });
    } else {
      designations.forEach((value, index) => {
        if (value.designationCode === code) {
          setPayRange({
            salFrom: value.salaryRange.from,
            salTo: value.salaryRange.to,
          });
        }
      });
    }
  };

  const onVisibilityChange = (visible) => {
    if (visible) {
      form.setFieldsValue({
        name: emp.name,
        employeeId: emp.employeeId,
        email: emp.email,
        dob: new Date(emp.dob).toLocaleDateString("en-CA"),
        date: new Date(emp.joinedDate).toLocaleDateString("en-CA"),
        designation: emp.designation,
        salary: parseFloat(emp.salary),
        phone: emp.phone,
        nic: emp.NIC,
      });

      if (isDesgLoading) {
        setPayRange({
          salFrom: 0,
          salTo: 0,
        });
      } else {
        designations.forEach((value, index) => {
          if (value.designationCode === emp.designation) {
            setPayRange({
              salFrom: value.salaryRange.from,
              salTo: value.salaryRange.to,
            });
          }
        });
      }

      if (typeof emp.salary != "undefined") {
        setSalaryField(false);
      }
    } else {
      setEmployee({});
    }
  };

  return (
    <div>
      <Drawer
        title={title}
        width={600}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        afterVisibleChange={onVisibilityChange}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          hideRequiredMark
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter name." }]}
              >
                <Input placeholder="Please enter name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={14}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Please enter email." }]}
              >
                <Input placeholder="Please enter email" type={"email"} />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="employeeId"
                label="Employee Id"
                rules={[
                  { required: true, message: "Please enter Employee Id." },
                ]}
              >
                <Input placeholder="Please enter Employee Id" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="dob"
                label="Date of Birth"
                rules={[
                  { required: true, message: "Please enter Date of Birth." },
                ]}
              >
                <Input placeholder="Please enter Date of Birth" type={"date"} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="date"
                label="Joined Date"
                rules={[
                  { required: true, message: "Please enter joined date." },
                ]}
              >
                <Input placeholder="Please enter joined date" type={"date"} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={14}>
              <Form.Item
                name="designation"
                label="Designation"
                rules={[
                  { required: true, message: "Please choose the Designation" },
                ]}
              >
                <Select
                  placeholder="Please choose the Designation"
                  onChange={onDesignationSelected}
                >
                  {getDesignations()}
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="salary"
                label="Salary"
                rules={[{ required: true, message: "Please enter salary" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  max={payRange.salTo}
                  min={payRange.salFrom}
                  placeholder="Please enter salary"
                  disabled={salaryField}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[
                  { required: true, message: "Please enter phone number" },
                ]}
              >
                <Input placeholder="Please enter phone number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="nic"
                label="NIC"
                rules={[{ required: true, message: "Please enter NIC" }]}
              >
                <Input placeholder="Please enter NIC" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    {action === "ADD" ? "Submit" : "Update"}
                  </Button>
                  <Button htmlType="button" onClick={toggleDrawer}>
                    Cancel
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
}

export default AddUpdateEmployee;
