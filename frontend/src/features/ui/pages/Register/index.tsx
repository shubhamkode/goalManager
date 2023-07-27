import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { RegisterPageTemplate } from "@/features/ui/templates";
import { RootState } from "@/features/store";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { userToken } = useSelector((state: RootState) => state.auth);
  React.useEffect(() => {
    if (userToken) navigate("/");
  }, [userToken, navigate]);
  return (
    <>
      <RegisterPageTemplate />
    </>
  );
};

export default RegisterPage;
