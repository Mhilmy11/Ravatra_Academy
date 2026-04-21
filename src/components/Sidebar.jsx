import { NavLink } from "react-router";
import {
  MdDashboard,
  MdShoppingCart,
  MdPeople,
  MdInventory,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

const menu = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: MdDashboard,
  },
  {
    name: "Orders",
    path: "/dashboard/orders",
    icon: MdShoppingCart,
  },
  {
    name: "Users",
    path: "/dashboard/users",
    icon: MdPeople,
  },
  {
    name: "Product",
    path: "/dashboard/products",
    icon: MdInventory,
  },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  return (
    <div
      className={`h-screen fixed top-0 left-0 z-50
      ${collapsed ? "w-20" : "w-64"}
       bg-[#000B76]
      text-white shadow-2xl transition-all duration-300`}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <h1 className="text-lg font-bold tracking-wide">Admin Panel</h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-white/20 transition"
        >
          {collapsed ? (
            <MdChevronRight size={20} />
          ) : (
            <MdChevronLeft size={20} />
          )}
        </button>
      </div>

      <div className="flex flex-col gap-2 px-2 mt-4">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `relative group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                ${
                  isActive
                    ? "bg-white text-blue-600 shadow-lg"
                    : "hover:bg-white/20"
                }`
              }
            >
              <Icon size={22} />

              {!collapsed && (
                <span className="text-sm font-medium">{item.name}</span>
              )}

              {collapsed && (
                <span
                  className="absolute left-20 whitespace-nowrap 
                bg-black text-white text-xs px-2 py-1 rounded 
                opacity-0 group-hover:opacity-100 transition"
                >
                  {item.name}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
