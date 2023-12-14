import { createBrowserRouter, Navigate } from "react-router-dom";

import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";

import UserForm from "./views/UserForm";
import ActivityChart from "./components/ActivityChart.jsx";

import Dashboard from "./Dashboard.jsx";
import Employees from "./Employees.jsx";
import ActivityTracking from "./ActivityTracking";
import Attendance from "./Attendance";

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
        // element: <Users />,
      },
      {
        path: "/tracking",
        element: <ActivityChart />,
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
