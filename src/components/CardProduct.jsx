import { FiUsers, FiMapPin } from "react-icons/fi";
import { BsClock } from "react-icons/bs";
import { BiCalendar } from "react-icons/bi";
import CardImage from "../assets/card-image-test.png";

export default function CardProduct() {
  return (
    <>
      <div className=" bg-gray-100 rounded-xl px-2.5 py-2.5 w-fit">
        <div>
          <div>
            <img src={CardImage} alt="card-image-1" />
          </div>

          <div className=" w-[351px] px-1 mt-3.5">
            <h1 className=" font-semibold text-2xl">
              Coretax Komprehensif : Administrasi Faktur Pajak dan Pelaporan SPT
              Masa PPN
            </h1>

            <div className=" grid grid-cols-2 gap-y-3.5 text-xs my-3.5">
              <div className=" flex items-center gap-1">
                <div className=" bg-blue-200 text-blue-950 p-1 rounded-lg">
                  <BiCalendar size={15} />
                </div>
                <p className=" text-neutral-500">24 April 2025</p>
              </div>

              <div className=" flex items-center gap-1">
                <div className=" bg-blue-200 text-blue-950 p-1 rounded-lg">
                  <BsClock size={15} />
                </div>
                <p className=" text-neutral-500">09.00 - 16.30 WIB</p>
              </div>

              <div className=" flex items-center gap-1">
                <div className=" bg-blue-200 text-blue-950 p-1 rounded-lg">
                  <FiMapPin size={15} />
                </div>
                <p className=" text-neutral-500">Zoom</p>
              </div>

              <div className=" flex items-center gap-1">
                <div className=" bg-blue-200 text-blue-950 p-1 rounded-lg">
                  <FiUsers size={15} />
                </div>
                <p className=" text-neutral-500">50 Pendaftar</p>
              </div>
            </div>

            <div className=" h-0.5 bg-gray-300 rounded-full"></div>

            <p className=" font-bold text-2xl my-3.5">Rp 1.600.000</p>

            <button className=" bg-secondary py-3.5 w-full font-semibold rounded-lg text-white cursor-pointer">
              Daftar Sekarang
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
