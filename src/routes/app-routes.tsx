import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPage from "../pages/Index";
import Login from "../pages/Login/login";
import Signup from "../pages/Signup/signup";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
