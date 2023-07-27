import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import DashBoardPageTemplate from "../templates/DashBoardPageTemplate";
import { RootState } from "@/features/store";
import { useGetAllGoalsQuery } from "@/features/store/goal/goalApi";

const DashBoard = () => {
  const navigate = useNavigate();
  const { userToken } = useSelector((state: RootState) => state.auth);

  const { data } = useGetAllGoalsQuery();

  React.useEffect(() => {
    if (!userToken) {
      navigate("/auth/login");
    }
  }, [userToken, navigate]);

  return (
    <>{data && <DashBoardPageTemplate username="Shubham" goals={data} />}</>
  );
};

export default DashBoard;
