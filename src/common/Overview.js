import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Overview() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      Overview
    </div>
  );
}

export default Overview;
