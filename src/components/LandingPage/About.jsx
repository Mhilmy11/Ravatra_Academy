import { useNavigate } from "react-router";

import Container from "../../components/Container";

import ImageAbout from "../../assets/image-about-section.png";
import { AiOutlineArrowDown } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";
import LazyImage from "../../shared/LazyImage";

export default function About({ handleClickToProduct }) {
  const navigate = useNavigate();
  return (
    <div className=" bg-yellow-500 text-white">
      <Container>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-10 py-8 px-4">
          <div>
            <h6 className=" md:text-5xl text-3xl font-bold mb-5">
              Pelatihan <span className=" text-secondary">pajak praktis</span>{" "}
              untuk masa depan <span className=" text-secondary">cerah</span>.
            </h6>
            <p className=" pb-7 md:text-xl">
              Ravatra Academy hadir untuk mendampingi Anda menguasai ilmu
              perpajakan dan manajemen, demi karir dan pengembangan organisasi
              yang lebih baik.
            </p>

            <div className=" text-black font-semibold text-lg">
              <div className=" flex gap-2">
                <button
                  onClick={() => navigate("/seminar")}
                  className=" cursor-pointer border-2 border-blue-900 px-3 py-1 rounded-full hover:bg-blue-950 hover:text-white transition"
                >
                  Webinar
                </button>
                <button
                  onClick={() => navigate("/kursus")}
                  className=" cursor-pointer border-2 border-blue-900 px-3 py-1 rounded-full hover:bg-blue-950 hover:text-white transition"
                >
                  Kursus
                </button>
                <button
                  onClick={() => navigate("/elearning")}
                  className=" cursor-pointer border-2 border-blue-900 px-3 py-1 rounded-full hover:bg-blue-950 hover:text-white transition"
                >
                  eLearning
                </button>
              </div>

              <div className=" mt-2">
                <button
                  onClick={() => navigate("/regulartraining")}
                  className=" cursor-pointer border-2 border-blue-900 px-3 py-1 rounded-full hover:bg-blue-950 hover:text-white transition"
                >
                  Regular Training
                </button>
              </div>
            </div>

            <div className=" mt-7 grid grid-cols-2 gap-4 md:text-xl font-semibold">
              <button
                onClick={handleClickToProduct}
                className=" cursor-pointer hover:bg-blue-950 hover:border-blue-950 hover:text-yellow-400 transition flex gap-2 items-center border-2 rounded-xl py-3 px-4"
              >
                Lihat Program <AiOutlineArrowDown size={25} />
              </button>
              <button
                onClick={() =>
                  window.open("https://wa.me/6281214277869", "_blank")
                }
                className=" cursor-pointer hover:bg-green-600 hover:text-white transition flex items-center gap-2 bg-white text-black rounded-xl py-3 px-4"
              >
                <BsWhatsapp size={25} /> Hubungi Kami
              </button>
            </div>
          </div>

          <LazyImage
            className=" rounded-2xl md:block hidden w-[540px]"
            src={ImageAbout}
            alt="image-about-section"
          />
        </div>
      </Container>
    </div>
  );
}
