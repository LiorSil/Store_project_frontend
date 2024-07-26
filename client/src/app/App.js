import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import NotFound from "./pages/error/NotFound.jsx";

import "./variables.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
