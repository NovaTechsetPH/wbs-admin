import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ntImage from "/nt-logo.png";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  // const navigate = useNavigate();
  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState("");

  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location]);

  return (
    <div
      className="drawer-side z-40 shadow-none"
      style={{ scrollBehavior: "smooth", scrollPaddingTop: "5rem" }}
    >
      <aside className="bg-base-100 w-90">
        <div className="bg-base-100 sticky top-0 z-20 hidden items-center gap-2 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex ">
          <a
            href="/"
            aria-current="page"
            aria-label="Homepage"
            className="flex-0 btn btn-ghost px-2"
            data-svelte-h="svelte-pw6yxt"
          >
            <img src={ntImage} alt="NT-Logo" width={36} height={36} />
            <div className="font-title inline-flex text-lg md:text-2xl">
              <span className="uppercase">WBS</span>
              {" - "}
              <span className="text-secondary">Admin</span>
            </div>
          </a>
        </div>
        <div className="h-4"></div>
        <ul className="menu menu-sm lg:menu-lg px-5 py-2">
          <li>
            <NavLink
              to={"/dashboard"}
              className={currentRoute == "dashboard" && "active"}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-blue-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/tracking"}
              className={currentRoute == "tracking" && "active"}
            >
              <span>
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  ></path>
                </svg>
              </span>
              <span>Activity Tracking</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/attendance"}
              className={currentRoute == "attendance" && "active"}
            >
              <span>
                <svg
                  fill={
                    currentRoute == "/attendance" ? "hsl(var(--b2))" : "#000000"
                  }
                  height="24"
                  width="24"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 397.445 397.445"
                  xmlSpace="preserve"
                >
                  <path
                    id="XMLID_63_"
                    d="M260.9,229.825c0,4.971-4.029,9-9,9h-43.116c-4.971,0-9-4.029-9-9s4.029-9,9-9H251.9  C256.871,220.825,260.9,224.854,260.9,229.825z M230.344,57.4c4.971,0,9-4.029,9-9V29.335c0-4.971-4.029-9-9-9s-9,4.029-9,9V48.4  C221.344,53.371,225.373,57.4,230.344,57.4z M199.784,103.342c0,4.971,4.029,9,9,9H251.9c4.971,0,9-4.029,9-9s-4.029-9-9-9h-43.116  C203.813,94.342,199.784,98.372,199.784,103.342z M251.9,157.583h-43.116c-4.971,0-9,4.029-9,9s4.029,9,9,9H251.9  c4.971,0,9-4.029,9-9S256.871,157.583,251.9,157.583z M301.217,57.4c4.971,0,9-4.029,9-9V29.335c0-4.971-4.029-9-9-9s-9,4.029-9,9  V48.4C292.217,53.371,296.246,57.4,301.217,57.4z M293.535,112.342h43.119c4.971,0,9-4.029,9-9s-4.029-9-9-9h-43.119  c-4.971,0-9,4.029-9,9S288.564,112.342,293.535,112.342z M293.535,175.583h43.119c4.971,0,9-4.029,9-9s-4.029-9-9-9h-43.119  c-4.971,0-9,4.029-9,9S288.564,175.583,293.535,175.583z M265.781,57.4c4.971,0,9-4.029,9-9V29.335c0-4.971-4.029-9-9-9  s-9,4.029-9,9V48.4C256.781,53.371,260.811,57.4,265.781,57.4z M293.535,238.825h43.119c4.971,0,9-4.029,9-9s-4.029-9-9-9h-43.119  c-4.971,0-9,4.029-9,9S288.564,238.825,293.535,238.825z M167.149,157.583h-43.117c-4.971,0-9,4.029-9,9s4.029,9,9,9h43.117  c4.971,0,9-4.029,9-9S172.12,157.583,167.149,157.583z M203.907,48.4V29.335c0-4.971-4.029-9-9-9s-9,4.029-9,9V48.4  c0,4.971,4.029,9,9,9S203.907,53.371,203.907,48.4z M167.149,94.342h-43.117c-4.971,0-9,4.029-9,9s4.029,9,9,9h43.117  c4.971,0,9-4.029,9-9S172.12,94.342,167.149,94.342z M388.445,31.102h-42.791v-1.767c0-4.971-4.029-9-9-9s-9,4.029-9,9V48.4  c0,4.971,4.029,9,9,9c4.734,0,8.614-3.655,8.973-8.298h33.818v234.963H208.106c-4.971,0-9,4.029-9,9s4.029,9,9,9h180.339  c4.971,0,9-4.029,9-9V40.102C397.445,35.131,393.416,31.102,388.445,31.102z M164.94,222.623c3.515,3.515,3.515,9.213,0,12.728  c-3.516,3.515-9.213,3.515-12.729,0l-0.377-0.377l-6.861,6.86c12.136,14.331,19.46,32.854,19.46,53.06  c0,45.335-36.883,82.217-82.217,82.217C36.882,377.11,0,340.228,0,294.893c0-39.001,27.296-71.747,63.787-80.135  c-0.069-0.451-0.105-0.914-0.105-1.384c0-4.971,4.029-9,9-9H91.75c4.971,0,9,4.029,9,9c0,0.471-0.036,0.933-0.105,1.384  c11.531,2.651,22.147,7.735,31.271,14.679l7.192-7.191l-0.376-0.375c-3.515-3.515-3.515-9.213,0-12.728  c3.516-3.516,9.213-3.516,12.729,0l6.659,6.659c0.027,0.026,0.054,0.053,0.081,0.08s0.053,0.054,0.079,0.081L164.94,222.623z   M82.217,230.675C46.808,230.675,18,259.483,18,294.893s28.808,64.217,64.217,64.217s64.217-28.808,64.217-64.217  S117.626,230.675,82.217,230.675z M72.239,175.583c4.971,0,9-4.029,9-9V49.102h33.822c0.358,4.643,4.238,8.298,8.973,8.298  c4.971,0,9-4.029,9-9V29.335c0-4.971-4.029-9-9-9s-9,4.029-9,9v1.767H72.239c-4.971,0-9,4.029-9,9v126.481  C63.239,171.554,67.269,175.583,72.239,175.583z M101.279,285.893H91.215v-25.64c0-4.971-4.029-9-9-9s-9,4.029-9,9v34.64  c0,4.971,4.029,9,9,9h19.064c4.971,0,9-4.029,9-9S106.25,285.893,101.279,285.893z M159.47,57.4c4.971,0,9-4.029,9-9V29.335  c0-4.971-4.029-9-9-9s-9,4.029-9,9V48.4C150.47,53.371,154.499,57.4,159.47,57.4z"
                  />
                </svg>
              </span>
              <span>Attendance</span>
            </NavLink>
          </li>
        </ul>
      </aside>
    </div>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
