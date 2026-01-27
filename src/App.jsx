import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import Course from "./pages/Course";
import CourseDetail from "./pages/CourseDetail";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCourses from "./pages/admin/AdminCourses";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/course"
            element={
              <ProtectedRoute roles={["user", "vip", "admin"]}>
                <Course />
              </ProtectedRoute>
            }
          />

          <Route
            path="/course/:id"
            element={
              <ProtectedRoute roles={["user", "vip", "admin"]}>
                <CourseDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminUsers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/courses"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminCourses />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/register"
            element={
              <ProtectedRoute roles={["admin"]}>
                <Register />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
