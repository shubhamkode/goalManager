import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector} from "react-redux";

import { Page } from "@/features/ui/components";
import { RootState } from "@/features/store";

export default function DashBoardPage() {
  const navigate = useNavigate();
  const { userToken } = useSelector((state: RootState) => state.auth);

  React.useEffect(() => {
    if (!userToken) {
      navigate("/auth/login");
    }
  }, [navigate, userToken]);

  return <Page>DashBoardPage</Page>;
}
