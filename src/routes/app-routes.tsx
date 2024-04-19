import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPage from "../pages/Index";
import Login from "../pages/Login/login";
import Signup from "../pages/Signup/signup";
import Home from "../pages/Home/home";
import MyRegistrations from "../pages/MyRegistrations/my-registrations";
import PetDetails from "../pages/PetDetails/pet-details";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/my-registrations" element={<MyRegistrations />} />
        <Route path="/pet/:petId" element={<PetDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
