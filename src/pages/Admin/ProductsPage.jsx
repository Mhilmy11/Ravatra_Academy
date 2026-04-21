import { useEffect, useState } from "react";
import axios from "axios";

const TYPES = ["RegularTraining", "Seminar", "Kursus", "ELearning"];

export default function ProductsPage() {
  const [activeType, setActiveType] = useState("RegularTraining");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const [form, setForm] = useState({
    product_name: "",
    product_type: "RegularTraining",
    schedule: "",
    location: "",
    product_price: "",
  });

  const fetchProducts = async (type) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `https://apiv2.ravatraacademy.id/api/products?type=${type}`,
      );

      if (res.data.status === "success") {
        setProducts(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(activeType);
  }, [activeType]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = () => {
    setEditData(null);
    setForm({
      product_name: "",
      product_type: activeType,
      schedule: "",
      location: "",
      product_price: "",
    });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditData(item);
    setForm(item);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      if (editData) {
        await axios.put(
          `http://localhost:8000/api/products/${editData.id}`,
          form,
        );
      } else {
        await axios.post("http://localhost:8000/api/products", form);
      }

      setShowModal(false);
      fetchProducts(activeType);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus product?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/products/${id}`);
      fetchProducts(activeType);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>

        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Product
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium
              ${
                activeType === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="bg-white shadow rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr className=" text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Schedule</th>
              <th className="p-3">Location</th>
              <th className="p-3">Price</th>
              <th className="p-3">Pendaftar</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3 font-medium">{item.product_name}</td>
                <td className="p-3">{item.schedule}</td>
                <td className="p-3">{item.location}</td>
                <td className="p-3 text-blue-600 font-semibold">
                  Rp {Number(item.product_price).toLocaleString()}
                </td>
                <td className="p-3">{item.pendaftar ?? 0}</td>

                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {!loading && products.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-4">
              {editData ? "Edit Product" : "Add Product"}
            </h2>

            <div className="space-y-3">
              <input
                name="product_name"
                placeholder="Product Name"
                value={form.product_name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
              />

              <select
                name="product_type"
                value={form.product_type}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
              >
                {TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>

              <input
                name="schedule"
                placeholder="Schedule"
                value={form.schedule}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
              />

              <input
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
              />

              <input
                name="product_price"
                placeholder="Price"
                type="number"
                value={form.product_price}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
