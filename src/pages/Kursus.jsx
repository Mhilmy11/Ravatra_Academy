import { BiBookOpen, BiVideo } from "react-icons/bi";
import { RiComputerLine } from "react-icons/ri";

import HeroImage from "../assets/hero-image.png";
import AboutImage from "../assets/kursus-about-image.jpg";

import { useEffect, useState, useRef } from "react";
import axios from "axios";

import Container from "../components/Container";
import CardProduct from "../components/CardProduct";

export default function Kursus() {
  const [products, setProducts] = useState([]);
  const seeProduct = useRef(null);

  const handleClickToProduct = () => {
    seeProduct.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    axios
      .get("https://api.ravatraacademy.id/index.php?route=products&type=Kursus")
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
                Ingin memahami konsep perpajakan secara menyeluruh dan membangun
                fondasi keterampilan yang kuat?{" "}
                <span className=" font-bold pr-1">Kursus Ravatra Academy</span>
                hadir dengan materi komprehensif, pengajar berpengalaman, dan
                pendekatan pembelajaran praktis.
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

        <div className=" md:flex hidden justify-between w-full items-center px-10 mt-20 gap-5">
          <div className=" w-1/2">
            <img src={AboutImage} alt="image-about" />
          </div>

          <div className=" w-1/2 flex flex-col gap-3.5">
            <h2 className=" font-bold text-3xl">Kursus Ravatra Academy</h2>
            <p className=" text-justify text-sm">
              Kursus Ravatra Academy adalah program pembelajaran pajak yang
              dirancang untuk memberikan pemahaman menyeluruh bagi pemula maupun
              praktisi. Dengan materi yang komprehensif, pengajar berpengalaman,
              serta metode yang interaktif, kami membantu peserta membangun
              dasar yang kuat dan siap menghadapi tantangan perpajakan di dunia
              nyata.
            </p>

            <p className=" font-semibold">Kenapa memilih kami?</p>

            <div className=" flex flex-col gap-4">
              <div className=" flex gap-2 items-center">
                <div className=" bg-blue-200 text-secondary p-1.5 rounded-lg">
                  <RiComputerLine size={16.5} />
                </div>
                <p>Materi komprehensif dari dasar hingga lanjutan</p>
              </div>
              <div className=" flex gap-2 items-center">
                <div className=" bg-blue-200 text-secondary p-1.5 rounded-lg">
                  <BiBookOpen size={16.5} />
                </div>
                <p>Pendampingan langsung dari pengajar berpengalaman</p>
              </div>
              <div className=" flex gap-2 items-center">
                <div className=" bg-blue-200 text-secondary p-1.5 rounded-lg">
                  <BiVideo size={16.5} />
                </div>
                <p>Akses fleksibel: Belajar mandiri maupun terjadwal</p>
              </div>
            </div>
          </div>
        </div>

        <div className=" mt-20">
          <h1 ref={seeProduct} className=" font-bold md:text-3xl text-xl mb-5">
            Daftar Pelatihan yang Dibuka
          </h1>

          {products && products.length > 0 ? (
            <div className=" grid md:grid-cols-3 grid-cols-1 gap-10">
              {products.map((product) => (
                <CardProduct
                  key={product.id}
                  product={product}
                  showButton={false}
                />
              ))}
            </div>
          ) : (
            <div className=" text-center text-slate-400">
              ... Tidak ada pelatihan mendatang ...
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
