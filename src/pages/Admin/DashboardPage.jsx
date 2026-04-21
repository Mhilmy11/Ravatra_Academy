import { useEffect, useState } from "react";
import {
  MdShoppingCart,
  MdAttachMoney,
  MdCheckCircle,
  MdAccessTime,
} from "react-icons/md";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import KpiCard from "../../components/KpiCard";
import axios from "axios";

export default function DashboardPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "https://apiv2.ravatraacademy.id/api/transactions/getorder",
      );
      setOrders(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const salesData = Object.values(
    orders.reduce((acc, item) => {
      const name = item.sales_name || "Unknown";

      if (!acc[name]) {
        acc[name] = { name, total: 0 };
      }

      acc[name].total += 1;

      return acc;
    }, {}),
  );

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (acc, item) => acc + item.product_price,
    0,
  );
  const successOrders = orders.filter((o) => o.status === "SUCCESS").length;
  const pendingOrders = orders.filter((o) => o.status !== "SUCCESS").length;

  const chartData = Object.values(
    orders.reduce((acc, item) => {
      const date = item.created_at.split(" ")[0];

      if (!acc[date]) {
        acc[date] = { date, total: 0 };
      }

      acc[date].total += 1;

      return acc;
    }, {}),
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <KpiCard
          title="Total Orders"
          value={totalOrders}
          icon={<MdShoppingCart />}
          color="from-blue-500 to-blue-700"
        />

        <KpiCard
          title="Revenue"
          value={`Rp ${totalRevenue.toLocaleString("id-ID")}`}
          icon={<MdAttachMoney />}
          color="from-green-500 to-green-700"
        />

        <KpiCard
          title="Success Orders"
          value={successOrders}
          icon={<MdCheckCircle />}
          color="from-purple-500 to-purple-700"
        />

        <KpiCard
          title="Pending Orders"
          value={pendingOrders}
          icon={<MdAccessTime />}
          color="from-yellow-500 to-yellow-600"
        />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Orders Analytics</h2>

        <div className="w-full h-80">
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="total" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Sales Performance</h2>

        <div className="w-full h-80">
          <ResponsiveContainer>
            <BarChart data={salesData} barGap={5}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="total"
                fill="#F4B800"
                radius={[8, 8, 0, 0]}
                barSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
