import { Navigate, createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Login from "../pages/login";
import Signup from "../pages/signup";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

// const Dashboard = React.lazy(() => import("../pages/dashboard/index"));
// const PrivateRoute = React.lazy(() => import("./PrivateRoute"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <Signup />
      </PublicRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

export default router;
