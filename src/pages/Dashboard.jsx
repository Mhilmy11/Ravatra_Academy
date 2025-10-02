// import { MdLogout, MdDashboard } from "react-icons/md";
// import { GoListUnordered } from "react-icons/go";

// import { useEffect, useState } from "react";
// import { getDashboard, logout } from "../services/auth";
// import axios from "axios";

// import LogoRavatra from "../assets/logo-ravatra-academy-nobg.png";

// function Dashboard() {
//   const [data, setData] = useState(null);
//   const [isHomeDashboard, setIsHomeDashboard] = useState(true);
//   const [isListOrderView, setIsListOrderView] = useState(false);

//   const [orders, setOrders] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [products, setProducts] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [processingId, setProcessingId] = useState(null);

//   useEffect(() => {
//     axios
//       .get("https://api.ravatraacademy.id/index.php?route=getOrders")
//       .then((res) => {
//         if (res.data.success) {
//           setOrders(res.data.orders);
//           console.log(orders.status);
//           setProducts(res.data.products);
//           setUsers(res.data.users);
//         } else {
//           setError(res.data.message || "Data order tidak ditemukan");
//         }
//       })
//       .catch((err) => {
//         setError(err.message);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     getDashboard()
//       .then((res) => {
//         setData(res.data);
//       })
//       .catch((err) => {
//         console.error(err);
//         alert("Akses ditolak, silakan login sebagai admin.");
//         window.location.href = "/login";
//       });
//   }, []);

//   const handleApprove = async (id, userId) => {
//     if (!id || !userId) return alert("ID atau user_id tidak lengkap");
//     try {
//       setProcessingId(id);
//       const res = await axios.post(
//         "https://api.ravatraacademy.id/index.php?route=approvalPayment",
//         { id, user_id: userId }
//       );
//       alert(res.data.message || "Order approved");
//       setOrders((prev) =>
//         prev.map((o) => (o.id === id ? { ...o, status: "PAID" } : o))
//       );
//     } catch (err) {
//       console.error("Approve error:", err);
//       alert("Gagal approve: " + (err.response?.data?.message || err.message));
//     } finally {
//       setProcessingId(null);
//     }
//   };

//   const handleReject = async (id, userId) => {
//     if (!id || !userId) return alert("ID atau user_id tidak lengkap");
//     try {
//       setProcessingId(id);
//       const res = await axios.post(
//         "https://api.ravatraacademy.id/index.php?route=rejectPayment",
//         { id, user_id: userId }
//       );
//       alert(res.data.message || "Order rejected");
//       setOrders((prev) =>
//         prev.map((o) => (o.id === id ? { ...o, status: "REJECTED" } : o))
//       );
//     } catch (err) {
//       console.error("Reject error:", err);
//       alert("Gagal reject: " + (err.response?.data?.message || err.message));
//     } finally {
//       setProcessingId(null);
//     }
//   };

//   const handleDashboard = () => {
//     setIsListOrderView(false);
//     setIsHomeDashboard(true);
//   };

//   const handleListOrder = () => {
//     setIsHomeDashboard(false);
//     setIsListOrderView(true);
//   };

//   const handleLogout = () => {
//     logout();
//     window.location.href = "/login";
//   };

//   return (
//     <div className=" flex w-full">
//       <aside className="flex flex-col w-72 h-screen px-4 py-8 overflow-y-auto border-r bg-gradient-to-b from-blue-950 via-blue-900 to-yellow-500">
//         <div className="flex flex-col items-center mt-6 -mx-2">
//           <img
//             className=" w-20"
//             src={LogoRavatra}
//             alt="logo-ravatra-dashboard"
//           />
//           <h4 className="mx-2 mt-2 font-medium text-white">
//             {data?.user.name}
//           </h4>
//           <p className="mx-2 mt-1 text-sm font-medium text-slate-400">
//             {data?.user.email}
//           </p>
//         </div>

//         <div className="flex flex-col justify-between flex-1 mt-6">
//           <nav>
//             <button
//               onClick={handleDashboard}
//               className={`flex cursor-pointer items-center px-4 py-2 rounded-lg gap-2 ${
//                 isHomeDashboard === true
//                   ? "bg-yellow-500 text-secondary font-bold"
//                   : "text-white font-semibold"
//               }`}
//             >
//               <MdDashboard size={25} />
//               <span>Dashboard</span>
//             </button>

//             <button
//               onClick={handleListOrder}
//               className={`flex cursor-pointer items-center px-4 py-2 mt-5 rounded-lg gap-2 ${
//                 isListOrderView
//                   ? "bg-yellow-500 text-secondary font-bold"
//                   : "text-white font-semibold"
//               }`}
//             >
//               <GoListUnordered size={30} />
//               <span>List Order</span>
//             </button>
//           </nav>
//           <button
//             onClick={handleLogout}
//             className="flex items-center px-4 py-2 mt-5 text-white cursor-pointer transition-colors duration-300 transform rounded-lg hover:bg-red-600"
//           >
//             <MdLogout size={25} />
//             <span className="mx-4 font-medium">Log Out</span>
//           </button>
//         </div>
//       </aside>

//       <div className=" w-full p-14">
//         <h1 className=" font-bold text-2xl text-secondary mb-10">
//           DASHBOARD RAVATRA ACADEMY
//         </h1>

//         {isHomeDashboard && (
//           <div>
//             <div className=" flex justify-end">
//               <div className=" flex gap-5">
//                 <div className=" bg-yellow-500 px-4 py-2 rounded-lg text-secondary w-52">
//                   <p className=" font-bold text-sm">USER</p>
//                   <div className=" h-0.5 bg-black my-3"></div>
//                   <p className=" text-right text-3xl font-semibold text-black">
//                     {users.length}
//                   </p>
//                 </div>
//                 <div className=" bg-yellow-500 px-4 py-2 rounded-lg text-secondary w-52">
//                   <p className=" font-bold text-sm">PRODUCT</p>
//                   <div className=" h-0.5 bg-black my-3"></div>
//                   <p className=" text-right text-3xl font-semibold text-black">
//                     {products.length}
//                   </p>
//                 </div>
//                 <div className=" bg-yellow-500 px-4 py-2 rounded-lg text-secondary w-52">
//                   <p className=" font-bold text-sm">TRANSACTION</p>
//                   <div className=" h-0.5 bg-black my-3"></div>
//                   <p className=" text-right text-3xl font-semibold text-black">
//                     {orders.length}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {isListOrderView && (
//           <>
//             <div>
//               <h1 className="text-xl font-bold mb-4">Orders List</h1>
//               <div className=" flex justify-center w-full">
//                 <div className="overflow-x-auto rounded-lg max-w-5xl">
//                   <table className="min-w-[900px] bg-white">
//                     <thead>
//                       <tr className="bg-yellow-500 text-left">
//                         <th className="px-4 py-2">ID</th>
//                         <th className="px-4 py-2">USER</th>
//                         <th className="px-4 py-2">PRODUCT</th>
//                         <th className="px-4 py-2">PRICE</th>
//                         <th className="px-4 py-2">STATUS</th>
//                         <th className="px-4 py-2">CREATED</th>
//                         <th className="px-4 py-2">EXPIRED</th>
//                         <th className="px-4 py-2 text-center">ACTION</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {orders.map((o, i) => (
//                         <tr key={i} className="border-b">
//                           <td className="px-4 py-2">{o.id}</td>
//                           <td className="px-4 py-2 whitespace-nowrap">
//                             {o.first_name} {o.last_name}
//                             <br />
//                             <span className="text-xs text-gray-500">
//                               {o.email}
//                             </span>
//                           </td>
//                           <td className="px-4 py-2 truncate">
//                             {o.product_name}
//                           </td>
//                           <td className="px-4 py-2 whitespace-nowrap">
//                             {o.product_price}
//                           </td>
//                           <td className="px-4 py-2">
//                             <p
//                               className={`px-2 rounded-lg text-white font-semibold text-lg ${
//                                 o.status === "PENDING"
//                                   ? "bg-blue-900"
//                                   : o.status === "PAID"
//                                   ? "bg-green-500"
//                                   : o.status === "REJECTED"
//                                   ? "bg-red-500"
//                                   : o.status === "EXPIRED"
//                                   ? "bg-gray-500"
//                                   : "bg-white"
//                               }`}
//                             ></p>
//                           </td>
//                           <td className="px-4 py-2 whitespace-nowrap">
//                             {o.create_date}
//                           </td>
//                           <td className="px-4 py-2 whitespace-nowrap">
//                             {o.expired_at}
//                           </td>
//                           <td className="px-4 py-2 text-center space-x-2">
//                             <button
//                               onClick={() => handleApprove(o.id, o.user_id)}
//                               disabled={o.status !== "PENDING"}
//                               className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
//                             >
//                               {processingId === o.id
//                                 ? "Processing..."
//                                 : "Approve"}
//                             </button>
//                             <button
//                               onClick={() => handleReject(o.id, o.user_id)}
//                               disabled={o.status !== "PENDING"}
//                               className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
//                             >
//                               {processingId === o.id
//                                 ? "Processing..."
//                                 : "Reject"}
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                       {orders.length === 0 && (
//                         <tr>
//                           <td colSpan="8" className="text-center py-4">
//                             No orders found
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import { MdLogout, MdDashboard } from "react-icons/md";
import { GoListUnordered } from "react-icons/go";
import { useEffect, useState } from "react";
import { getDashboard, logout } from "../services/auth";
import axios from "axios";
import LogoRavatra from "../assets/logo-ravatra-academy-nobg.png";

function Dashboard() {
  const [data, setData] = useState(null);
  const [activeView, setActiveView] = useState("home"); // "home" | "orders"

  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://api.ravatraacademy.id/index.php?route=getOrders"
      );
      if (res.data.success) {
        setOrders(res.data.orders);
        setProducts(res.data.products);
        setUsers(res.data.users);
      } else {
        setError(res.data.message || "Data order tidak ditemukan");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    getDashboard()
      .then((res) => setData(res.data))
      .catch(() => {
        alert("Akses ditolak, silakan login sebagai admin.");
        window.location.href = "/login";
      });
  }, []);

  const handleApprove = async (id, userId) => {
    if (!id || !userId) return alert("ID atau user_id tidak lengkap");
    try {
      setProcessingId(id);
      const res = await axios.post(
        "https://api.ravatraacademy.id/index.php?route=approvalPayment",
        { id, user_id: userId }
      );
      alert(res.data.message || "Order approved");
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: "PAID" } : o))
      );
    } catch (err) {
      alert("Gagal approve: " + (err.response?.data?.message || err.message));
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id, userId) => {
    if (!id || !userId) return alert("ID atau user_id tidak lengkap");
    try {
      setProcessingId(id);
      const res = await axios.post(
        "https://api.ravatraacademy.id/index.php?route=rejectPayment",
        { id, user_id: userId }
      );
      alert(res.data.message || "Order rejected");
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: "REJECTED" } : o))
      );
    } catch (err) {
      alert("Gagal reject: " + (err.response?.data?.message || err.message));
    } finally {
      setProcessingId(null);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="flex w-full">
      <aside className="flex flex-col w-72 h-screen px-4 py-8 border-r bg-gradient-to-b from-blue-950 via-blue-900 to-yellow-500">
        <div className="flex flex-col items-center mt-6">
          <img className="w-20" src={LogoRavatra} alt="logo" />
          <h4 className="mt-2 font-medium text-white">{data?.user.name}</h4>
          <p className="text-sm font-medium text-slate-400">
            {data?.user.email}
          </p>
        </div>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <button
              onClick={() => setActiveView("home")}
              className={`flex items-center px-4 py-2 rounded-lg gap-2 cursor-pointer ${
                activeView === "home"
                  ? "bg-yellow-500 text-secondary font-bold"
                  : "text-white font-semibold"
              }`}
            >
              <MdDashboard size={25} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveView("orders")}
              className={`flex items-center px-4 py-2 mt-5 rounded-lg gap-2 cursor-pointer ${
                activeView === "orders"
                  ? "bg-yellow-500 text-secondary font-bold"
                  : "text-white font-semibold"
              }`}
            >
              <GoListUnordered size={30} />
              <span>List Order</span>
            </button>
          </nav>
          <button
            onClick={handleLogout}
            className=" cursor-pointer transition flex items-center px-4 py-2 mt-5 text-white hover:bg-red-600 rounded-lg"
          >
            <MdLogout size={25} />
            <span className="mx-4 font-medium">Log Out</span>
          </button>
        </div>
      </aside>

      <div className="w-full p-14">
        <h1 className="font-bold text-2xl text-secondary mb-10">
          DASHBOARD RAVATRA ACADEMY
        </h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {activeView === "home" && (
          <div className="flex justify-end gap-5">
            <Card title="USER" count={users.length} />
            <Card title="PRODUCT" count={products.length} />
            <Card title="TRANSACTION" count={orders.length} />
          </div>
        )}

        {activeView === "orders" && (
          <OrdersTable
            orders={orders}
            processingId={processingId}
            handleApprove={handleApprove}
            handleReject={handleReject}
          />
        )}
      </div>
    </div>
  );
}

const Card = ({ title, count }) => (
  <div className="bg-yellow-500 px-4 py-2 rounded-lg text-secondary w-52">
    <p className="font-bold text-sm">{title}</p>
    <div className="h-0.5 bg-black my-3"></div>
    <p className="text-right text-3xl font-semibold text-black">{count}</p>
  </div>
);

const OrdersTable = ({ orders, processingId, handleApprove, handleReject }) => (
  <div>
    <h1 className="text-xl font-bold mb-4">Orders List</h1>
    <div className="overflow-x-auto rounded-lg max-w-5xl">
      <table className="min-w-[900px] bg-white">
        <thead>
          <tr className="bg-yellow-500 text-left">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">USER</th>
            <th className="px-4 py-2">PRODUCT</th>
            <th className="px-4 py-2 text-center">PRICE</th>
            <th className="px-4 py-2 whitespace-nowrap text-center">
              PRODUCT TYPE
            </th>
            <th className="px-4 py-2 text-center">STATUS</th>
            <th className="px-4 py-2">CREATED</th>
            <th className="px-4 py-2">EXPIRED</th>
            <th className="px-4 py-2 text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-b">
              <td className="px-4 py-2">{o.id}</td>
              <td className="px-4 py-2 whitespace-nowrap">
                {o.first_name} {o.last_name}
                <br />
                <span className="text-xs text-gray-500">{o.email}</span>
              </td>
              <td className="px-4 py-2 truncate">{o.product_name}</td>
              <td className="px-4 py-2 whitespace-nowrap">{o.product_price}</td>
              <td className="px-4 py-2 whitespace-nowrap uppercase font-semibold text-center">
                {o.product_type}
              </td>
              <td className="px-4 py-2">
                <p
                  className={`px-2 rounded-lg text-white font-semibold text-lg text-center ${
                    o.status === "PENDING"
                      ? "bg-blue-700"
                      : o.status === "PAID"
                      ? "bg-green-500"
                      : o.status === "REJECTED"
                      ? "bg-red-500"
                      : o.status === "EXPIRED"
                      ? "bg-gray-500"
                      : "bg-white"
                  }`}
                >
                  {o.status}
                </p>
              </td>
              <td className="px-4 py-2 whitespace-nowrap">{o.create_date}</td>
              <td className="px-4 py-2 whitespace-nowrap">{o.expired_at}</td>
              <td className="px-4 py-2 text-center space-x-2 flex">
                <button
                  onClick={() => handleApprove(o.id, o.user_id)}
                  disabled={o.status !== "PENDING"}
                  className={`px-3 py-1 rounded-lg text-white ${
                    o.status !== "PENDING"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 cursor-pointer"
                  }`}
                >
                  {processingId === o.id ? "Processing..." : "Approve"}
                </button>

                <button
                  onClick={() => handleReject(o.id, o.user_id)}
                  disabled={o.status !== "PENDING"}
                  className={`px-3 py-1 rounded-lg text-white ${
                    o.status !== "PENDING"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 cursor-pointer"
                  }`}
                >
                  {processingId === o.id ? "Processing..." : "Reject"}
                </button>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center py-4">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default Dashboard;
