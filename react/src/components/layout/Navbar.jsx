import React from "react";

const Navbar = () => {
  return (
    <>
      <div className="bg-base-100 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 [transform:translate3d(0,0,0)]">
        <nav className="navbar w-full">
          <div className="flex flex-1 md:gap-1 lg:gap-2">
            <span
              className="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]"
              data-tip="Menu"
            >
              <label
                aria-label="Open menu"
                // for="drawer"
                className="btn btn-square btn-ghost drawer-button lg:hidden"
              >
                <svg
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </span>
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href="/"
                aria-current="page"
                aria-label="Homepage"
                className="flex-0 btn btn-ghost gap-1 px-2 md:gap-2"
                data-svelte-h="svelte-11qcss2"
              >
                <svg
                  className="h-6 w-6 md:h-8 md:w-8"
                  width="32"
                  height="32"
                  viewBox="0 0 415 415"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="82.5"
                    y="290"
                    width="250"
                    height="125"
                    rx="62.5"
                    fill="#1AD1A5"
                  ></rect>
                  <circle
                    cx="207.5"
                    cy="135"
                    r="130"
                    fill="black"
                    fillOpacity=".3"
                  ></circle>
                  <circle cx="207.5" cy="135" r="125" fill="white"></circle>
                  <circle cx="207.5" cy="135" r="56" fill="#FF9903"></circle>
                </svg>
                <div className="font-title inline-flex text-lg md:text-2xl">
                  <span className="lowercase">daisy</span>
                  <span className="uppercase text-[#1AD1A5]">UI</span>
                </div>
              </a>
              <div className="dropdown">
                <div
                  tabIndex="0"
                  className="link link-hover my-8 inline-block font-mono text-xs"
                >
                  3.9.4
                </div>
                <ul
                  tabIndex="0"
                  className="dropdown-content menu menu-sm bg-base-200 rounded-box w-36 p-2 shadow"
                  data-svelte-h="svelte-9uoigy"
                >
                  <li>
                    <a href="/docs/changelog/">Changelog</a>
                  </li>
                  <li></li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener, noreferrer"
                      href="https://v2.daisyui.com/"
                    >
                      Version 2.x
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener, noreferrer"
                      href="https://v1.daisyui.com/"
                    >
                      Version 1.x
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="hidden w-full max-w-sm lg:flex">
              <label className="searchbox relative mx-3 w-full">
                <div
                  data-svelte-typeahead=""
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-controls="typeahead-0.5vhfngdop6m-listbox"
                  aria-expanded="false"
                  id="typeahead-0.5vhfngdop6m-typeahead"
                  className="svelte-4tg1b1"
                >
                  <form data-svelte-search="">
                    <input
                      type="text"
                      placeholder="Search"
                      className="input input-bordered w-full max-w-xs"
                      id="search-box-nav"
                    />
                  </form>
                </div>
              </label>
            </div>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a>Link</a>
              </li>
              <li>
                <details>
                  <summary>Parent</summary>
                  <ul className="p-2 bg-base-100">
                    <li>
                      <a>Link 1</a>
                    </li>
                    <li>
                      <a>Link 2</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="h-4"></div>
    </>
  );
};

export default Navbar;
