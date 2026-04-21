import { logout } from "../services/auth";
import { useState } from "react";

export default function Topbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-16 bg-white shadow-md flex items-center justify-between px-6 rounded-xl">
      <h1 className="font-semibold text-lg text-gray-700">Admin Dashboard</h1>

      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-600">Hi, Admin</div>

        <div
          onClick={() => setOpen(!open)}
          className="w-10 h-10 bg-[#000B76] hover:bg-blue-800 rounded-full flex items-center justify-center text-white font-bold cursor-pointer"
        >
          A
        </div>
      </div>

      {open && (
        <div className="absolute top-16 right-5 bg-white shadow-lg rounded-lg w-40">
          <button
            onClick={logout}
            className="w-full text-left px-4 py-3 hover:bg-gray-200 text-red-500 cursor-pointer rounded-xl"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
