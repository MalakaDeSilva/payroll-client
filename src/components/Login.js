import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Typography,
  Alert,
} from "antd";
import React, { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { verification } = useStoreState((state) => state.auth);

  const { loginThunk, verifyThunk } = useStoreActions(
    (actions) => actions.auth
  );

  const onFinish = async (values) => {
    let output = await loginThunk(values);
    if (output["result"]) {
      navigate("/");
    } else {
      setError(output["data"]["error"]);
    }
  };

  
  useEffect(() => {
    if (Object.keys(verification).length === 0) {
      verifyThunk();
    } // eslint-disable-next-line
    if (Object.keys(verification).length !== 0 && verification["verified"]) {
      navigate("/");
    } // eslint-disable-next-line
  }, [verification]);

  const { Title } = Typography;

  return (
    <div
      style={{
        height: "80vh",
        width: "98vw",
        paddingTop: "10%",
      }}
    >
      <Title level={1} style={{ fontSize: "60px" }}>
        Picaroon Pvt. Ltd.
      </Title>
      <Row gutter={16} style={{ marginTop: "5%" }}>
        <Col span={4} offset={10}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Row gutter={16} style={{ paddingBottom: "20px" }}>
              <Col span={24}>
                {error ? <Alert message={error} type="error" /> : ""}
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                    type={"email"}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={11}>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                </Form.Item>
              </Col>
              <Col span={10} offset={3}>
                <a className="login-form-forgot" href="/login">
                  Forgot password
                </a>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    style={{ width: "100%" }}
                  >
                    Log in
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
