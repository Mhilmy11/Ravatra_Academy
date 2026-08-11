import { useState } from "react";
import { Link, useNavigate } from "react-router";

import api from "../services/axios";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    company: "",
    email: "",
    phone: "",
    password: "",
    // password_confirmation: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

    if (!form.firstname || !form.email || !form.phone || !form.password) {
      setError("Please complete all required fields.");
      return;
    }

    // if (form.password !== form.password_confirmation) {
    //   setError("Password confirmation does not match.");
    //   return;
    // }

    try {
      setLoading(true);

      const response = await api.post("/account/register", {
        firstname: form.firstname,
        lastname: form.lastname,
        company: form.company,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Register failed.");
      }

      navigate("/login", {
        replace: true,
        state: {
          message: "Register successfully. Please login.",
        },
      });
    } catch (error) {
      console.error("REGISTER ERROR:", error.response?.data || error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "An error occurred during registration.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800">Register</h1>

          <p className="mt-2 text-sm text-slate-500">
            Create your account to continue to Ravatra Academy.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm">
          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="firstname"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                First Name
              </label>

              <input
                id="firstname"
                name="firstname"
                type="text"
                value={form.firstname}
                onChange={handleChange}
                placeholder="Masukkan nama depan"
                autoComplete="given-name"
                disabled={loading}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
              />
            </div>

            <div>
              <label
                htmlFor="lastname"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Last Name
              </label>

              <input
                id="lastname"
                name="lastname"
                type="text"
                value={form.lastname}
                onChange={handleChange}
                placeholder="Masukkan nama belakang"
                autoComplete="family-name"
                disabled={loading}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
              />
            </div>

            <div>
              <label
                htmlFor="company"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Company
              </label>

              <input
                id="company"
                name="company"
                type="text"
                value={form.company}
                onChange={handleChange}
                placeholder="Masukkan nama perusahaan"
                autoComplete="organization"
                disabled={loading}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
              />
            </div>

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
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="Masukkan nomor telepon"
                autoComplete="tel"
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
                autoComplete="new-password"
                disabled={loading}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
              />
            </div>

            {/* <div>
              <label
                htmlFor="password_confirmation"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Confirm Password
              </label>

              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                value={form.password_confirmation}
                onChange={handleChange}
                placeholder="Ulangi password"
                autoComplete="new-password"
                disabled={loading}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
              />
            </div> */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Sudah memiliki akun?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
