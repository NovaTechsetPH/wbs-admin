import React, { useEffect } from "react";
import { useStateContext } from "./../../context/ContextProvider";
import axiosClient from "./../../axios-client";
import ProfileAvatar from "./ProfileAvatar";

const Navbar = () => {
  const { setUser, setToken, filterString, setFilterString } =
    useStateContext();

  const onLogout = (ev) => {
    ev.preventDefault();
    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  const filterEmployee = (event) => {
    setFilterString(event.target.value);
  };

  return (
    <>
      <nav className="navbar bg-base-100 p-3">
        <div className="flex-1">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
              onChange={filterEmployee}
            />
          </div>
        </div>
        <div className="flex-none gap-2">
          <a className="btn btn-ghost text-xl">Home</a>
          <ProfileAvatar onLogout={onLogout} />
        </div>
      </nav>
      <div className="h-4"></div>
    </>
  );
};

export default Navbar;
