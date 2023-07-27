import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toast";

import { store } from "@/features/store";
import { DashBoardPage, LoginPage, RegisterPage } from "@/features/ui/pages";

export default function App() {
  return (
    <div className="w-screen h-screen">
      <Provider store={store}>
        <ToastContainer position="top-right" delay={2000} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashBoardPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to={"/auth/register"} />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
