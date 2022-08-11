import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";

function Overview() {
  const navigate = useNavigate();

  const { verification } = useStoreState((state) => state.auth);

  const { verifyThunk } = useStoreActions((actions) => actions.auth);

  useEffect(() => {
    if (Object.keys(verification).length === 0) {
      verifyThunk();
    }
    if (Object.keys(verification).length !== 0 && !verification["verified"]) {
      navigate("/login");
    }// eslint-disable-next-line
  }, [navigate, verification]);

  return <div>Overview</div>;
}

export default Overview;
