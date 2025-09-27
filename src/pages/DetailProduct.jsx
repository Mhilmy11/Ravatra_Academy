import { CgShoppingBag } from "react-icons/cg";
import { TbCertificate2 } from "react-icons/tb";
import { BsFiletypePdf } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsWhatsapp, BsClock } from "react-icons/bs";
import { BiCalendar } from "react-icons/bi";
import { FiUsers, FiMapPin } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import SanitizedHTML from "../components/SanitizedHTML";

export default function DetailProduct() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
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

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/checkoutproduct/${detailProduct.id}`);
      setLoading(false);
    }, 500);
  };

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
    return (
      <div className=" w-full flex justify-center animate-spin text-secondary">
        <AiOutlineLoading3Quarters size={50} />
      </div>
    );
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
                onClick={handleCheckout}
                disabled={loading}
                className=" text-white bg-secondary py-3.5 rounded-lg font-semibold cursor-pointer"
              >
                {loading ? (
                  <div className=" flex justify-center w-full animate-spin">
                    <AiOutlineLoading3Quarters />
                  </div>
                ) : (
                  <p>Lanjut Bayar</p>
                )}
              </button>
              <div className=" bg-gray-300 h-0.5"></div>

              <p className=" font-semibold">Hubungi Sales kami :</p>
              <button
                onClick={() => openLink("https://wa.me/6281214277859")}
                className=" cursor-pointer border-2 rounded-lg border-green-800 bg-green-100 hover:bg-green-200 text-green-950 py-3.5 font-semibold flex items-center justify-center gap-2"
              >
                <BsWhatsapp color="green" size={25} />
                <p>Sales Sofi</p>
              </button>
              <button
                onClick={() => openLink("https://wa.me/6281214277839")}
                className=" cursor-pointer border-2 rounded-lg border-green-800 bg-green-100 hover:bg-green-200 text-green-950 py-3.5 font-semibold flex items-center justify-center gap-2"
              >
                <BsWhatsapp color="green" size={25} />
                <p>Sales Novia</p>
              </button>
              <button
                onClick={() => openLink("https://wa.me/6281214277869")}
                className=" cursor-pointer border-2 rounded-lg border-green-800 bg-green-100 hover:bg-green-200 text-green-950 py-3.5 font-semibold flex items-center justify-center gap-2"
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
              Benefit
            </button>
          </div>

          <div className=" bg-gray-300 h-0.5 w-full mb-10"></div>

          <div className=" text-gray-500 text-xl">
            {isDescription && (
              <>
                <SanitizedHTML html={detailProduct.description} />
              </>
            )}

            {isOutlineMateri && (
              <>
                <SanitizedHTML html={detailProduct.outline_materi} />
              </>
            )}

            {isFacilty && (
              <>
                <div className=" md:flex md:gap-5 grid grid-cols-1 gap-y-5">
                  {JSON.parse(detailProduct.facility).map((item, i) => (
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
    </>
  );
}
