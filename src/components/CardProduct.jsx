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
      <div key={product.id} className=" bg-gray-100 rounded-xl px-2.5 py-2.5">
        <div>
          <div className="relative">
            <img
              src={CardImage}
              alt="card-image-product"
              className="w-full h-full object-cover rounded-lg"
            />

            <div className="absolute inset-0 flex items-end rounded-lg">
              <div className="p-3 text-white">
                <h2 className=" font-semibold">{product.product_name}</h2>
              </div>
            </div>
          </div>

          <div className=" px-1 mt-3.5">
            <div className=" grid grid-cols-2 gap-y-3.5 text-xs my-3.5">
              <div className=" flex items-center gap-1">
                <div className=" bg-blue-200 text-blue-950 p-1 rounded-lg">
                  <BiCalendar size={15} />
                </div>
                <p className=" text-neutral-500">{product.schedule}</p>
              </div>

              <div className=" flex items-center gap-1">
                <div className=" bg-blue-200 text-blue-950 p-1 rounded-lg">
                  <BsClock size={15} />
                </div>
                <p className=" text-neutral-500">{product.start_end_time}</p>
              </div>

              <div className=" flex items-center gap-1">
                <div className=" bg-blue-200 text-blue-950 p-1 rounded-lg">
                  <FiMapPin size={15} />
                </div>
                <p className=" text-neutral-500">{product.location}</p>
              </div>

              <div className=" flex items-center gap-1">
                <div className=" bg-blue-200 text-blue-950 p-1 rounded-lg">
                  <FiUsers size={15} />
                </div>
                <p className=" text-neutral-500">{product.pendaftar}</p>
              </div>
            </div>

            <div className=" pb-2 md:text-base text-xs">
              <p className=" font-semibold">Advicer/Pembicara :</p>
              <p className=" text-gray-500 text-xs">{product.pembicara}</p>
            </div>

            <div className=" h-0.5 bg-gray-300 rounded-full"></div>

            <p className=" font-bold text-[22px] my-3.5 flex items-center gap-1.5">
              <p>{formatRupiah(product.product_price)}</p>
              <p className=" text-sm font-light line-through">
                {product.dummy_discount}
              </p>
            </p>

            {showButton && (
              <button
                onClick={() =>
                  navigate(`/regulartraining/detailproduct/${product.id}`)
                }
                className=" bg-secondary py-3.5 w-full font-semibold rounded-lg text-white cursor-pointer"
              >
                Daftar Sekarang
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
