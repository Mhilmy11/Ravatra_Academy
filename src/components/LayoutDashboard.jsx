import Sidebar from "./Sidebar";
import { Outlet } from "react-router";
import { useState } from "react";
import Topbar from "./Topbar";

export default function LayoutDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex">
      <Sidebar />

      <div
        className="ml-64 w-full min-h-screen 
      bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6"
      >
        <Topbar />

        <div className="mt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
