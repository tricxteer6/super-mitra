import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Course from "./pages/Course";
function App() {
  return (
    <Routes>
      {" "}
      {/* tanpa navbar */} <Route path="/login" element={<Login />} />{" "}
      {/* dengan navbar & footer */}{" "}
      <Route element={<MainLayout />}>
        {" "}
        <Route path="/" element={<HomePage />} />{" "}
        <Route path="/course" element={<Course />} />{" "}
      </Route>{" "}
    </Routes>
  );
}

export default App;
