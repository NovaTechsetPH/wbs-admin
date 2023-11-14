import React from "react";

const ProfileAvatar = ({ onLogout }) => {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://avatars.githubusercontent.com/u/46813058?v=4"
          />
        </div>
      </label>
      <ul
        tabIndex="0"
        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
      >
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li onClick={onLogout}>
          <a>Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default ProfileAvatar;
