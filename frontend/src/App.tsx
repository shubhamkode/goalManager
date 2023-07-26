import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toast";

import { store } from "@/features/store";
import { DashBoardPage, LoginPage, RegisterPage } from "@/features/ui/pages";

export default function App() {
  return (
    <Provider store={store}>
      <ToastContainer position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashBoardPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
