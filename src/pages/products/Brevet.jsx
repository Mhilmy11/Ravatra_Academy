import { AiOutlineLoading } from "react-icons/ai";
import { BiBookOpen, BiVideo } from "react-icons/bi";
import { RiComputerLine } from "react-icons/ri";
import HeroImage from "../../assets/hero-image.png";
import AboutImage from "../../assets/image-about-brevet.jpg";
import { useEffect, useState, useRef } from "react";
import axios from "../../services/axios";
import Container from "../../components/Container";
import CardProduct from "../../components/CardProduct";

export default function Brevet() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const seeProduct = useRef(null);

  const handleClickToProduct = () => {
    seeProduct.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/products", {
        params: {
          type: "BREVET",
        },
      });

      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const upcomingProducts = products.filter(
    (product) => product.start_date > today,
  );

  const pastProducts = products.filter(
    (product) => product.start_date <= today,
  );
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
          <h1 ref={seeProduct} className=" font-bold md:text-3xl text-xl mb-5">
            Daftar Pelatihan yang Dibuka
          </h1>

          {isLoading ? (
            <div className=" flex items-center justify-center gap-4">
              <div className=" animate-spin">
                <AiOutlineLoading />
              </div>
              <p className=" font-semibold">Loading...</p>
            </div>
          ) : upcomingProducts.length > 0 ? (
            <div className=" grid md:grid-cols-3 grid-cols-1 gap-10">
              {upcomingProducts.map((product) => (
                <CardProduct
                  key={product.product_code}
                  product={product}
                  type="brevet"
                />
              ))}
            </div>
          ) : (
            <div className=" text-center text-slate-400">
              ... Tidak ada pelatihan mendatang ...
            </div>
          )}
        </div>

        <div className=" mt-20">
          <h1 className=" font-bold md:text-3xl text-xl mb-5">
            Pelatihan Yang Sudah Dijalani
          </h1>

          {pastProducts.length > 0 ? (
            <div className=" grid md:grid-cols-3 grid-cols-1 gap-10">
              {pastProducts.map((product) => (
                <CardProduct
                  key={product.id}
                  product={product}
                  showButton={false}
                />
              ))}
            </div>
          ) : (
            <div className=" text-center text-slate-400">
              ... Belum ada pelatihan yang selesai ...
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
