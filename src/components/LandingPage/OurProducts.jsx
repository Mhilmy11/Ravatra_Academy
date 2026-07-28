import { useNavigate } from "react-router";

import RegularTrainingImage from "../../assets/image-about-regulartraining.jpg";
import BrevetImage from "../../assets/image-about-brevet.jpg";
import WebinarImage from "../../assets/image-about-webinar.jpg";
import KursusImage from "../../assets/image-about-kursus.jpg";
import ElearningImage from "../../assets/image-about-elearning.jpg";

import { BsWhatsapp } from "react-icons/bs";
import LazyImage from "../../shared/LazyImage";

const products = [
  {
    title: "Regular Training",
    image: RegularTrainingImage,
    navigate: "/products/regular-training",
    packages: ["Offline", "Full-Time", "1-2 Hari"],
    body: "Kelas terjadwal dengan kurikulum komprehensif yang dapat diikuti secara rutin untuk pengembangan karir.",
  },
  {
    title: "Brevet",
    image: BrevetImage,
    navigate: "/products/brevet",
    packages: ["Offline", "Full-Time", "1-2 Hari"],
    body: "Kelas terjadwal dengan kurikulum komprehensif yang dapat diikuti secara rutin untuk pengembangan karir.",
  },
  {
    title: "Webinar",
    image: WebinarImage,
    navigate: "/products/seminar",
    packages: ["Online", "Half-Time", "1 Hari"],
    body: "Sesi berbagi ilmu terkini dari para pakar industri, sekaligus forum diskusi yang interaktif.",
  },
  {
    title: "Kursus",
    image: KursusImage,
    navigate: "/products/kursus",
    packages: ["Offline", "Full-Time", "1-2 Hari"],
    body: "Program pembelajaran intensif untuk meningkatkan kompetensi dalam bidang tertentu",
  },
  {
    title: "e Learning",
    image: ElearningImage,
    navigate: "/products/elearning",
    packages: ["Online", "Full-Time", "14 Hari"],
    body: "Program khusus yang dirancang sesuai kebutuhan spesifik perusahaan Anda untuk hasil optimal.",
  },
];

export default function OurProducts({ seeProduct }) {
  const navigate = useNavigate();
  return (
    <div className=" my-16 md:my-24">
      <h1 ref={seeProduct} className=" md:text-4xl text-xl font-bold">
        Pilihan Pelatihan{" "}
        <span className=" text-secondary underline">Ravatra Academy</span>
      </h1>

      <div className=" snap-x overflow-x-auto flex gap-6 scroll-smooth scroll-hide py-10 px-10 rounded-xl">
        {products.map((product, i) => (
          <div
            key={i}
            className=" snap-start shrink-0 bg-white w-[320px] rounded-xl p-4 shadow-lg shadow-blue-300"
          >
            <LazyImage
              className=" w-[300px] h-[205px] rounded-lg"
              src={product.image}
              alt="regulartraining-card-image"
            />

            <h2 className=" font-bold text-xl py-6">{product.title}</h2>

            <div className=" pt-3">
              <div className=" flex gap-1">
                {product.packages.map((item, idx) => (
                  <p
                    key={idx}
                    className=" border w-fit px-3 py-2 rounded-full text-sm"
                  >
                    {item}
                  </p>
                ))}
              </div>

              <p className=" text-sm py-4">{product.body}</p>
            </div>

            <div className=" pt-2 text-lg font-semibold">
              <button
                onClick={() => openLink("https://wa.me/6281214277869")}
                className=" cursor-pointer flex gap-4 items-center justify-center py-3 text-white rounded-lg bg-green-500 hover:bg-green-400 transition w-full"
              >
                <BsWhatsapp /> Hubungi Kami
              </button>
              <button
                onClick={() => navigate(product.navigate)}
                className=" cursor-pointer flex gap-4 items-center justify-center w-full rounded-lg py-3 border-2 border-slate-300 hover:border-blue-900 transition mt-2"
              >
                Lihat Pelatihan Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
