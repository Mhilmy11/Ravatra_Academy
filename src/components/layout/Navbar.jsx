import { useNavigate, useLocation } from "react-router";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import RavatraLogoNavbar from "../../assets/logo-only-ravatra-academy-nobg.webp";

import Container from "../Container";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();

  const [isActiveMenu, setIsActiveMenu] = useState(false);

  const page = [
    { label: "Beranda", path: "/" },
    { label: "Regular Training", path: "/products/regular-training" },
    { label: "Brevet", path: "/products/brevet" },
    { label: "Webinar", path: "/products/seminar" },
    { label: "Kursus", path: "/products/kursus" },
    { label: "e-Learning", path: "/products/elearning" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleProfileNavigation = () => {
    navigate("/profile");
    setIsActiveMenu(false);
  };

  const handleLoginNavigation = () => {
    navigate("/login");
    setIsActiveMenu(false);
  };

  const handleRegisterNavigation = () => {
    navigate("/register");
    setIsActiveMenu(false);
  };

  return (
    <>
      <Container>
        <div className="flex items-center justify-between px-10 py-3 md:py-10">
          <div className="flex items-center gap-2 md:gap-3">
            <img
              className="w-10 md:w-16"
              src={RavatraLogoNavbar}
              alt="navbar-logo"
            />

            <div className="text-center font-semibold text-yellow-500">
              <h1 className="text-sm md:text-xl">RAVATRA</h1>
              <h1 className="text-xs md:text-base">Academy</h1>
            </div>
          </div>

          <div className="hidden items-center gap-7 md:flex">
            {page.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`cursor-pointer pb-1 uppercase transition-colors duration-300 hover:text-blue-900 ${
                  location.pathname === item.path
                    ? "border-b-4 border-blue-950 font-bold text-secondary"
                    : ""
                }`}
              >
                {item.label}
              </button>
            ))}

            {!loading &&
              (user ? (
                <button
                  type="button"
                  onClick={handleProfileNavigation}
                  aria-label="Profile"
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-950 text-white transition-colors duration-300 hover:bg-blue-900"
                >
                  {user.firstname?.charAt(0)}
                  {user.lastname?.charAt(0)}
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleRegisterNavigation}
                    className="cursor-pointer rounded-lg bg-yellow-500 px-5 py-2.5 text-sm font-semibold transition-colors duration-300 hover:bg-yellow-300"
                  >
                    Register
                  </button>

                  <button
                    type="button"
                    onClick={handleLoginNavigation}
                    className="cursor-pointer rounded-lg bg-blue-950 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-blue-900"
                  >
                    Login
                  </button>
                </>
              ))}
          </div>

          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsActiveMenu(!isActiveMenu)}
              aria-label="Toggle menu"
            >
              <AiOutlineMenu size={30} />
            </button>
          </div>
        </div>
      </Container>

      {isActiveMenu && (
        <div className="mb-10 flex w-full flex-col items-center gap-4 bg-yellow-500 py-4 font-semibold text-xs md:hidden">
          {page.map((item) => (
            <button
              type="button"
              className="tracking-wider text-blue-950"
              onClick={() => handleNavigation(item.path)}
              key={item.path}
            >
              {item.label}
            </button>
          ))}

          {!loading &&
            (user ? (
              <button
                type="button"
                onClick={handleProfileNavigation}
                className="flex items-center gap-2 tracking-wider text-blue-950"
              >
                <AiOutlineUser size={18} />
                <span>PROFILE</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleLoginNavigation}
                className="tracking-wider text-blue-950"
              >
                LOGIN
              </button>
            ))}
        </div>
      )}
    </>
  );
}
