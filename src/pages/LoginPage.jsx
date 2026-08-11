import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(location.state?.message || "");

  const from = location.state?.from?.pathname || "/";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.email || !form.password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    try {
      setLoading(true);

      await login(form);

      const from = location.state?.from?.pathname || "/";

      navigate(from, {
        replace: true,
      });
    } catch (error) {
      console.error("LOGIN ERROR:", error.response?.data || error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Terjadi kesalahan saat login.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800">Login</h1>

          <p className="mt-2 text-sm text-slate-500">
            Login untuk mengakses akun Anda.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm">
          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
              <p className="text-sm text-green-600">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Masukkan email"
                autoComplete="email"
                disabled={loading}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                autoComplete="current-password"
                disabled={loading}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Belum memiliki akun?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
