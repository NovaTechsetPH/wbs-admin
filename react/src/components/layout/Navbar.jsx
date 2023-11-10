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
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-controls="typeahead-0.5vhfngdop6m-listbox"
                  aria-expanded="false"
                  id="typeahead-0.5vhfngdop6m-typeahead"
                >
                  <form>
                    <input
                      type="text"
                      placeholder="Search"
                      className="input input-bordered w-full max-w-xs mt-2"
                      id="search-box-nav"
                    />
                  </form>
                </div>
              </label>
            </div>
          </div>
          <div className="flex-0">
            <div className="hidden flex-none items-center lg:block">
              <a
                href="/components/"
                className="btn btn-ghost drawer-button font-normal normal-case"
              >
                Components
              </a>
            </div>
            <div className="hidden flex-none items-center lg:block">
              <a
                href="/blog/"
                className="btn btn-ghost drawer-button font-normal normal-case"
              >
                Blog
              </a>
            </div>
            <div title="Change Theme" className="dropdown dropdown-end ">
              <div tabIndex="0" className="btn normal-case btn-ghost">
                <svg
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 stroke-current md:hidden"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
                <span className="hidden font-normal md:inline">Theme</span>
                <svg
                  width="12px"
                  height="12px"
                  className="hidden h-2 w-2 fill-current opacity-60 sm:inline-block"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 2048 2048"
                >
                  <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
                </svg>
              </div>
              <div className="dropdown-content bg-base-200 text-base-content rounded-box top-px max-h-96 w-56 overflow-y-auto shadow mt-16">
                <div className="grid grid-cols-1 gap-3 p-3" tabIndex="0">
                  <button
                    className="outline-base-content overflow-hidden rounded-lg text-left [&amp;_svg]:visible"
                    data-set-theme="light"
                  >
                    <span
                      data-theme="light"
                      className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                    >
                      <span className="grid grid-cols-5 grid-rows-3">
                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="invisible h-3 w-3 shrink-0"
                          >
                            <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                          </svg>
                          <span className="flex-grow text-sm">light</span>
                          <span className="flex h-full flex-shrink-0 flex-wrap gap-1">
                            <span className="bg-primary w-2 rounded" />
                            <span className="bg-secondary w-2 rounded" />
                            <span className="bg-accent w-2 rounded" />
                            <span className="bg-neutral w-2 rounded" />
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>
                  <button
                    className="outline-base-content overflow-hidden rounded-lg text-left"
                    data-set-theme="dark"
                  >
                    <span
                      data-theme="dark"
                      className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                    >
                      <span className="grid grid-cols-5 grid-rows-3">
                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="invisible h-3 w-3 shrink-0"
                          >
                            <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                          </svg>
                          <span className="flex-grow text-sm">dark</span>
                          <span className="flex h-full flex-shrink-0 flex-wrap gap-1">
                            <span className="bg-primary w-2 rounded" />
                            <span className="bg-secondary w-2 rounded" />
                            <span className="bg-accent w-2 rounded" />
                            <span className="bg-neutral w-2 rounded" />
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div title="Change Language" className="dropdown dropdown-end">
              <div tabIndex="0" className="btn btn-ghost normal-case">
                <svg
                  className="h-5 w-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 512 512"
                >
                  <path d="M363,176,246,464h47.24l24.49-58h90.54l24.49,58H480ZM336.31,362,363,279.85,389.69,362Z" />
                  <path d="M272,320c-.25-.19-20.59-15.77-45.42-42.67,39.58-53.64,62-114.61,71.15-143.33H352V90H214V48H170V90H32v44H251.25c-9.52,26.95-27.05,69.5-53.79,108.36-32.68-43.44-47.14-75.88-47.33-76.22L143,152l-38,22,6.87,13.86c.89,1.56,17.19,37.9,54.71,86.57.92,1.21,1.85,2.39,2.78,3.57-49.72,56.86-89.15,79.09-89.66,79.47L64,368l23,36,19.3-11.47c2.2-1.67,41.33-24,92-80.78,24.52,26.28,43.22,40.83,44.3,41.67L255,362Z" />
                </svg>
                <svg
                  width="12px"
                  height="12px"
                  className="hidden h-2 w-2 fill-current opacity-60 sm:inline-block"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 2048 2048"
                >
                  <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
                </svg>
              </div>
            </div>
            <span className="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)] max-lg:hidden">
              <div className="flex-none items-center">
                <a
                  aria-label="Github"
                  target="_blank"
                  href="https://github.com/saadeghi/daisyui"
                  rel="noopener, noreferrer"
                  className="btn btn-ghost drawer-button btn-square normal-case"
                >
                  <svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="inline-block h-5 w-5 fill-current md:h-6 md:w-6"
                  >
                    <path d="M256,32C132.3,32,32,134.9,32,261.7c0,101.5,64.2,187.5,153.2,217.9a17.56,17.56,0,0,0,3.8.4c8.3,0,11.5-6.1,11.5-11.4,0-5.5-.2-19.9-.3-39.1a102.4,102.4,0,0,1-22.6,2.7c-43.1,0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1,1.4-14.1h.1c22.5,2,34.3,23.8,34.3,23.8,11.2,19.6,26.2,25.1,39.6,25.1a63,63,0,0,0,25.6-6c2-14.8,7.8-24.9,14.2-30.7-49.7-5.8-102-25.5-102-113.5,0-25.1,8.7-45.6,23-61.6-2.3-5.8-10-29.2,2.2-60.8a18.64,18.64,0,0,1,5-.5c8.1,0,26.4,3.1,56.6,24.1a208.21,208.21,0,0,1,112.2,0c30.2-21,48.5-24.1,56.6-24.1a18.64,18.64,0,0,1,5,.5c12.2,31.6,4.5,55,2.2,60.8,14.3,16.1,23,36.6,23,61.6,0,88.2-52.4,107.6-102.3,113.3,8,7.1,15.2,21.1,15.2,42.5,0,30.7-.3,55.5-.3,63,0,5.4,3.1,11.5,11.4,11.5a19.35,19.35,0,0,0,4-.4C415.9,449.2,480,363.1,480,261.7,480,134.9,379.7,32,256,32Z" />
                  </svg>
                </a>
              </div>
            </span>
          </div>
        </nav>
      </div>
      <div className="h-4"></div>
    </>
  );
};

export default Navbar;
