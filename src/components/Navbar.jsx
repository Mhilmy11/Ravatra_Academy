import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router";
import RavatraLogoNavbar from "../assets/logo-only-ravatra-academy-nobg.png";
import { useState } from "react";
import Container from "./Container";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isActiveMenu, setIsActiveMenu] = useState(false);

  const page = [
    { label: "Beranda", path: "/" },
    { label: "Regular Training", path: "/regulartraining" },
    { label: "Webinar", path: "/seminar" },
    { label: "Kursus", path: "/kursus" },
    { label: "e-Learning", path: "/elearning" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <Container>
        <div className=" flex justify-between items-center md:py-10 py-3 px-10">
          <div className=" flex items-center md:gap-3 gap-2">
            <img
              className=" md:w-16 w-10"
              src={RavatraLogoNavbar}
              alt="navbar-logo"
            />
            <div className=" text-center font-semibold text-yellow-500">
              <h1 className=" md:text-xl text-sm">RAVATRA</h1>
              <h1 className=" md:text-base text-xs">Academy</h1>
            </div>
          </div>

          <div className="md:flex md:gap-7 hidden">
            {page.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`pb-1 uppercase cursor-pointer hover:text-blue-900 transition-colors duration-300 ${
                  location.pathname === item.path
                    ? "text-secondary border-b-4 border-blue-950 font-bold"
                    : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className=" md:hidden">
            <button onClick={() => setIsActiveMenu(!isActiveMenu)}>
              <AiOutlineMenu size={30} />
            </button>
          </div>
        </div>
      </Container>

      {isActiveMenu && (
        <div className=" md:hidden flex justify-center font-semibold text-xs gap-3 py-2 w-full bg-yellow-500 mb-10">
          {page.map((item) => (
            <button
              className=" uppercase tracking-wider text-blue-950"
              onClick={() => handleNavigation(item.path)}
              key={item.path}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
