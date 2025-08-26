import { MdOutlineContentCopy } from "react-icons/md";
import HeroImage from "../assets/hero-checkout-page.png";
import CardImage from "../assets/card-image-test.png";
import axios from "axios";
import { useParams } from "react-router";
import { useState } from "react";
import logoBCA from "../assets/logo-BCA.png";

export default function CheckoutPage() {
  const { product_id } = useParams();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  const [userId, setUserId] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [product, setProduct] = useState(null);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://ravatraacademy.id/api/index.php?route=register",
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
        setFormSubmitted(true);
      } else {
        alert("Gagal mendaftar: " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat mengirim data.");
    }
  };

  const handleCreateTransaction = async () => {
    try {
      const res = await axios.post(
        "http://ravatraacademy.id/api/index.php?route=createTransaction",
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
      } else {
        alert("Gagal membuat transaksi: " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat membuat transaksi.");
    }
  };

  console.log(transaction);

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

            <div className="">
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
                      disabled={formSubmitted}
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
                      disabled={formSubmitted}
                      placeholder="Masukkan nama belakang anda..."
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Nomor Hp
                  </label>
                  <input
                    type="number"
                    required
                    disabled={formSubmitted}
                    name="phone"
                    onChange={handleChange}
                    placeholder="Masukkan nomor hp anda..."
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Email
                  </label>
                  <input
                    required
                    disabled={formSubmitted}
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
                    disabled={formSubmitted}
                    className={`w-full ${
                      formSubmitted
                        ? "bg-gray-400"
                        : "bg-secondary cursor-pointer hover:to-blue-600"
                    } text-white py-3.5 rounded-lg font-semibold text-lg`}
                  >
                    {formSubmitted ? "SUBMITED" : "SUBMIT"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {formSubmitted && (
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
                    {product.product_name}
                  </p>
                </div>
                <div>{formatRupiah(product.product_price)}</div>
              </div>

              <div className=" flex justify-between items-center">
                <p className=" font-semibold">Diskon</p>
                Rp. 0
              </div>

              <div className=" flex items-center justify-between">
                <p className=" font-semibold">Subtotal</p>
                <p>{formatRupiah(product.product_price)}</p>
              </div>

              <div className=" h-0.5 bg-gray-400"></div>

              {showPayment && transaction ? (
                <div>
                  <div className=" bg-green-500 text-center text-sm italic font-semibold mb-5 rounded-lg">
                    🎉 PEMBUATAN ORDER BERHASIL, IKUTI PEMBAYARAN DIBAWAH 🎉
                  </div>

                  <div className=" w-full flex justify-between items-center text-2xl">
                    <p className="font-semibold text-xl">Nominal Transfer: </p>
                    <p className=" font-bold">{transaction.product_price}</p>
                  </div>

                  <p className=" text-xs italic font-semibold text-red-800">
                    *perhatikan nominal transfer yang ada diatas untuk melakukan
                    approval pembayaran
                  </p>

                  <div className=" flex gap-2 items-center pt-10">
                    <div className=" w-32">
                      <img src={logoBCA} alt="bca-logo" />
                    </div>
                    <div>
                      <div className=" font-semibold flex items-center gap-2">
                        <p className=" text-xl">5375375432</p>
                        <button className=" cursor-pointer hover:text-blue-600">
                          <MdOutlineContentCopy size={20} />
                        </button>
                      </div>
                      <p className=" font-bold text-sm italic">
                        RAVATRA AKADEMI INDONESIA
                      </p>
                    </div>
                  </div>

                  <p className=" flex justify-end gap-1 pb-10">
                    <span className="font-semibold text-xs">
                      Batas Pembayaran:{" "}
                    </span>
                    <p className=" italic text-sm">{transaction.expired_at}</p>
                  </p>

                  <p className=" text-center text-xs font-semibold pt-5 italic text-yellow-600">
                    jika admin sudah melakukan approval payment, maka package
                    product akan dikirim melalui Whatsapp
                  </p>
                </div>
              ) : (
                <button
                  onClick={handleCreateTransaction}
                  className="bg-secondary cursor-pointer hover:bg-blue-400 py-5 text-white text-lg font-semibold rounded-lg"
                >
                  Bayar Sekarang
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
