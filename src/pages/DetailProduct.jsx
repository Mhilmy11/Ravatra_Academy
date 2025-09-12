import { BsWhatsapp, BsClock } from "react-icons/bs";
import { BiCalendar } from "react-icons/bi";
import { MdOutlineFastfood, MdOutlinePlayLesson } from "react-icons/md";
import { GiCoffeeCup } from "react-icons/gi";
import { TbCertificate } from "react-icons/tb";
import { FiUsers, FiMapPin } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

export default function DetailProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detailProduct, setDetailProduct] = useState(null);

  const openLink = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  useEffect(() => {
    axios
      .get(`https://api.ravatraacademy.id/index.php?route=products&id=${id}`)
      .then((res) => {
        if (res.data.success) setDetailProduct(res.data.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [id]);

  const [isDescription, setIsDescription] = useState(true);
  const [isOutlineMateri, setIsOutlineMateri] = useState(false);
  const [isFacilty, setIsFacilty] = useState(false);

  const handleToClickDescription = () => {
    setIsDescription(true);
    setIsOutlineMateri(false);
    setIsFacilty(false);
  };

  const handleClickToOutlineMateri = () => {
    setIsDescription(false);
    setIsOutlineMateri(true);
    setIsFacilty(false);
  };

  const handleClickToFacilty = () => {
    setIsDescription(false);
    setIsOutlineMateri(false);
    setIsFacilty(true);
  };

  if (!detailProduct) {
    return <p className=" w-full flex justify-center">...</p>;
  }

  return (
    <>
      <div className=" md:px-20 px-5 mt-10">
        <div className=" md:flex items-start justify-between gap-14 w-full">
          <div className=" md:flex md:w-[70%] items-center gap-7">
            <div>
              <p className=" font-bold md:text-3xl md:w-full text-xl">
                {detailProduct.product_name}
              </p>

              <div className=" grid md:grid-cols-1 grid-cols-2 gap-1 text-xs pb-3 pt-3 md:text-base">
                <div className=" flex gap-2.5 items-center">
                  <div className=" bg-blue-200 p-2 rounded-lg">
                    <BiCalendar size={20} className=" text-secondary" />
                  </div>
                  <p className=" text-gray-400">{detailProduct.schedule}</p>
                </div>
                <div className=" flex gap-2.5 items-center">
                  <div className=" bg-blue-200 p-2 rounded-lg">
                    <BsClock size={20} className=" text-secondary" />
                  </div>
                  <p className=" text-gray-400">
                    {detailProduct.start_end_time}
                  </p>
                </div>
                <div className=" flex gap-2.5 items-center">
                  <div className=" bg-blue-200 p-2 rounded-lg">
                    <FiMapPin size={20} className=" text-secondary" />
                  </div>
                  <p className=" text-gray-400">{detailProduct.location}</p>
                </div>
                <div className=" flex gap-2.5 items-center">
                  <div className=" bg-blue-200 p-2 rounded-lg">
                    <FiUsers size={20} className=" text-secondary" />
                  </div>
                  <p className=" text-gray-400">{detailProduct.pendaftar}</p>
                </div>
              </div>

              <div className=" pb-2 md:text-base text-sm">
                <p className=" font-semibold">Advicer/Pembicara :</p>
                <p className=" text-gray-500">{detailProduct.pembicara}</p>
              </div>
            </div>
          </div>

          <div className=" md:w-[30%] flex flex-col md:py-0 py-5 gap-y-3.5">
            <div className=" px-2.5 py-5 shadow-xl rounded-lg bg-gray-100 w-full flex flex-col gap-3.5 justify-center">
              <p className=" font-bold text-3xl flex items-end">
                {formatRupiah(detailProduct.product_price)}/{" "}
                <p className=" text-sm font-light"> Peserta</p>
              </p>
              <button
                onClick={() => navigate(`/checkoutproduct/${detailProduct.id}`)}
                className=" text-white bg-secondary py-3.5 rounded-lg font-semibold cursor-pointer"
              >
                Lanjut Bayar
              </button>
              <div className=" bg-gray-300 h-0.5"></div>

              <p className=" font-semibold">Hubungi Sales kami :</p>
              <button
                onClick={() => openLink("https://wa.me/6281214277859")}
                className=" cursor-pointer border-2 rounded-lg border-green-800 bg-green-100 text-green-950 py-3.5 font-semibold flex items-center justify-center gap-2"
              >
                <BsWhatsapp color="green" size={25} />
                <p>Sales Sofi</p>
              </button>
              <button
                onClick={() => openLink("https://wa.me/6281214277839")}
                className=" cursor-pointer border-2 rounded-lg border-green-800 bg-green-100 text-green-950 py-3.5 font-semibold flex items-center justify-center gap-2"
              >
                <BsWhatsapp color="green" size={25} />
                <p>Sales Novia</p>
              </button>
              <button
                onClick={() => openLink("https://wa.me/6281214277869")}
                className=" cursor-pointer border-2 rounded-lg border-green-800 bg-green-100 text-green-950 py-3.5 font-semibold flex items-center justify-center gap-2"
              >
                <BsWhatsapp color="green" size={25} />
                <p>Sales Verdian</p>
              </button>
            </div>
          </div>
        </div>

        <div className=" mt-10">
          <div className=" flex md:gap-14 gap-5 md:text-2xl text-xl font-semibold pb-4">
            <button
              onClick={handleToClickDescription}
              className={
                isDescription === true
                  ? " bg-blue-100 text-secondary px-5 py-2.5 rounded-lg"
                  : " cursor-pointer"
              }
            >
              Deskripsi
            </button>
            <button
              onClick={handleClickToOutlineMateri}
              className={
                isOutlineMateri === true
                  ? " bg-blue-100 text-secondary px-5 py-2.5 rounded-lg"
                  : " cursor-pointer"
              }
            >
              Outline Materi
            </button>
            <button
              onClick={handleClickToFacilty}
              className={
                isFacilty === true
                  ? " bg-blue-100 text-secondary px-5 py-2.5 rounded-lg"
                  : " cursor-pointer"
              }
            >
              Fasilitas
            </button>
          </div>

          <div className=" bg-gray-300 h-0.5 w-full mb-10"></div>

          <div className=" text-gray-500 text-xl">
            {isDescription && (
              <>
                <p>{detailProduct.description}</p>
              </>
            )}

            {isOutlineMateri && (
              <>
                <div>
                  <p>{detailProduct.outline_materi}</p>
                </div>
              </>
            )}

            {isFacilty && (
              <>
                <div className=" flex w-full gap-5">
                  <div className=" bg-blue-50 w-full p-5 flex items-center gap-5 rounded-lg">
                    <div className=" bg-blue-200 p-5 rounded-lg text-secondary">
                      <MdOutlinePlayLesson size={60} />
                    </div>
                    <p className=" text-2xl font-bold text-gray-600">
                      {detailProduct.facility}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
