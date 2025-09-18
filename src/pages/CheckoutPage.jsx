import { AiFillDownCircle, AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdOutlineContentCopy } from "react-icons/md";
import HeroImage from "../assets/hero-checkout-page.png";
import CardImage from "../assets/card-image-test.png";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import logoACB from "../assets/Logo-acb.png";

export default function CheckoutPage() {
  const { product_id } = useParams();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    company: "",
    phone: "",
  });

  const [userId, setUserId] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [product, setProduct] = useState(null);
  const [canPay, setCanPay] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nomorRekening = "5375375432";

  const handleCopy = () => {
    navigator.clipboard
      .writeText(nomorRekening)
      .then(() => {
        alert("Nomor rekening berhasil dicopy! ✅");
      })
      .catch(() => {
        alert("Gagal menyalin nomor rekening ❌");
      });
  };

  const navigate = useNavigate();

  const handleClose = () => {
    setShowPayment(false);
    navigate("/");
  };

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleRegister = async (e) => {
    setLoadingRegister(true);
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://api.ravatraacademy.id/index.php?route=register",
        {
          ...form,
          product_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        setProduct(res.data.product);
        setUserId(res.data.user_id);
        setLoadingRegister(false);
        setCanPay(true);
      } else {
        alert("Gagal mendaftar: " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat mengirim data.");
    }
  };

  const handleCreateTransaction = async () => {
    setLoadingPayment(true);
    try {
      const res = await axios.post(
        "https://api.ravatraacademy.id/index.php?route=createTransaction",
        {
          user_id: userId,
          product_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        setTransaction(res.data.transaction);
        setShowPayment(true);
        setLoadingPayment(false);
        setHasPaid(true);
      } else {
        alert("Gagal membuat transaksi: " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat membuat transaksi.");
    }
  };

  return (
    <>
      <div className=" md:px-20 mt-10">
        <img
          className=" w-full"
          src={HeroImage}
          alt="hero-image-checkout-page"
        />

        <div className=" md:flex justify-between gap-14 w-full pt-12 md:px-0 px-5">
          <div className=" w-full">
            <p className=" text-2xl font-bold pb-6">
              Informasi Peserta Training
            </p>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Nama Depan
                  </label>
                  <input
                    name="first_name"
                    onChange={handleChange}
                    required
                    disabled={canPay}
                    placeholder="Masukkan nama depan anda..."
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Nama Belakang
                  </label>
                  <input
                    name="last_name"
                    onChange={handleChange}
                    required
                    disabled={canPay}
                    placeholder="Masukkan nama belakang anda..."
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">
                  Asal Perusahaan
                </label>
                <input
                  required
                  disabled={canPay}
                  name="company"
                  onChange={handleChange}
                  placeholder="Nama Perusahaan Anda..."
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">
                  Nomor Hp
                </label>
                <input
                  type="number"
                  required
                  disabled={canPay}
                  name="phone"
                  onChange={handleChange}
                  placeholder="Masukkan nomor hp anda..."
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">Email</label>
                <input
                  required
                  disabled={canPay}
                  name="email"
                  onChange={handleChange}
                  type="email"
                  placeholder="Masukkan email anda..."
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={canPay || loadingRegister}
                  className={`w-full ${
                    canPay
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-secondary cursor-pointer hover:to-blue-600"
                  } text-white py-3.5 rounded-lg font-semibold text-lg`}
                >
                  {loadingRegister ? (
                    <div className=" flex justify-center w-full animate-spin">
                      <AiOutlineLoading3Quarters />
                    </div>
                  ) : canPay ? (
                    "SUBMITED"
                  ) : (
                    "SUBMIT"
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className=" bg-blue-100 md:my-0 my-10 py-9 px-8 rounded-lg w-full flex flex-col gap-5">
            <div className=" flex justify-between font-semibold text-2xl">
              <p>Produk</p>
              <p>Nominal</p>
            </div>

            <div className=" flex items-center justify-between text-sm">
              <div className=" flex gap-2 items-center">
                <img
                  className=" w-[100px] rounded-lg"
                  src={CardImage}
                  alt="checkout-product-image"
                />
                <p className=" font-semibold w-[200px]">
                  {product ? product.product_name : "Pilih produk dulu"}
                </p>
              </div>
              <div>{product ? formatRupiah(product.product_price) : "-"}</div>
            </div>

            <div className=" flex justify-between items-center">
              <p className=" font-semibold">Diskon</p>
              Rp. 0
            </div>

            <div className=" flex items-center justify-between">
              <p className=" font-semibold">Subtotal</p>
              <p>{product ? formatRupiah(product.product_price) : "-"}</p>
            </div>

            <div className=" h-0.5 bg-gray-400"></div>

            <button
              onClick={handleCreateTransaction}
              disabled={!canPay || hasPaid}
              className={`py-5 text-white text-lg font-semibold rounded-lg ${
                !canPay || hasPaid
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-secondary hover:bg-blue-400 cursor-pointer"
              }`}
            >
              {loadingPayment ? (
                <div className=" flex justify-center w-full animate-spin">
                  <AiOutlineLoading3Quarters />
                </div>
              ) : (
                <p>Bayar Sekarang</p>
              )}
            </button>
          </div>
        </div>
      </div>

      {showPayment && transaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className=" bg-gradient-to-b from-blue-200 from-10% via-white to-white to-90% rounded-2xl p-2 w-full max-w-[550px]">
            <div className=" border border-slate-300 rounded-2xl">
              <div className=" p-5">
                <p className=" font-bold text-2xl text-center">
                  Menunggu Pembayaran
                </p>

                <div className=" pt-4 text-center">
                  <p className=" font-semibold text-xl">
                    Selesaikan Pembayaran dalam waktu
                  </p>
                  <p className=" text-red-500 font-semibold text-xl pt-1 italic">
                    {transaction.expired_at}
                  </p>
                </div>

                <div className=" border border-slate-300 rounded-2xl py-2 px-4 mt-4 flex justify-between items-center">
                  <p className=" text-slate-500 text-sm font-semibold">
                    Total Pembayaran
                  </p>
                  <p className=" font-semibold text-blue-900 text-xl">
                    {transaction.product_price}
                  </p>
                </div>

                <div className=" flex gap-2 mt-3">
                  <div className=" border rounded-2xl border-slate-300 px-4 items-center flex">
                    <img className=" w-32" src={logoACB} alt="acb-logo" />
                  </div>
                  <div className=" border rounded-2xl border-slate-300 py-2 px-4 flex justify-between items-center w-full">
                    <div>
                      <p className=" text-xs text-slate-500 font-semibold">
                        No. REK a/n RAVATRA AKADEMI INDONESIA
                      </p>
                      <p className=" text-blue-900 font-semibold text-xl">
                        {nomorRekening}
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={handleCopy}
                        className=" bg-blue-200 p-2 rounded-sm cursor-pointer text-blue-900 hover:text-blue-600"
                      >
                        <MdOutlineContentCopy size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                <p className=" text-xs italic font-semibold text-red-800 mt-1">
                  *perhatikan nominal transfer yang ada diatas untuk melakukan
                  approval pembayaran
                </p>

                <button className=" cursor-pointer border border-slate-300 rounded-2xl p-4 mt-5 flex items-center justify-between w-full">
                  <p className=" text-blue-900 font-semibold text-xl">
                    Petunjuk Pembayaran
                  </p>
                  <p className=" text-blue-900">
                    <AiFillDownCircle size={22} />
                  </p>
                </button>

                <p className=" text-center text-xs font-semibold pt-5 italic text-yellow-600">
                  jika admin sudah melakukan approval payment, maka package
                  product akan dikirim melalui Whatsapp
                </p>

                <button
                  onClick={handleClose}
                  className=" mt-1 w-full bg-blue-950 text-white py-4 rounded-lg font-semibold cursor-pointer"
                >
                  TUTUP
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
