import { ImWhatsapp } from "react-icons/im";
import { FaListUl, FaUserAlt } from "react-icons/fa";
import { MdLogout, MdDashboard } from "react-icons/md";
import { useEffect, useState } from "react";
import { getDashboard, logout } from "../services/auth";

import axios from "axios";
import LogoRavatra from "../assets/logo-ravatra-academy-nobg.png";

function Dashboard() {
  const [data, setData] = useState(null);
  const [activeView, setActiveView] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredOrders = orders.filter((o) => {
    const fullName = `${o.first_name} ${o.last_name}`.toLowerCase();
    const orderId = o.id.toString().toLowerCase();
    const keyword = searchTerm.toLowerCase();

    return orderId.includes(keyword) || fullName.includes(keyword);
  });

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
              className={`flex items-center px-4 py-2 rounded-lg gap-4 cursor-pointer ${
                activeView === "home"
                  ? "bg-yellow-500 text-secondary font-bold"
                  : "text-white font-semibold"
              }`}
            >
              <MdDashboard size={30} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveView("orders")}
              className={`flex items-center px-4 py-2 mt-5 rounded-lg gap-4 cursor-pointer ${
                activeView === "orders"
                  ? "bg-yellow-500 text-secondary font-bold"
                  : "text-white font-semibold"
              }`}
            >
              <FaListUl size={30} />
              <span>List Order</span>
            </button>

            <button
              onClick={() => setActiveView("users")}
              className={`flex items-center px-4 py-2 mt-5 rounded-lg gap-4 cursor-pointer ${
                activeView === "users"
                  ? "bg-yellow-500 text-secondary font-bold"
                  : "text-white font-semibold"
              }`}
            >
              <FaUserAlt size={30} />
              <span>List Users</span>
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

      <div className="w-full px-14 pt-14">
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
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredOrders={filteredOrders}
          />
        )}

        {activeView === "users" && <UsersTable users={users} />}
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

const OrdersTable = ({
  orders,
  processingId,
  handleApprove,
  handleReject,
  setSearchTerm,
  searchTerm,
  filteredOrders,
}) => (
  <div>
    <div className=" flex justify-between">
      <h1 className="text-xl font-bold mb-4">Orders List</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Order ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
    </div>

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
          {filteredOrders.map((o) => (
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

                {o.status === "PENDING" && (
                  <button className=" px-3 py-1 rounded-lg text-white bg-green-600 hover:bg-green-500 cursor-pointer">
                    <ImWhatsapp />
                  </button>
                )}
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

const UsersTable = ({ users }) => (
  <div>
    <p className=" font-bold text-3xl">List Users</p>

    <div className="overflow-x-auto rounded-lg max-w-5xl flex justify-center mt-5">
      <table className="min-w-[900px] bg-white">
        <thead>
          <tr className=" text-left bg-yellow-500">
            <th className=" py-2">ID</th>
            <th>FULL NAME</th>
            <th>EMAIL</th>
            <th>PHONE</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, i) => (
            <tr key={i} className=" border-b">
              <td className=" py-3">{u.id}</td>
              <td className=" py-3">
                {u.first_name} {u.last_name}
              </td>
              <td className=" py-3">{u.email}</td>
              <td className=" py-3">{u.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Dashboard;
