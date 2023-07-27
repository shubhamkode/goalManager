import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { LoginPageTemplate } from "@/features/ui/templates";
import { RootState } from "@/features/store";

const LoginPage = () => {
  const navigate = useNavigate();
  const { userToken } = useSelector((state: RootState) => state.auth);

  React.useEffect(() => {
    if (userToken) {
      navigate("/");
    }
  }, [userToken, navigate]);

  return (
    <>
      <LoginPageTemplate />
    </>
  );
};

export default LoginPage;
