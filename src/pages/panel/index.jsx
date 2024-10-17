import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainUserTable from "../../components/main-user-table";

const MainPanelPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-bg1 font-family-karla flex">
      <aside className="relative bg-bg2 h-screen w-64 hidden sm:block shadow-xl">
        <div className="p-6">
          <Link
            to="/panel"
            className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
          >
            Admin
          </Link>
        </div>
        <nav className="text-white text-base font-semibold pt-3">
          <Link
            to="/panel"
            className="flex items-center active-nav-link text-white py-4 pl-6 nav-item"
          >
            <i className="fas fa-tachometer-alt mr-3"></i>
            Dashboard
          </Link>
          <Link
            to="/settings"
            className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
          >
            <i className="fas fa-sticky-note mr-3"></i>
            Settings
          </Link>
        </nav>
      </aside>

      <div className="w-screen flex flex-col h-screen overflow-y-hidden">
        {/* Desktop Header */}
        <header className="w-full items-center bg-CardBg py-2 px-6 hidden sm:flex">
          <div className="w-1/2"></div>
          <div className="relative w-1/2 flex justify-end h-12">
            {/* <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="relative z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
            >
              <img
                src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400"
                alt="Profile"
              />
            </button>
            {isProfileOpen && (
              <button
                onClick={() => setIsProfileOpen(false)}
                className="h-full w-full fixed inset-0 cursor-default"
              ></button>
            )}
            {isProfileOpen && (
              <div className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16">
                <a
                  href="#"
                  className="block px-4 py-2 account-link hover:text-white"
                >
                  Account
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 account-link hover:text-white"
                >
                  Support
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 account-link hover:text-white"
                >
                  Sign Out
                </a>
              </div>
            )} */}
          </div>
        </header>

        {/* Mobile Header & Nav */}
        <header className="w-full bg-sidebar py-5 px-6 sm:hidden">
          <div className="flex items-center justify-between">
            <Link
              to="/panel"
              className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
            >
              Admin
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white text-3xl focus:outline-none"
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 352 512"
                  width="24"
                  height="24"
                  fill="white"
                >
                  <path d="M242.72 256L346.63 152.1c12.28-12.28 12.28-32.19 0-44.47l-22.24-22.24c-12.28-12.28-32.19-12.28-44.47 0L176 189.28 72.09 85.37c-12.28-12.28-32.19-12.28-44.47 0L5.37 107.61c-12.28 12.28-12.28 32.19 0 44.47L109.28 256 5.37 359.91c-12.28 12.28-12.28 32.19 0 44.47l22.24 22.24c12.28 12.28 32.19 12.28 44.47 0L176 322.72l103.91 103.91c12.28 12.28 32.19 12.28 44.47 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.47L242.72 256z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="24"
                  height="24"
                  fill="white"
                >
                  <path d="M16 132h416c8.837 0 16-7.163 16-16V84c0-8.837-7.163-16-16-16H16C7.163 68 0 75.163 0 84v32c0 8.837 7.163 16 16 16zm416 160H16c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h416c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16zm0 192H16c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h416c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16z" />
                </svg>
              )}
            </button>
          </div>

          {/* Dropdown Nav */}
          <nav className={`flex flex-col pt-4 ${isOpen ? "flex" : "hidden"}`}>
            <Link
              to="/panel"
              className="flex items-center active-nav-link text-white py-2 pl-4 nav-item"
            >
              <i className="fas fa-tachometer-alt mr-3"></i>
              Dashboard
            </Link>
            <Link
              to="/settings"
              className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
            >
              <i className="fas fa-sticky-note mr-3"></i>
              Settings
            </Link>
          </nav>
        </header>

        <div className="w-full overflow-x-hidden border-t flex flex-col flex-1">
          <main className="w-full flex-grow p-6 text-white flex-1 h-[calc(100%-56px)] overflow-y-auto">
            <h1 className="text-3xl pb-6">Dashboard</h1>

            <div className="w-full mt-4">
              <p className="text-xl pb-3 flex items-center">
                <i className="fas fa-list mr-3"></i> Users
              </p>
              <div className="overflow-auto">
                <MainUserTable />
              </div>
            </div>
          </main>

          <footer className="w-full bg-CardBg text-white text-right p-4">
            Built by MMM.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default MainPanelPage;
