import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaUser,
  FaWhatsapp,
} from "react-icons/fa";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import SanitizedHTML from "../components/SanitizedHTML";

export default function ProductDetail() {
  const [activeTab, setActiveTab] = useState("deskripsi");

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [detailProduct, setDetailProduct] = useState(null);

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const tabs = [
    { id: "deskripsi", label: "Deskripsi" },
    { id: "outline", label: "Outline Materi" },
    { id: "benefit", label: "Benefit" },
  ];

  useEffect(() => {
    axios
      .get(`https://apiv2.ravatraacademy.id/api/products/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setDetailProduct(res.data.data);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/checkoutproduct/${detailProduct.id}`);
      setLoading(false);
    }, 500);
  };

  let facilities = [];

  try {
    facilities = JSON.parse(product?.facility || "[]");
  } catch {
    facilities = [];
  }

  if (!detailProduct) {
    return (
      <div className=" w-full flex justify-center animate-spin text-secondary">
        <AiOutlineLoading3Quarters size={50} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="relative bg-[#000B76] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-12 grid md:grid-cols-2 gap-10">
          <div>
            <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-semibold">
              Best Seller
            </span>

            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-4 leading-tight 
             overflow-hidden 
             [display:-webkit-box] 
             [-webkit-line-clamp:2] 
             [-webkit-box-orient:vertical] 
             break-words"
            >
              {detailProduct.product_name}
            </h1>

            <p className="mt-4 text-gray-200 max-w-lg">
              Upgrade skill pajak kamu dari basic sampai advance bersama
              konsultan pajak profesional.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <Info
                icon={<FaCalendarAlt />}
                label="Mulai"
                value={detailProduct.schedule}
              />
              <Info
                icon={<FaClock />}
                label="Waktu"
                value={detailProduct.start_end_time}
              />
              <Info
                icon={<FaMapMarkerAlt />}
                label="Lokasi"
                value={detailProduct.location}
              />
              <Info
                icon={<FaUsers />}
                label="Peserta"
                value={detailProduct.pendaftar}
              />
            </div>

            <div className="flex items-center gap-3 mt-6">
              <FaUser />
              <span className="text-sm text-gray-200">
                {detailProduct.pembicara}
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white text-gray-800 rounded-3xl shadow-2xl p-8 sticky top-10">
              <p className="text-sm text-gray-500">*Harga untuk satu Peserta</p>
              <h2 className="text-4xl font-bold text-[#000B76] mt-1">
                {formatRupiah(detailProduct.product_price)}
              </h2>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="mt-6 w-full cursor-pointer bg-yellow-400 text-black font-semibold py-3 rounded-xl hover:scale-105 transition"
              >
                {loading ? (
                  <div className=" flex justify-center w-full animate-spin">
                    <AiOutlineLoading3Quarters />
                  </div>
                ) : (
                  <p>Checkout Sekarang</p>
                )}
              </button>

              {/* WA BUTTON */}
              <div className="grid grid-cols-1 gap-3 mt-4">
                {[1, 2, 3].map((i) => (
                  <button
                    key={i}
                    className="flex items-center justify-center gap-2 border border-green-500 text-green-600 py-2 rounded-xl hover:bg-green-50"
                  >
                    <FaWhatsapp /> Chat Sales {i}
                  </button>
                ))}
              </div>

              <div className="mt-6 text-xs text-gray-400 text-center">
                Kuota terbatas, segera daftar 🚀
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        <div className="flex gap-3 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={` cursor-pointer px-5 py-2 rounded-full text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-[#000B76] text-white shadow"
                  : "bg-white border text-gray-500 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 leading-relaxed">
          {activeTab === "deskripsi" && (
            <SanitizedHTML html={detailProduct.description} />
          )}

          {activeTab === "outline" && (
            <>
              <SanitizedHTML html={detailProduct.outline_materi} />
            </>
          )}

          {activeTab === "benefit" && (
            <>
              <div className=" md:flex md:gap-5 grid grid-cols-1 gap-y-5">
                {facilities.map((item, i) => (
                  <div
                    key={i}
                    className=" bg-blue-50 p-3 w-fit rounded-lg flex items-center gap-4"
                  >
                    <div className=" bg-blue-200 p-3 rounded-lg text-secondary"></div>
                    <p className=" text-2xl font-semibold text-gray-600">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm">
      <div className="text-yellow-300">{icon}</div>
      <div>
        <p className="text-xs text-gray-300">{label}</p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}
