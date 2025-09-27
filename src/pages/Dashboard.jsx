import { useEffect, useState } from "react";
import { getDashboard, logout } from "../services/auth";

import LogoRavatra from "../assets/logo-ravatra-academy-nobg.png";

function Dashboard() {
  const [data, setData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // const [activeMenu, setActiveMenu] = useState("dashboard");

  useEffect(() => {
    getDashboard()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert("Akses ditolak, silakan login sebagai admin.");
        window.location.href = "/login";
      });
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    // <div style={{ padding: "20px" }}>
    //   <h1>Dashboard Admin</h1>
    //   <button onClick={handleLogout}>Logout</button>

    //   {data ? (
    //     <div>
    //       <pre style={{ marginTop: "20px" }}>
    //         {JSON.stringify(data, null, 2)}
    //       </pre>

    //       <p>{data.user.name}</p>
    //     </div>
    //   ) : (
    //     <p>Loading...</p>
    //   )}
    // </div>
    <div className=" bg-secondary py-5 px-20 flex justify-between items-center">
      <div>
        <div></div>
        <div className=" text-white text-xl font-semibold bg-yellow-500 px-2 py-1 rounded-lg">
          DASHBOARD RAVATRA
        </div>
      </div>
      <div className=" flex items-center gap-3">
        <p className=" font-semibold text-xl text-yellow-500">
          {data?.user.name}
        </p>
        <div className=" bg-white p-3 rounded-full">
          <img className=" w-9" src={LogoRavatra} alt="logo-admin-user" />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
