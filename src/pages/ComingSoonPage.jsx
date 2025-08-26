import { MdOutlineEmojiPeople } from "react-icons/md";
import {
  FaChalkboardTeacher,
  FaSchool,
  FaPeopleArrows,
  FaGlobe,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import HeaderWave from "../assets/wave.svg";
import RavatraLogo from "../assets/logo-ravatra-academy-nobg.png";
import { useNavigate } from "react-router";

export default function ComingSoonPage() {
  const openLink = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const navigate = useNavigate();

  const paths = ["/regulartraining", "/", "/seminar", "/"];

  return (
    <div className="w-full">
      {/* <header className="bg-yellow-500 relative pb-5 md:pb-0">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <img
            className="w-[50px] md:w-[130px] py-2 md:py-5"
            src={RavatraLogo}
            alt="logo-ravatra"
          />
          <h1 className="text-white text-sm md:text-3xl font-semibold">
            "Tingkatkan <span className="italic font-bold">Keahlian</span>,"
          </h1>
          <h1 className="text-white text-sm md:text-3xl font-semibold">
            Raih <span className="font-bold">Kesuksesan!</span>
          </h1>
        </div>
        <img className="w-full" src={HeaderWave} alt="header-wave" />
      </header> */}

      <div className=" text-center md:pt-0 pt-10">
        <h1 className=" text-lg md:text-3xl font-semibold">
          "Tingkatkan <span className="italic font-bold">Keahlian</span>,"
        </h1>
        <h1 className=" text-lg md:text-3xl font-semibold">
          Raih <span className="font-bold">Kesuksesan!</span>
        </h1>
      </div>

      <div className="px-5 py-10 flex justify-center">
        <div className="flex items-center gap-3 border-b-8 border-yellow-500 text-blue-950">
          <div className="px-3 pt-3 rounded-t-full bg-yellow-500">
            <MdOutlineEmojiPeople size={45} />
          </div>
          <h1 className="font-black text-lg md:text-2xl">
            Layanan Pelatihan Kami:
          </h1>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 text-blue-950">
          {["Pelatihan Reguler", "In-House Training", "Webinar", "Kursus"].map(
            (title, index) => (
              <div
                key={index}
                onClick={() => navigate(paths[index])}
                className="px-5 py-6 rounded-3xl cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 shadow-yellow-600 bg-yellow-500 flex flex-col items-center"
              >
                <div className="flex justify-center mb-2">
                  {index === 0 ? (
                    <FaChalkboardTeacher size={40} />
                  ) : index === 1 ? (
                    <FaSchool size={40} />
                  ) : index === 2 ? (
                    <GiTeacher size={40} />
                  ) : (
                    <FaPeopleArrows size={40} />
                  )}
                </div>
                <p className="text-sm md:text-base py-1 font-bold">{title}</p>
                <p className="w-36 text-xs text-center">
                  {index === 0
                    ? "Kelas terjadwal dengan kurikulum komprehensif"
                    : index === 1
                    ? "Pelatihan khusus sesuai kebutuhan perusahaan Anda"
                    : index === 2
                    ? "Update ilmu terkini bersama pakar industri"
                    : "Pembelajaran intensif untuk meningkatkan kompetensi"}
                </p>
              </div>
            )
          )}
        </div>
      </div>

      <footer className="pt-20 flex flex-wrap justify-center gap-5">
        <button className="flex items-center gap-1">
          <div className="bg-blue-950 p-2 rounded-full text-white">
            <FaGlobe size={25} />
          </div>
          <p className="font-bold text-blue-950">ravatraacademy.id</p>
        </button>

        <button
          onClick={() => openLink("https://www.instagram.com/ravatraacademy")}
          className="flex items-center gap-1 cursor-pointer"
        >
          <div className="bg-blue-950 p-2 rounded-full text-white hover:bg-blue-600">
            <FaInstagram size={25} />
          </div>
          <p className="font-bold text-blue-950 hover:text-blue-600">
            ravatraacademy
          </p>
        </button>

        <button
          onClick={() => openLink("https://wa.me/6285888388439")}
          className="flex items-center gap-1 cursor-pointer"
        >
          <div className="bg-blue-950 p-2 rounded-full text-white hover:bg-blue-600">
            <FaWhatsapp size={25} />
          </div>
          <p className="font-bold text-blue-950 hover:text-blue-600">
            085888388439
          </p>
        </button>
      </footer>
    </div>
  );
}
