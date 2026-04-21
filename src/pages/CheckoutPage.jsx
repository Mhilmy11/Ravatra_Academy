import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

import logoACB from "../assets/Logo-acb.png";
import {
  FaMapMarkerAlt,
  FaWhatsapp,
  FaCopy,
  FaCheckCircle,
} from "react-icons/fa";

export default function CheckoutPage() {
  const [submitted, setSubmitted] = useState(false);
  const [product, setProduct] = useState(null);
  const [payment, setPayment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { product_id } = useParams();
  const [sales, setSales] = useState([]);
  const [selectedSales, setSelectedSales] = useState(null);
  const [banks, setBanks] = useState([]);

  const [form, setForm] = useState({
    sales_id: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    company: "",
  });

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`https://apiv2.ravatraacademy.id/api/products/${product_id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setProduct(res.data.data);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [product_id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    axios.get("https://apiv2.ravatraacademy.id/api/banks").then((res) => {
      if (res.data.status === "success") {
        setBanks(res.data.data);
      }
    });
  }, []);

  useEffect(() => {
    axios.get("https://apiv2.ravatraacademy.id/api/sales").then((res) => {
      if (res.data.status === "success") {
        setSales(res.data.data);
      }
    });
  }, []);

  const handleSendToWhatsApp = async () => {
    try {
      if (!selectedSales) {
        alert("Pilih sales terlebih dahulu");
        return;
      }

      await axios.post(
        "https://apiv2.ravatraacademy.id/api/transactions/confirm",
        {
          transaction_id: payment.transaction_id,
        },
      );

      const phone = selectedSales.phone;

      const message = `
Halo ${selectedSales.name},

Saya ${form.lastname}, sudah melakukan pembayaran.

Produk: ${payment.product.name}
Total: Rp ${payment.payment.total_amount}
ID Transaksi: ${payment.transaction_id}

Mohon dibantu pengecekan ya 🙏`;

      window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
        "_blank",
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectSales = (e) => {
    const value = e.target.value;

    const selected = sales.find((s) => s.id == value);

    setForm({
      ...form,
      sales_id: value,
    });

    setSelectedSales(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const res = await axios.post(
        "https://apiv2.ravatraacademy.id/api/checkout",
        {
          product_id: product_id,
          ...form,
        },
      );

      if (res.data.status === "success") {
        setPayment(res.data.data);
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyText = (text) => navigator.clipboard.writeText(text);

  if (isLoading || !product) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000B76] via-[#1a2a9c] to-yellow-400/40 text-gray-800">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-10">
        <div className="mb-10">
          <h1 className="text-white text-2xl sm:text-3xl font-bold">
            Checkout
          </h1>
          <p className="text-gray-200 text-sm mt-1">
            Lengkapi data dan selesaikan pembayaran
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-2xl sticky top-10">
              <p className="text-xs text-gray-500">Product</p>
              <h2 className="text-lg font-bold mt-1 break-words">
                {product.product_name}
              </h2>

              <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                <FaMapMarkerAlt /> {product.location}
              </div>

              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span>Harga</span>
                  <span>Rp {product.product_price?.toLocaleString()}</span>
                </div>
                {submitted && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span>Kode Unik</span>
                      <span>{payment.payment.unique_code}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-2 text-[#000B76]">
                      <span>Total</span>
                      <span>
                        Rp{payment.payment.total_amount.toLocaleString()}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div
              className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl transition ${submitted && "opacity-40 pointer-events-none"}`}
            >
              <h2 className="text-xl font-bold text-[#000B76] mb-6">
                Data Peserta
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <select
                  required
                  name="sales_id"
                  value={form.sales_id}
                  onChange={handleSelectSales}
                  disabled={submitted}
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-[#000B76] outline-none"
                >
                  <option value="">Pilih Sales</option>
                  {sales.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    name="firstname"
                    value={form.firstname}
                    onChange={handleChange}
                    disabled={submitted}
                    placeholder="First Name"
                    required
                    className="border p-3 rounded-xl"
                  />
                  <input
                    name="lastname"
                    value={form.lastname}
                    onChange={handleChange}
                    disabled={submitted}
                    placeholder="Last Name"
                    required
                    className="border p-3 rounded-xl"
                  />
                </div>

                <div className=" grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    disabled={submitted}
                    placeholder="Company"
                    className="border p-3 rounded-xl"
                  />
                  <input
                    name="email"
                    value={form.email}
                    type="email"
                    onChange={handleChange}
                    disabled={submitted}
                    placeholder="Email"
                    required
                    className="border p-3 rounded-xl"
                  />
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={submitted}
                    placeholder="Phone"
                    required
                    className="border p-3 rounded-xl"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitted || isLoading}
                  className={`w-full bg-[#000B76] text-white py-3 rounded-xl hover:scale-[1.02] transition ${
                    submitted
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  }`}
                >
                  {isLoading ? "Processing..." : "Daftar Sekarang"}
                </button>
              </form>
            </div>

            {/* RESULT */}
            {submitted && payment && (
              <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 shadow-2xl animate-fade-in">
                <div className="flex items-center gap-3 text-green-600 mb-4">
                  <FaCheckCircle />
                  <h3 className="font-semibold">Data berhasil disimpan</h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-5 rounded-2xl">
                    <h4 className="font-semibold mb-2">Pembayaran</h4>
                    <p className="text-sm break-words">
                      {payment.product.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {payment.product.location}
                    </p>

                    <div className="mt-3 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Transfer</span>
                        <span className="flex items-center gap-2 font-bold">
                          Rp{payment.payment.total_amount.toLocaleString()}
                          <FaCopy
                            onClick={() =>
                              copyText(payment.payment.total_amount)
                            }
                            className="cursor-pointer"
                          />
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-red-500 mt-4">
                      *Transfer sesuai nominal hingga 3 digit terakhir
                    </p>
                  </div>

                  <div className="bg-yellow-50 p-5 rounded-2xl">
                    <h4 className="font-semibold mb-2">Transfer Bank</h4>
                    {banks.map((bank) => (
                      <div
                        key={bank.id}
                        className="border rounded-lg p-4 bg-gray-50"
                      >
                        <p className="text-sm">{bank.bank_name}</p>
                        <div className="flex items-center gap-2 font-medium">
                          {bank.account_number}
                          <FaCopy
                            onClick={() => copyText(bank.account_number)}
                            className="cursor-pointer"
                          />
                        </div>
                        <p className="text-xs text-gray-500">
                          {bank.account_name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSendToWhatsApp}
                  className="mt-6 w-full bg-green-500 text-white cursor-pointer py-3 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition"
                >
                  <FaWhatsapp /> Kirim Bukti ke Sales (WhatsApp)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
