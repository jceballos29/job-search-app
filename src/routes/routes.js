import { lazy, useContext } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import { authContext } from "../context/AuthContext";

const Home = lazy(() => import("../pages/Home"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

const AppRoutes = () => {
  const context = useContext(authContext);

  return useRoutes([
    {
      path: "/",
      element: context.auth.isAuthenticated ? (
        <MainLayout />
      ) : (
        <Navigate to="/ingreso" replace />
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        }
      ],
    },
    {
      path: "/ingreso",
      element: context.auth.isAuthenticated ? (
        <Navigate to="/" replace />
      ) : (
        <Login />
      ),
    },
    {
      path: "/registro",
      element: context.auth.isAuthenticated ? (
        <Navigate to="/" replace />
      ) : (
        <Register />
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
};

export default AppRoutes;
