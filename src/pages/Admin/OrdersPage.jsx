import { useEffect, useState } from "react";
import axios from "axios";

const StatusBadge = ({ status }) => {
  const styles = {
    SUCCESS: "bg-green-100 text-green-700",
    PAID: "bg-blue-100 text-blue-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    FAILED: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [visibleCount, setVisibleCount] = useState(5);
  const [processingId, setProcessingId] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "https://apiv2.ravatraacademy.id/api/transactions/getorder",
      );
      setOrders(res.data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    let data = [...orders];

    if (statusFilter !== "ALL") {
      data = data.filter((item) => item.status === statusFilter);
    }

    if (search) {
      data = data.filter((item) =>
        `${item.firstname} ${item.lastname} ${item.product_name}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      );
    }

    setFilteredOrders(data);
  }, [search, statusFilter, orders]);

  useEffect(() => {
    setVisibleCount(5);
  }, [search, statusFilter]);

  const currentData = filteredOrders.slice(0, visibleCount);

  const handleApprove = async (id) => {
    try {
      setProcessingId(id);

      await axios.post(
        "https://apiv2.ravatraacademy.id/api/transactions/approve",
        {
          transaction_id: id,
        },
      );

      setOrders((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "PAID" } : item,
        ),
      );
    } catch (err) {
      console.error("Approve error:", err);
    } finally {
      setProcessingId(null);
    }
  };

  const handleSendInvoice = async (id) => {
    try {
      setProcessingId(id);

      await axios.post(
        `https://apiv2.ravatraacademy.id/api/transactions/send-invoice/${id}`,
      );

      setOrders((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "SUCCESS" } : item,
        ),
      );
    } catch (err) {
      console.error("Invoice error:", err);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <h1 className="text-2xl font-bold mb-6">Orders Management</h1>

      <div className="bg-white shadow-xl rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Search customer / product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-xl w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-4 py-2 rounded-xl w-full md:w-1/4 focus:outline-none"
          >
            <option value="ALL">All Status</option>
            <option value="SUCCESS">SUCCESS</option>
            <option value="PAID">PAID</option>
            <option value="PENDING">PENDING</option>
            <option value="FAILED">FAILED</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3">ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Type</th>
                <th>Total</th>
                <th>Status</th>
                <th>Sales</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="py-3 pr-5">{item.id}</td>

                  <td>
                    {item.firstname} {item.lastname}
                  </td>

                  <td>{item.product_name}</td>
                  <td>{item.product_type}</td>

                  <td>Rp {(item.total_amount || 0).toLocaleString("id-ID")}</td>

                  <td>
                    <StatusBadge status={item.status} />
                  </td>

                  <td>{item.sales_name}</td>
                  <td>{item.created_at}</td>

                  <td className="flex gap-2">
                    {item.status !== "PAID" && item.status !== "SUCCESS" && (
                      <button
                        onClick={() => handleApprove(item.id)}
                        disabled={processingId === item.id}
                        className=" mt-3 px-3 py-1 bg-blue-500 text-white rounded-lg text-xs hover:bg-blue-600 cursor-pointer"
                      >
                        {processingId === item.id ? "Loading..." : "Approve"}
                      </button>
                    )}

                    {item.status === "PAID" && (
                      <button
                        onClick={() => handleSendInvoice(item.id)}
                        disabled={processingId === item.id}
                        className=" mt-3 px-3 py-1 bg-green-500 text-white rounded-lg text-xs hover:bg-green-600 cursor-pointer"
                      >
                        {processingId === item.id
                          ? "Sending..."
                          : "Send Invoice"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {currentData.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-500">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {visibleCount < filteredOrders.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setVisibleCount((prev) => prev + 5)}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 
              text-white rounded-xl shadow hover:opacity-90 transition"
            >
              See More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
