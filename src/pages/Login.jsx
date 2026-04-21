import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-black to-gray-800 text-white items-center justify-center p-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">Ravatra Academy</h1>
          <p className="text-gray-300 max-w-md">
            Dashboard Admin untuk mengelola produk, user, dan order dengan mudah
            dan efisien.
          </p>
        </div>
      </div>
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100 px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            Welcome Back 👋
          </h2>
          <p className="text-gray-500 mb-6">
            Login sebagai admin untuk melanjutkan
          </p>

          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                placeholder="admin@email.com"
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="mb-6">
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-200 flex items-center justify-center"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            © {new Date().getFullYear()} Ravatra Academy
          </p>
        </div>
      </div>
    </div>
  );
}
