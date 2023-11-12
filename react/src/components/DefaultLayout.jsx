import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";
import Sidebar from "./layout/Sidebar.jsx";
import Navbar from "./layout/Navbar.jsx";

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
    <div className="bg-base-100 drawer lg:drawer-open">
      <input id="drawer" type="checkbox" className="drawer-toggle"></input>
      <div className="drawer-content">
        <Navbar />
        <main className="mx-8">
          <Outlet />
        </main>
        {notification && <div className="notification">{notification}</div>}
      </div>
      <Sidebar />
    </div>
  );
}
