import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import DashBoardPageTemplate from "@/features/ui/templates/DashBoardPageTemplate";
import { RootState } from "@/features/store";
import { useGetAllGoalsQuery } from "@/features/store/goal/goalApi";
import { useGetMeQuery } from "@/features/store/auth/authApi";

const DashBoard = () => {
  const navigate = useNavigate();
  const { userToken } = useSelector((state: RootState) => state.auth);

  const { data: userInfo } = useGetMeQuery(
    { userToken },
    { skip: userToken === null }
  );
  const { data: goals } = useGetAllGoalsQuery(undefined, {
    skip: userToken === null,
  });

  React.useEffect(() => {
    if (!userToken) {
      navigate("/auth/login");
    }
  }, [userToken, navigate]);

  return (
    <>
      {goals && userInfo && (
        <DashBoardPageTemplate username={userInfo.name} goals={goals} />
      )}
    </>
  );
};

export default DashBoard;
