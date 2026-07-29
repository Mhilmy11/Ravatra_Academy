import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "../../services/axios";

import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUserTie,
  FaBookOpen,
  FaGift,
  FaDownload,
  FaWhatsapp,
  FaStar,
} from "react-icons/fa";

export default function DetailProduct() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/products/${slug}`);

      if (response.data.success) {
        setProduct(response.data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) =>
    Number(price).toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    });

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-[#000B76] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Product tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <section className="max-w-7xl mx-auto px-5 py-12">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <img
              src={product.thumbnail}
              alt={product.slug}
              className="rounded-2xl shadow-lg w-full"
            />
          </div>

          <div>
            {product.is_featured == 1 && (
              <span className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold">
                <FaStar />
                Featured Training
              </span>
            )}

            <h1 className="text-4xl font-bold text-gray-800 mt-5">
              {product.product_name}
            </h1>

            <div className="mt-8">
              <p className="text-gray-500 text-sm">Investment</p>

              <h2 className="text-4xl font-bold text-[#000B76]">
                {formatPrice(product.product_price)}
              </h2>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  const message = encodeURIComponent(
                    `Halo Ravatra Academy,

Saya tertarik mengikuti program ${product.product_name}.

Mohon informasi mengenai pendaftarannya.

Terima kasih.`,
                  );

                  window.open(
                    `https://wa.me/${product.phone_admin}?text=${message}`,
                    "_blank",
                  );
                }}
                className="bg-[#000B76] hover:bg-blue-900 text-white px-8 py-4 rounded-xl flex items-center gap-3 font-semibold"
              >
                <FaWhatsapp />
                Chat Admin Whatsapp
              </button>

              {/* <a
                href={product.package_link}
                target="_blank"
                rel="noreferrer"
                className="border-2 border-[#000B76] text-[#000B76] hover:bg-[#000B76] hover:text-white px-8 py-4 rounded-xl flex items-center gap-3 font-semibold transition"
              >
                <FaDownload />
                Download Brochure
              </a> */}
            </div>
          </div>
        </div>
      </section>

      {/* INFORMATION */}

      <section className="max-w-7xl mx-auto px-5">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
          <InfoCard
            icon={<FaCalendarAlt />}
            title="Batch"
            value={product.schedule}
          />

          <InfoCard
            icon={<FaCalendarAlt />}
            title="Start Date"
            value={product.start_date}
          />

          <InfoCard
            icon={<FaClock />}
            title="Time"
            value={product.start_end_time}
          />

          <InfoCard
            icon={<FaMapMarkerAlt />}
            title="Location"
            value={product.location}
          />

          <InfoCard
            icon={<FaUserTie />}
            title="Speaker"
            value={product.pembicara}
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-12 space-y-8">
        <ContentCard icon={<FaBookOpen />} title="About This Training">
          <div
            className="leading-8 text-gray-700"
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          />
        </ContentCard>

        <ContentCard icon={<FaBookOpen />} title="Learning Outline">
          <div
            className="
            text-gray-700
            leading-8
            [&>ul]:list-disc
            [&>ul]:pl-6
            [&>ul]:space-y-2
            "
            dangerouslySetInnerHTML={{
              __html: product.outline_materi,
            }}
          />
        </ContentCard>

        <ContentCard icon={<FaGift />} title="Facilities">
          <div
            className="
            text-gray-700
            leading-8
            [&>ul]:list-disc
            [&>ul]:pl-6
            [&>ul]:space-y-2
            "
            dangerouslySetInnerHTML={{
              __html: product.facility,
            }}
          />
        </ContentCard>
      </section>
    </div>
  );
}

function InfoCard({ icon, title, value }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <div className="text-yellow-400 text-2xl">{icon}</div>

      <p className="text-sm text-gray-500 mt-3">{title}</p>

      <p className="font-semibold text-gray-800 mt-1">{value}</p>
    </div>
  );
}

function ContentCard({ icon, title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-[#000B76] text-2xl">{icon}</div>

        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>

      {children}
    </div>
  );
}
