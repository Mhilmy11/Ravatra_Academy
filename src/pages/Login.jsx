import LogoRavatra from "../assets/logo-ravatra-academy-nobg.png";

import { useState } from "react";
import { login } from "../services/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await login(email, password);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
      } else {
        alert(res.data.message || "Login gagal");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan pada login");
    }
    setLoading(false);
  };

  return (
    <div className=" h-screen flex justify-center items-center bg-gradient-to-t from-yellow-500 via-white to-white">
      <div>
        <div className=" flex justify-center mb-5">
          <img className=" w-24" src={LogoRavatra} alt="logo-dashboard" />
        </div>

        <p className=" text-3xl font-bold mb-10 text-center">DASHBOARD LOGIN</p>

        <form onSubmit={handleLogin}>
          <div className=" flex flex-col gap-y-2">
            <label className=" font-semibold">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className=" border-2 rounded-xl py-2 px-6 w-md"
            />
          </div>

          <div className=" flex flex-col gap-y-2 my-5">
            <label className=" font-semibold">Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className=" border-2 rounded-xl py-2 px-6 w-md"
            />
          </div>

          <button
            className={`cursor-pointer mt-5 w-full rounded-xl py-3 text-white font-semibold text-lg ${
              loading ? "bg-slate-400 cursor-none" : "bg-secondary"
            }`}
            disabled={loading === true}
          >
            {loading ? "LOGING IN..." : "LOG IN"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
