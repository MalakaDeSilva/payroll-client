import React from "react";
import {
  Drawer,
  Form,
  Col,
  Row,
  Input,
  Button,
  Space,
  InputNumber,
  message,
} from "antd";
import { useStoreActions } from "easy-peasy";

function NewDesignation(props) {
  const [form] = Form.useForm();

  const { visible, onClose, title, desg, action } = props;

  const { addDesignationThunk, updateDesignationThunk, actionDrawer } =
    useStoreActions((actions) => actions.designations);

  const toggleDrawer = () => {
    actionDrawer();
  };

  const onFinish = async (values) => {
    if (action === "ADD") {
      let result = await addDesignationThunk(values);
      if (typeof result["data"]["createdDesignation"] != "undefined") {
        message.success("Designation added.");
      } else {
        message.error("An error occurred.");
      }
    } else if (action === "UPDATE") {
      values["_id"] = desg["_id"];
      let result = await updateDesignationThunk(values);
      if (typeof result["data"]["updatedDesignation"] != "undefined") {
        message.success("Designation updated.");
      } else {
        message.error("An error occurred.");
      }
    }

    toggleDrawer();
  };

  const onVisibilityChange = (visible) => {
    if (visible) {
      form.setFieldsValue({
        name: desg.designationName,
        code: desg.designationCode,
        salFrom:
          typeof desg.salaryRange !== "undefined" ? desg.salaryRange.from : 0,
        salTo:
          typeof desg.salaryRange !== "undefined" ? desg.salaryRange.to : 0,
      });
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
          form={form}
          onFinish={onFinish}
          hideRequiredMark
        >
          <Row gutter={16}>
            <Col span={14}>
              <Form.Item
                name="name"
                label="Designation Name"
                rules={[
                  { required: true, message: "Please enter Designation Name." },
                ]}
              >
                <Input placeholder="Please enter Designation Name" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="code"
                label="Designation Code"
                rules={[
                  { required: true, message: "Please enter Designation Code." },
                ]}
              >
                <Input placeholder="Please enter Designation Code" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="salFrom"
                label="From"
                rules={[
                  {
                    required: true,
                    message: "Please enter salary lower limit.",
                  },
                ]}
              >
                <InputNumber
                  prefix="LKR"
                  placeholder="Please enter salary lower limit."
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="salTo"
                label="To"
                rules={[
                  {
                    required: true,
                    message: "Please enter upper salary limit.",
                  },
                ]}
              >
                <InputNumber
                  prefix="LKR"
                  placeholder="Please enter upper salary limit."
                  style={{ width: "100%" }}
                />
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
