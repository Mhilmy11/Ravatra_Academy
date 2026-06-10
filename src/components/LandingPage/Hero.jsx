import HeroImage from "../../assets/landing-page-image.webp";
import HeroImageMobile from "../../assets/landing-page-image-mobile.webp";

export default function Hero() {
  return (
    <>
      <div className=" w-full mb-10">
        <div className=" text-center font-semibold md:text-3xl">
          <h1 className=" md:text-5xl text-xl font-bold mb-3">
            Hi! Kami <span className=" text-yellow-500">Ravatra Academy</span>
          </h1>
          <p className=" text-secondary">
            "Menjadi salah satu lembaga pendidikan
          </p>
          <p className=" text-secondary">pajak terbaik di Indonesia."</p>
        </div>
      </div>

      <div className=" place-items-center mb-20">
        <img
          className=" hidden md:block w-[1000px]"
          src={HeroImage}
          alt="hero-image-page"
        />
        <img
          className=" w-[425px] md:hidden block"
          src={HeroImageMobile}
          alt="hero-image-page"
        />
      </div>
    </>
  );
}
