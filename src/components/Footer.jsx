import { BsInstagram } from "react-icons/bs";
import { SlSocialFacebook } from "react-icons/sl";
import { SlSocialLinkedin } from "react-icons/sl";
import LogoRavatra from "../assets/logo-only-ravatra-academy-nobg.png";
import { useNavigate } from "react-router";
import { useState } from "react";
import Container from "./Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("/");
  const page = [
    { label: "Beranda", path: "/" },
    { label: "Regular Training", path: "/regulartraining" },
    // { label: "In-House Training", path: "/inhousetraining" },
    { label: "Seminar", path: "/seminar" },
    // { label: "Kursus", path: "/kursus" },
  ];

  const handleNavigation = (path) => {
    setActivePage(path);
    navigate(path);
  };
  return (
    <>
      <div className=" px-20 py-12 bg-secondary mt-20">
        <Container>
          <div>
            <div className=" flex gap-2">
              <img className="w-16" src={LogoRavatra} alt="footer-logo" />
              <div className=" font-semibold text-yellow-500">
                <h1 className=" text-lg">RAVATRA</h1>
                <h1 className=" text-center text-xs">Academy</h1>
              </div>
            </div>

            <p className=" text-white md:w-[415px] pt-5">
              Meningkatkan keahlian pajak Anda dengan pelatihan berbasis praktik
              dan mentor berpengalaman.
            </p>

            <div className=" md:flex md:w-full w-36 gap-8 font-semibold text-white pt-8">
              {page.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={` cursor-pointer text-left hover:text-gray-500 transition-colors duration-300`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className=" h-0.5 bg-white w-full rounded-lg mt-16"></div>

          <div className=" md:flex md:justify-between items-center text-white pt-8">
            <p className=" md:text-base text-xs md:mb-0 mb-5">
              © {currentYear} Ravatra Academy. All Rights Reserved.
            </p>
            <div className=" flex gap-6 items-center">
              <SlSocialLinkedin size={24} />
              <BsInstagram size={24} />
              <SlSocialFacebook size={24} />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
