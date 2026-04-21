import { FiUsers, FiMapPin } from "react-icons/fi";
import { BsClock } from "react-icons/bs";
import { BiCalendar } from "react-icons/bi";

import CardImage from "../assets/card-image-test.png";

import { useNavigate } from "react-router";

export default function CardProduct({ product, showButton }) {
  const navigate = useNavigate();

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };
  return (
    <>
      <div
        key={product.id}
        className="max-w-sm bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden border border-gray-200"
      >
        <div className="relative h-48">
          <img
            src="https://images.unsplash.com/photo-1557804483-ef3ae78eca57"
            alt="Program Training"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full shadow">
            {product.product_type}
          </span>

          <div className="absolute bottom-3 left-3 text-white">
            <p className="text-xs opacity-80">Pembicara</p>
            <p className="font-semibold text-sm">{product.pembicara}</p>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
            {product.product_name}
          </h3>

          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <BiCalendar size={16} className="text-blue-500" />
              <span>{product.schedule}</span>
            </div>

            <div className="flex items-center gap-2">
              <FiMapPin size={16} className="text-red-500" />
              <span>{product.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <BsClock size={16} className="text-green-500" />
              <span>{product.start_end_time}</span>
            </div>

            <div className="flex items-center gap-2">
              <FiUsers size={16} className="text-purple-500" />
              <span>{product.pendaftar}</span>
            </div>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="text-xs line-through text-gray-500">
                {formatRupiah(product.discount)}
              </p>
              <p className="text-xl font-bold text-blue-800">
                {formatRupiah(product.product_price)}
              </p>
            </div>

            {showButton && (
              <button
                onClick={() => navigate(`/product/${product.id}`)}
                className=" cursor-pointer px-4 py-2 bg-secondary text-white rounded-lg hover:bg-blue-800 transition"
              >
                Daftar
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
