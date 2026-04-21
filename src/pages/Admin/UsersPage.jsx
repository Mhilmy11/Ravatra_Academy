import { useEffect, useState } from "react";
import axios from "axios";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://apiv2.ravatraacademy.id/api/users/getuser",
      );

      setUsers(res.data.data || []);
    } catch (err) {
      console.log("No users found");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let data = [...users];

    if (search) {
      data = data.filter((item) =>
        `${item.firstname} ${item.lastname} ${item.email}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      );
    }

    setFilteredUsers(data);
  }, [search, users]);

  useEffect(() => {
    setVisibleCount(5);
  }, [search]);

  const currentData = filteredUsers.slice(0, visibleCount);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <h1 className="text-2xl font-bold mb-6">Users Management</h1>

      <div className="bg-white shadow-xl rounded-2xl p-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-xl w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3">Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Created At</th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3">
                    {user.firstname} {user.lastname}
                  </td>

                  <td>{user.company}</td>

                  <td>{user.email}</td>

                  <td>{user.phone}</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        user.role === "Admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td>{user.created_at}</td>
                </tr>
              ))}

              {currentData.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {visibleCount < filteredUsers.length && (
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
