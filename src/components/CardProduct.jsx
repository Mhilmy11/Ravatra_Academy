import { FiUsers, FiMapPin } from "react-icons/fi";
import { BsClock } from "react-icons/bs";
import { BiCalendar } from "react-icons/bi";

import { useNavigate } from "react-router";

export default function CardProduct({ product, type, showButton = true }) {
  const navigate = useNavigate();

  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };
  return (
    <>
      <div className="max-w-sm bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden border border-gray-200">
        <div className="relative h-48">
          <img
            src={product.thumbnail}
            alt={product.product_name}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full shadow">
            {product.product_type}
          </span>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
            {product.product_name}
          </h3>

          <div className="space-y-2 text-sm text-gray-600">
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

            {product.start_date && (
              <div className="flex items-center gap-2">
                <FiUsers size={16} className="text-purple-500" />
                <span>{product.start_date}</span>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="text-xl font-bold text-blue-800">
                {formatRupiah(product.product_price)}
              </p>
            </div>

            {showButton && (
              <button
                onClick={() => navigate(`/products/${type}/${product.slug}`)}
                className="cursor-pointer px-4 py-2 bg-secondary text-white rounded-lg hover:bg-blue-800 transition"
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
