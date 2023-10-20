import { useState } from 'react';
import Sidebar from './Sidebar';

const Menu = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen text-white">
      <button
        onClick={toggleSidebar}
        className="fixed z-50 p-4 text-white cursor-pointer"
      >
        {isSidebarOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>
      <Sidebar isOpen={isSidebarOpen} closeSidebar={toggleSidebar} />
      <div
        className={`fixed h-full top-0 left-0 bg-black opacity-25 z-40 transition-opacity ${
          isSidebarOpen ? 'block' : 'hidden'
        }`}
        onClick={toggleSidebar}
      ></div>
    </div>
  );
};

export default Menu;
