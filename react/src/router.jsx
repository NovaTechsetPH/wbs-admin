import { createBrowserRouter, Navigate } from "react-router-dom";

import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Dashboard from "./Dashboard.jsx";
import Employees from "./Employees.jsx";
import ActivityTracking from "./ActivityTracking";
import Attendance from "./Attendance";
import UserApproval from "./UserApproval";
import Report from "./Report";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/employee",
        element: <Employees />,
      },
      {
        path: "/activity-tracking",
        element: <ActivityTracking />,
      },
      {
        path: "/attendance",
        element: <Attendance />,
      },
      {
        path: "/user-approval",
        element: <UserApproval />,
      },
      {
        path: "/reports",
        element: <Report />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
