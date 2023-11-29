import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";
import Navbar from "./layout/Navbar.jsx";

import { Sidebar } from "./extra/sidebar";

import { playlists } from "./data/playlists";

// import EmployeeAnomaly from "./extra/employee-status";

export default function DefaultLayout() {
  const { user, token, setUser, setToken, notification } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);

  return (
    <div className="md:block">
      <Navbar />
      <div className="border-t">
        <div className="bg-background">
          <div className="grid lg:grid-cols-7">
            <Sidebar playlists={playlists} className="hidden lg:block" />
            <div className="col-span-3 lg:col-span-6 lg:border-l">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
