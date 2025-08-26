import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BiBookOpen, BiVideo, BiChevronDown } from "react-icons/bi";
import { RiComputerLine } from "react-icons/ri";
import HeroImage from "../assets/kursus-hero-image.png";
import AboutImage from "../assets/kursus-about-image.jpg";
import CardProduct from "../components/CardProduct";

export default function Kursus() {
  return (
    <>
      <div className=" px-20 w-full">
        <div className=" w-full flex justify-between items-center">
          <div className=" w-1/2">
            <div className=" text-6xl font-bold">
              Upgrade Skill <span className=" text-secondary">Pajak</span> Anda
              dengan Pelatihan Berkualitas!
            </div>

            <div className=" py-5">
              <p>
                Ingin menguasai regulasi pajak terbaru dan meningkatkan
                keterampilan profesional Anda?{" "}
                <span className=" font-bold pr-1">Kursus Ravatra Academy</span>
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

          <div className=" w-1/2 flex justify-end">
            <img src={HeroImage} alt="hero-image" />
          </div>
        </div>

        <div className=" flex justify-between w-full items-center px-10 mt-20">
          <div className=" w-1/2">
            <img
              className=" w-[500px] rounded-xl"
              src={AboutImage}
              alt="image-about"
            />
          </div>

          <div className=" w-1/2 flex flex-col gap-3.5">
            <h2 className=" font-bold text-3xl">Kursus Ravatra Academy</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
              animi sequi inventore aspernatur omnis ratione enim id magni,
              deleniti, voluptatem reprehenderit aut neque iure odit dolore
              dicta cupiditate. Nobis officiis, beatae nam iure magnam officia
              similique quae quidem consequuntur illum repudiandae dolor, non
              quis quos distinctio placeat praesentium ab maiores?
            </p>

            <p className=" font-semibold">Lorem, ipsum dolor.</p>

            <div className=" flex flex-col gap-4">
              <div className=" flex gap-2 items-center">
                <div className=" bg-blue-200 text-secondary p-1.5 rounded-lg">
                  <RiComputerLine size={16.5} />
                </div>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
              <div className=" flex gap-2 items-center">
                <div className=" bg-blue-200 text-secondary p-1.5 rounded-lg">
                  <BiBookOpen size={16.5} />
                </div>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
              <div className=" flex gap-2 items-center">
                <div className=" bg-blue-200 text-secondary p-1.5 rounded-lg">
                  <BiVideo size={16.5} />
                </div>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          </div>
        </div>

        <div className=" mt-20">
          <h1 className=" font-bold text-3xl mb-5">
            Daftar Pelatihan yang Dibuka
          </h1>

          <CardProduct />
        </div>

        <div className=" flex w-full justify-center mt-5">
          <button className=" bg-blue-200 text-secondary px-5 py-2.5 rounded-lg flex gap-1.5 items-center font-semibold cursor-pointer">
            <p>Lihat lebih banyak</p>
            <BiChevronDown size={20} />
          </button>
        </div>

        {/* <div className=" mt-20">
                          <div className=" flex w-full justify-between items-center">
                            <p className=" font-bold text-3xl">Apa Kata Mereka?</p>
                            <div className=" flex gap-2.5">
                              <button className=" bg-blue-200 text-secondary p-2.5 rounded-lg cursor-pointer">
                                <IoIosArrowBack size={24} />
                              </button>
                              <button className=" bg-secondary text-white p-2.5 rounded-lg cursor-pointer">
                                <IoIosArrowForward size={24} />
                              </button>
                            </div>
                          </div>
                        </div> */}
      </div>
    </>
  );
}
