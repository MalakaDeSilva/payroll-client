import { Button, Result } from "antd";
import React from "react";
import {useNavigate} from "react-router-dom";

function PermissionError() {
    const navigate = useNavigate();
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <div>
          <Button style={{ marginRight: "5px" }} onClick={() => navigate("/")}>Home</Button>

          <Button type="primary" onClick={() => navigate("/login")}>Login</Button>
        </div>
      }
    />
  );
}

export default PermissionError;
