import { BiBookOpen, BiVideo, BiCalendar } from "react-icons/bi";
import { FiUsers, FiMapPin } from "react-icons/fi";
import { BsClock } from "react-icons/bs";
import { RiComputerLine } from "react-icons/ri";
import HeroImage from "../assets/seminar-hero-image.png";
import CardImage from "../assets/card-image-test.png";
import AboutImage from "../assets/seminar-about-image.jpg";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Container from "../components/Container";

export default function Seminar() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const seeProduct = useRef(null);

  const handleClickToProduct = () => {
    seeProduct.current?.scrollIntoView({ behavior: "smooth" });
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
      .get(
        "https://api.ravatraacademy.id/index.php?route=products&type=Webinar"
      )
      .then((res) => {
        if (res.data.success) {
          setProducts(res.data.data);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);
  return (
    <>
      <Container>
        <div className=" md:px-20 px-5 w-full">
          <div className=" w-full md:flex md:justify-between md:items-center">
            <div className=" md:w-1/2">
              <div className=" md:text-6xl text-3xl font-bold">
                Upgrade Skill <span className=" text-secondary">Pajak</span>{" "}
                Anda dengan Pelatihan Berkualitas!
              </div>

              <div className=" py-5 md:text-base text-sm">
                <p>
                  Ikuti{" "}
                  <span className=" font-bold pr-1">
                    Webinar Ravatra Academy
                  </span>
                  dan dapatkan pemahaman mendalam tentang regulasi pajak terkini
                  tanpa harus meninggalkan meja kerja Anda. Materi selalu
                  update, disampaikan langsung oleh praktisi berpengalaman, dan
                  bisa diakses secara online dengan sesi interaktif tanya jawab.
                </p>
              </div>

              <div>
                <button
                  onClick={handleClickToProduct}
                  className=" bg-secondary text-white hover:bg-blue-800 font-semibold px-5 py-3 rounded-lg cursor-pointer transition duration-300"
                >
                  Daftar Sekarang
                </button>
              </div>
            </div>

            <div className=" md:w-1/2 flex justify-end">
              <img src={HeroImage} alt="hero-image" />
            </div>
          </div>

          <div className=" md:flex hidden justify-between w-full items-center gap-5 px-10 mt-20">
            <div className=" w-1/2">
              <img src={AboutImage} alt="image-about" />
            </div>

            <div className=" w-1/2 flex flex-col gap-3.5">
              <h2 className=" font-bold text-3xl">
                Webinar Pajak Interaktif Ravatra Academy
              </h2>
              <p>
                Belajar pajak jadi lebih mudah dan fleksibel dengan program
                Webinar Ravatra Academy. Nikmati pembelajaran secara online,
                kapan pun dan di mana pun, dengan topik yang selalu up-to-date
                sesuai regulasi terbaru.
              </p>

              <p className=" font-semibold">Kenapa memilih kami?</p>

              <div className=" flex flex-col gap-4">
                <div className=" flex gap-2 items-center">
                  <div className=" bg-blue-200 text-secondary p-1.5 rounded-lg">
                    <RiComputerLine size={16.5} />
                  </div>
                  <p>Topik Relevan & Aktual</p>
                </div>
                <div className=" flex gap-2 items-center">
                  <div className=" bg-blue-200 text-secondary p-1.5 rounded-lg">
                    <BiBookOpen size={16.5} />
                  </div>
                  <p>Akses Mudah</p>
                </div>
                <div className=" flex gap-2 items-center">
                  <div className=" bg-blue-200 text-secondary p-1.5 rounded-lg">
                    <BiVideo size={16.5} />
                  </div>
                  <p>Sesi Tanya Jawab</p>
                </div>
              </div>
            </div>
          </div>

          <div className=" mt-20">
            <h1
              ref={seeProduct}
              className=" font-bold md:text-3xl text-xl mb-5"
            >
              Daftar Pelatihan yang Dibuka
            </h1>

            {products && products.length > 0 ? (
              <div className=" grid md:grid-cols-3 grid-cols-1 gap-10">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className=" bg-gray-100 rounded-xl px-2.5 py-2.5"
                  >
                    <div>
                      <div className="relative">
                        <img
                          src={CardImage}
                          alt="card-image-product"
                          className="w-full h-full object-cover rounded-lg"
                        />

                        <div className="absolute inset-0 flex items-end rounded-lg">
                          <div className="p-3 text-white">
                            <h2 className=" font-semibold">
                              {product.product_name}
                            </h2>
                          </div>
                        </div>
                      </div>

                      <div className=" px-1 mt-3.5">
                        {/* <h1 className=" font-semibold text-2xl">
                      {product.product_name}
                    </h1> */}

                        <div className=" grid grid-cols-2 gap-y-3.5 text-xs my-3.5">
                          <div className=" flex items-center gap-1">
                            <div className=" bg-blue-200 text-blue-950 p-1 rounded-lg">
                              <BiCalendar size={15} />
                            </div>
                            <p className=" text-neutral-500">
                              {product.schedule}
                            </p>
                          </div>

                          <div className=" flex items-center gap-1">
                            <div className=" bg-blue-200 text-blue-950 p-1 rounded-lg">
                              <BsClock size={15} />
                            </div>
                            <p className=" text-neutral-500">
                              {product.start_end_time}
                            </p>
                          </div>

                          <div className=" flex items-center gap-1">
                            <div className=" bg-blue-200 text-blue-950 p-1 rounded-lg">
                              <FiMapPin size={15} />
                            </div>
                            <p className=" text-neutral-500">
                              {product.location}
                            </p>
                          </div>

                          <div className=" flex items-center gap-1">
                            <div className=" bg-blue-200 text-blue-950 p-1 rounded-lg">
                              <FiUsers size={15} />
                            </div>
                            <p className=" text-neutral-500">
                              {product.pendaftar}
                            </p>
                          </div>
                        </div>

                        <div className=" pb-2 md:text-base text-xs">
                          <p className=" font-semibold">Advicer/Pembicara :</p>
                          <p className=" text-gray-500 text-xs">
                            {product.pembicara}
                          </p>
                        </div>

                        <div className=" h-0.5 bg-gray-300 rounded-full"></div>

                        <p className=" font-bold text-[22px] my-3.5 flex items-center gap-1.5">
                          <p>{formatRupiah(product.product_price)}</p>
                          <p className=" text-sm font-light line-through">
                            {product.dummy_discount}
                          </p>
                        </p>

                        <button
                          onClick={() =>
                            navigate(
                              `/regulartraining/detailproduct/${product.id}`
                            )
                          }
                          className=" bg-secondary py-3.5 w-full font-semibold rounded-lg text-white cursor-pointer"
                        >
                          Daftar Sekarang
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className=" text-center text-slate-400">
                ... Produk Belum Tersedia ...
              </div>
            )}
          </div>

          {/* <div className=" flex w-full justify-center mt-5">
            <button className=" bg-blue-200 text-secondary px-5 py-2.5 rounded-lg flex gap-1.5 items-center font-semibold cursor-pointer">
              <p>Lihat lebih banyak</p>
              <BiChevronDown size={20} />
            </button>
          </div> */}
        </div>
      </Container>
    </>
  );
}
