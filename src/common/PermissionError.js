import { Button, Result } from "antd";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { JWT_EXPIRED, JWT_INVALID } from "../util/Constants";

function PermissionError() {
  const navigate = useNavigate();
  const location = useLocation();

  let message =
    location.state.error === JWT_EXPIRED
      ? "Session expired."
      : "Invalid session information.";
  console.log(location.state.error);
  return (
    <Result
      status={
        location.state.error === JWT_EXPIRED ||
        location.state.error === JWT_INVALID
          ? "error"
          : "403"
      }
      title={
        location.state.error === JWT_EXPIRED ||
        location.state.error === JWT_INVALID
          ? message
          : "403"
      }
      subTitle={
        location.state.error === JWT_EXPIRED ||
        location.state.error === JWT_INVALID
          ? "Please log in."
          : "Sorry, you are not authorized to access this page."
      }
      extra={
        <div>
          {location.state.error === JWT_EXPIRED ||
          location.state.error === JWT_INVALID ? (
            <Button type="primary" onClick={() => navigate("/login")}>
              Login
            </Button>
          ) : (
            <Button style={{ marginRight: "5px" }} onClick={() => navigate(-2)}>
              Go Back
            </Button>
          )}
        </div>
      }
    />
  );
}

export default PermissionError;
