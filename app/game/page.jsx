"use client";

import Foto from "./foto";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Page() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
      }}
    >
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
      <div
        style={{
          width: "100%",
          height: "10%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <h1
          style={{
            background: "linear-gradient(to right, #FC6B04, #00CABF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          <b>THIS OR THAT</b>
        </h1>
      </div>
      <div
        style={{
          width: "100%",
          height: "80%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Foto lado="D" />
        </div>
        <div
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Foto lado="E" />
        </div>
      </div>
      <div
        style={{
          height: "10%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            background: "linear-gradient(to right, #FC6B04, #00CABF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Rodapé
        </h1>
      </div>

      <Sidebar isOpen={isSidebarOpen} closeSidebar={toggleSidebar} />
      <div
        className={`fixed h-full top-0 left-0 bg-black opacity-25 z-40 transition-opacity ${
          isSidebarOpen ? "block" : "hidden"
        }`}
        onClick={toggleSidebar}
      ></div>
    </div>
  );
}
