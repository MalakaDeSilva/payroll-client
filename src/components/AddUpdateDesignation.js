import React, { useEffect } from "react";
import { Drawer, Form, Col, Row, Input, Select, Button, Space } from "antd";
import { useStoreActions, useStoreState } from "easy-peasy";

function NewDesignation(props) {
  const { visible, onClose } = props;
  // const [open, setOpen] = useState(visible);
  const { Option } = Select;
  const { addDesignationThunk, actionDrawer } = useStoreActions(
    (actions) => actions.designations
  );
  const toggleDrawer = () => {
    actionDrawer();
  };

  const onFinish = (values) => {
    addDesignationThunk(values);
    toggleDrawer();
  };
  return (
    <div>
      <Drawer
        title="New employee"
        width={600}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form layout="vertical" onFinish={onFinish} hideRequiredMark>
          <Row gutter={16}>
            <Col span={14}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter name." }]}
              >
                <Input placeholder="Please enter name" />
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
            <Col span={24}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Please enter email." }]}
              >
                <Input placeholder="Please enter email" type={"email"} />
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
                    Submit
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

export default NewDesignation;
