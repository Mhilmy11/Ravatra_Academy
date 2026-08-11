import { useState } from "react";

import { useAuth } from "../contexts/AuthContext";

import MyProfile from "../pages/profile/MyProfile";
import MyTransactions from "../pages/profile/MyTransactions";

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();

  const [activeTab, setActiveTab] = useState("profile");

  const handleLogout = async () => {
    await logout();

    navigate("/login", {
      replace: true,
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <p className="text-sm text-slate-500">Loading profile...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-blue-600">My Account</p>

            <h1 className="mt-1 text-2xl font-bold text-slate-800 sm:text-3xl">
              My Account
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage your profile and view your transactions.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="shrink-0 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            Logout
          </button>
        </div>

        {/* Navigation */}
        <div className="mb-6 overflow-x-auto rounded-xl bg-white shadow-sm">
          <div className="flex min-w-max border-b border-slate-200">
            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`relative px-5 py-4 text-sm font-semibold transition ${
                activeTab === "profile"
                  ? "text-blue-600"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              My Profile
              {activeTab === "profile" && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("transactions")}
              className={`relative px-5 py-4 text-sm font-semibold transition ${
                activeTab === "transactions"
                  ? "text-blue-600"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              My Transactions
              {activeTab === "transactions" && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600" />
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "profile" && <MyProfile user={user} />}

        {activeTab === "transactions" && <MyTransactions />}
      </div>
    </main>
  );
}
