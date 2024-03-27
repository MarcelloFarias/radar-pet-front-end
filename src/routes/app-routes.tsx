import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPage from "../pages/Index";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
