import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const IndexPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  });
  return <div>IndexPage</div>;
};

export default IndexPage;
