import { BiBookOpen, BiVideo, BiChevronDown, BiCalendar } from "react-icons/bi";
import { RiComputerLine } from "react-icons/ri";
import { FiUsers, FiMapPin } from "react-icons/fi";
import { BsClock } from "react-icons/bs";
import CardImage from "../assets/card-image-test.png";
import HeroImage from "../assets/hero-image.png";
import AboutImage from "../assets/image-about.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Container from "../components/Container";

export default function RegularTraining() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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
        "https://api.ravatraacademy.id/routes/productsRoute.php?type=RegularTraining"
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
    <Container>
      <div className=" md:px-20 px-5 w-full">
        <div className=" w-full md:flex md:justify-between md:items-center">
          <div className=" md:w-1/2">
            <div className=" md:text-6xl text-3xl font-bold">
              Upgrade Skill <span className=" text-secondary">Pajak</span> Anda
              dengan Pelatihan Berkualitas!
            </div>

            <div className=" py-5 md:text-base text-sm">
              <p>
                Ingin menguasai regulasi pajak terbaru dan meningkatkan
                keterampilan profesional Anda?{" "}
                <span className=" font-bold pr-1">
                  Regular Training Ravatra Academy
                </span>
                hadir dengan kurikulum terstruktur, instruktur ahli, dan metode
                pembelajaran interaktif.
              </p>
            </div>

            <div>
              <button className=" bg-secondary text-white hover:bg-blue-800 font-semibold px-5 py-3 rounded-lg cursor-pointer transition duration-300">
                Daftar Sekarang
              </button>
            </div>
          </div>

          <div className=" md:w-1/2 flex justify-end">
            <img src={HeroImage} alt="hero-image" />
          </div>
        </div>

        <div className=" md:flex hidden justify-between w-full items-center px-10 mt-20">
          <div className=" w-1/2">
            <img src={AboutImage} alt="image-about" />
          </div>

          <div className=" w-1/2 flex flex-col gap-3.5">
            <h2 className=" font-bold text-3xl">
              Regular Training Ravatra Academy
            </h2>
            <p>
              Regular Training Ravatra Academy adalah program pelatihan pajak
              yang dirancang khusus untuk membantu individu dan profesional
              memahami pajak secara mendalam. Dengan instruktur dari berbagai
              latar belakang industri, kami menghadirkan pembelajaran yang
              praktis, relevan, dan mudah diterapkan dalam dunia kerja.
            </p>

            <p className=" font-semibold">Kenapa memilih kami?</p>

            <div className=" flex flex-col gap-4">
              <div className=" flex gap-2 items-center">
                <div className=" bg-blue-200 text-secondary p-1.5 rounded-lg">
                  <RiComputerLine size={16.5} />
                </div>
                <p>Kurikulum berbasis kasus nyata</p>
              </div>
              <div className=" flex gap-2 items-center">
                <div className=" bg-blue-200 text-secondary p-1.5 rounded-lg">
                  <BiBookOpen size={16.5} />
                </div>
                <p>Metode interaktif dengan studi kasus</p>
              </div>
              <div className=" flex gap-2 items-center">
                <div className=" bg-blue-200 text-secondary p-1.5 rounded-lg">
                  <BiVideo size={16.5} />
                </div>
                <p>Fleksibel: Online & Offline</p>
              </div>
            </div>
          </div>
        </div>

        <div className=" mt-20">
          <h1 className=" font-bold md:text-3xl text-xl mb-5">
            Daftar Pelatihan yang Dibuka
          </h1>

          <div className=" grid md:grid-cols-3 grid-cols-1 gap-10">
            {products.map((product) => (
              <div
                key={product.id}
                className=" bg-gray-100 rounded-xl px-2.5 py-2.5"
              >
                <div>
                  <div>
                    <img src={CardImage} alt="card-image-1" />
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
                        <p className=" text-neutral-500">{product.schedule}</p>
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
                        navigate(`/regulartraining/detailproduct/${product.id}`)
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
        </div>

        <div className=" flex w-full justify-center mt-5">
          <button className=" bg-blue-200 text-secondary px-5 py-2.5 rounded-lg flex gap-1.5 items-center font-semibold cursor-pointer">
            <p>Lihat lebih banyak</p>
            <BiChevronDown size={20} />
          </button>
        </div>
      </div>
    </Container>
  );
}
