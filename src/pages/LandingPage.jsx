import { BsWhatsapp } from "react-icons/bs";
import { AiOutlineArrowDown } from "react-icons/ai";
import { TbCertificate } from "react-icons/tb";
import { GiTeamIdea } from "react-icons/gi";
import { RiTeamLine, RiUserSettingsLine } from "react-icons/ri";

import { useRef } from "react";
import { useNavigate } from "react-router";

import Container from "../components/Container";
import HeroImage from "../assets/landing-page-image.png";
import ImageAbout from "../assets/image-about-section.png";

import Team01 from "../assets/teams-assets/team01.png";
import Team02 from "../assets/teams-assets/team02.png";
import Team03 from "../assets/teams-assets/team03.jpg";
import Team04 from "../assets/teams-assets/team04.jpg";
import Team05 from "../assets/teams-assets/team05.jpg";

import NalaExplorer from "../assets/clients_assets/nala.png";
import Knu from "../assets/clients_assets/Knu.jpg";
import LdsGroup from "../assets/clients_assets/lds-group-black.png";
import Minori from "../assets/clients_assets/logo-minori-300x136.webp";
import Polyplex from "../assets/clients_assets/polyplex-logo.jpg";
import AnakSehat from "../assets/clients_assets/pt-anak-sehat-idaman-hati.png";
import Cataler from "../assets/clients_assets/pt-cataler-indonesia.png";
import Hybrid from "../assets/clients_assets/pt-hybrid-power.png";
import Hyundai from "../assets/clients_assets/pt-hyundai-elevator-indonesia.jpeg";
import Nikawa from "../assets/clients_assets/pt-nikawa-textile-industry.png";
import Penilai from "../assets/clients_assets/pt-penilai-harga-efek-indonesia-(PHEI).jpeg";
import Sumbawa from "../assets/clients_assets/pt-sumbawa-timur.jpeg";
import Vale from "../assets/clients_assets/pt-vale-indonesia.png";
import Mastrada from "../assets/clients_assets/tokopedia-pt-mastrada.png";
import Kopsurindo from "../assets/clients_assets/kopsurindo.png";
import Pialite from "../assets/clients_assets/pialite.jpg";

export default function LandingPage() {
  const seeProduct = useRef(null);
  const navigate = useNavigate();

  const openLink = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleClickToProduct = () => {
    seeProduct.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className=" w-full my-10">
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

      <div className=" flex justify-center mb-20">
        <img src={HeroImage} alt="hero-image-page" />
      </div>

      <div className=" bg-yellow-500 text-white">
        <Container>
          <div className=" mx-20 py-10 md:flex items-start gap-20">
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

              <div className=" mt-7 md:flex gap-4 md:text-xl font-semibold">
                <button
                  onClick={handleClickToProduct}
                  className=" md:mb-0 mb-3 cursor-pointer hover:bg-blue-950 hover:border-blue-950 hover:text-yellow-400 transition flex gap-2 items-center border-2 rounded-xl py-3 px-4"
                >
                  Lihat Program <AiOutlineArrowDown size={25} />
                </button>
                <button
                  onClick={() => openLink("https://wa.me/6281214277869")}
                  className=" cursor-pointer hover:bg-green-600 hover:text-white transition flex items-center gap-2 bg-white text-black rounded-xl py-3 px-4"
                >
                  <BsWhatsapp size={25} /> Hubungi Kami
                </button>
              </div>
            </div>

            <img
              className=" rounded-2xl md:block hidden"
              src={ImageAbout}
              alt="image-about-section"
            />
          </div>
        </Container>
      </div>

      <Container>
        <div className=" md:mx-20 mx-8">
          <div className=" my-32">
            <h3 className=" md:text-5xl text-3xl font-semibold mb-14">
              Tim Kami
            </h3>

            <div className=" flex justify-center gap-20 mb-14">
              <div className=" font-semibold md:text-sm text-xs">
                <div className=" flex justify-center w-full">
                  <img
                    className=" w-48 mb-2 bg-yellow-500 rounded-full"
                    src={Team01}
                    alt="asset-team01"
                  />
                </div>
                <p className=" text-center">Rahmad Adam,</p>
                <p>S.E., M.AK., AK., CA, CPA, BKP, CMT BNSP</p>
              </div>

              <div className=" font-semibold md:text-sm text-xs">
                <div className=" flex justify-center w-full">
                  <img
                    className=" w-48 mb-2 bg-yellow-500 rounded-full"
                    src={Team02}
                    alt="asset-team02"
                  />
                </div>
                <p className=" text-center">Rheza Siswa Wiguna,</p>
                <p>S.Sos, CT, CMT, CPEC, CHt, CMEHt, CCEHt, BKP</p>
              </div>
            </div>

            <div className=" flex justify-center gap-20">
              <div className=" font-semibold text-sm">
                <div className=" flex justify-center w-full">
                  <img
                    className=" w-48 mb-2 bg-yellow-500 rounded-full"
                    src={Team03}
                    alt="asset-team03"
                  />
                </div>
                <p className=" text-center">Yetti Verdiani</p>
                <p className=" text-secondary font-bold">
                  BUSINESS DEVELOPMENT MANAGER
                </p>
              </div>

              <div className=" font-semibold text-sm">
                <div className=" flex justify-center w-full">
                  <img
                    className=" w-48 mb-2 bg-yellow-500 rounded-full"
                    src={Team04}
                    alt="asset-team04"
                  />
                </div>
                <p className=" text-center">Nofiah Mahdayani</p>
                <p className=" text-secondary font-bold text-center">
                  ACCOUNT EXECUTIVE
                </p>
              </div>

              <div className=" font-semibold text-sm">
                <div className=" flex justify-center w-full">
                  <img
                    className=" w-48 mb-2 bg-yellow-500 rounded-full"
                    src={Team05}
                    alt="asset-team05"
                  />
                </div>
                <p className=" text-center">Sofie</p>
                <p className=" text-secondary font-bold text-center">
                  ACCOUNT EXECUTIVE
                </p>
              </div>
            </div>
          </div>

          <div className=" my-40">
            <h1 className=" text-secondary md:text-xl text-lg font-bold text-center mb-4">
              PROGRAM UNGGULAN KAMI
            </h1>

            <h1 className=" md:text-4xl text-2xl font-bold text-center">
              Layanan Pelatihan Ravatra Academy
            </h1>

            <p className=" text-lg mt-6 text-slate-600 text-center md:px-24">
              Ravatra Academy menyediakan berbagai program pelatihan dan
              pengembangan yang dirancang untuk mendukung peningkatan kompetensi
              individu maupun perusahaan.
            </p>

            <div className=" md:flex md:gap-10 grid grid-cols-2 gap-y-5 mt-20">
              <div>
                <div className=" text-secondary w-full flex justify-center">
                  <div className=" bg-gradient-to-b from-yellow-500 p-5 rounded-full">
                    <RiUserSettingsLine size={60} />
                  </div>
                </div>

                <div>
                  <p className=" text-center text-xl mt-5">
                    Tenaga Pengajar Profesional untuk{" "}
                    <span className=" text-secondary font-semibold">
                      mendukung karir Anda berkembang.
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <div className=" text-secondary w-full flex justify-center">
                  <div className=" bg-gradient-to-b from-yellow-500 p-5 rounded-full">
                    <RiTeamLine size={60} />
                  </div>
                </div>

                <div>
                  <p className=" text-center text-xl mt-5">
                    <span className=" text-secondary font-semibold">
                      Materi Aplikatif & Relevan
                    </span>{" "}
                    dengan studi kasus terkini industri.
                  </p>
                </div>
              </div>

              <div>
                <div className=" text-secondary w-full flex justify-center">
                  <div className=" bg-gradient-to-b from-yellow-500 p-5 rounded-full">
                    <GiTeamIdea size={60} />
                  </div>
                </div>

                <div>
                  <p className=" text-center text-xl mt-5">
                    <span className=" text-secondary font-semibold">
                      Pendekatan Interaktif
                    </span>{" "}
                    untuk pengalaman belajar lebih efektif.
                  </p>
                </div>
              </div>

              <div>
                <div className=" text-secondary w-full flex justify-center">
                  <div className=" bg-gradient-to-b from-yellow-500 p-5 rounded-full">
                    <TbCertificate size={60} />
                  </div>
                </div>

                <div>
                  <p className=" text-center text-xl mt-5">
                    <span className=" font-semibold text-secondary">
                      Fleksibilitas Program
                    </span>{" "}
                    demi kenyamanan belajar dan pengembangan karir.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className=" my-40">
            <h1 ref={seeProduct} className=" md:text-4xl text-xl font-bold">
              Pilihan Pelatihan{" "}
              <span className=" text-secondary underline">Ravatra Academy</span>
            </h1>

            <div className=" snap-x overflow-x-auto flex gap-6 scroll-smooth scroll-hide py-10 px-10 rounded-xl">
              <div className=" snap-start shrink-0 scroll-ml-5 bg-white w-[320px] rounded-xl p-4 shadow-lg shadow-blue-300">
                <img
                  className=" w-[300px] rounded-lg"
                  src={ImageAbout}
                  alt=""
                />

                <h2 className=" font-bold text-xl py-6">Regular Training</h2>

                <div className=" pt-3">
                  <div className=" flex gap-1">
                    <p className=" border w-fit px-3 py-2 rounded-full text-sm">
                      Offline
                    </p>
                    <p className=" border w-fit px-3 py-2 rounded-full text-sm">
                      Full-time
                    </p>
                    <p className=" border w-fit px-3 py-2 rounded-full text-sm">
                      1-2 Hari
                    </p>
                  </div>

                  <p className=" text-sm py-4">
                    Kelas terjadwal dengan kurikulum komprehensif yang dapat
                    diikuti secara rutin untuk pengembangan karir.
                  </p>
                </div>

                <div className=" pt-2 text-lg font-semibold">
                  <button
                    onClick={() => openLink("https://wa.me/6281214277869")}
                    className=" cursor-pointer flex gap-4 items-center justify-center py-3 text-white rounded-lg bg-green-500 hover:bg-green-400 transition w-full"
                  >
                    <BsWhatsapp /> Hubungi Kami
                  </button>
                  <button
                    onClick={() => navigate("/regulartraining")}
                    className=" cursor-pointer flex gap-4 items-center justify-center w-full rounded-lg py-3 border-2 border-slate-300 hover:border-blue-900 transition mt-2"
                  >
                    Lihat Pelatihan Detail
                  </button>
                </div>
              </div>

              <div className=" snap-start shrink-0 bg-white w-[320px] rounded-xl p-4 shadow-lg shadow-blue-300">
                <img
                  className=" w-[300px] rounded-lg"
                  src={ImageAbout}
                  alt=""
                />

                <h2 className=" font-bold text-xl py-6">Webinar</h2>

                <div className=" pt-3">
                  <div className=" flex gap-1">
                    <p className=" border w-fit px-3 py-2 rounded-full text-sm">
                      Online
                    </p>
                    <p className=" border w-fit px-3 py-2 rounded-full text-sm">
                      Half-time
                    </p>
                    <p className=" border w-fit px-3 py-2 rounded-full text-sm">
                      1 Hari
                    </p>
                  </div>

                  <p className=" text-sm py-4">
                    Sesi berbagi ilmu terkini dari para pakar industri,
                    sekaligus forum diskusi yang interaktif.
                  </p>
                </div>

                <div className=" pt-2 text-lg font-semibold">
                  <button
                    onClick={() => openLink("https://wa.me/6281214277869")}
                    className=" cursor-pointer flex gap-4 items-center justify-center py-3 text-white rounded-lg bg-green-500 hover:bg-green-400 transition w-full"
                  >
                    <BsWhatsapp /> Hubungi Kami
                  </button>
                  <button
                    onClick={() => navigate("/seminar")}
                    className=" cursor-pointer flex gap-4 items-center justify-center w-full rounded-lg py-3 border-2 border-slate-300 hover:border-blue-900 transition mt-2"
                  >
                    Lihat Pelatihan Detail
                  </button>
                </div>
              </div>

              <div className=" snap-start shrink-0 bg-white w-[320px] rounded-xl p-4 shadow-lg shadow-blue-300">
                <img
                  className=" w-[300px] rounded-lg"
                  src={ImageAbout}
                  alt=""
                />

                <h2 className=" font-bold text-xl py-6">Kursus</h2>

                <div className=" pt-3">
                  <div className=" flex gap-1">
                    <p className=" border w-fit px-3 py-2 rounded-full text-sm">
                      Offline
                    </p>
                    <p className=" border w-fit px-3 py-2 rounded-full text-sm">
                      Full-time
                    </p>
                    <p className=" border w-fit px-3 py-2 rounded-full text-sm">
                      1-2 Hari
                    </p>
                  </div>

                  <p className=" text-sm py-4">
                    Program pembelajaran intensif untuk meningkatkan kompetensi
                    dalam bidang tertentu
                  </p>
                </div>

                <div className=" pt-2 text-lg font-semibold">
                  <button
                    onClick={() => openLink("https://wa.me/6281214277869")}
                    className=" cursor-pointer flex gap-4 items-center justify-center py-3 text-white rounded-lg bg-green-500 hover:bg-green-400 transition w-full"
                  >
                    <BsWhatsapp /> Hubungi Kami
                  </button>
                  <button
                    onClick={() => navigate("/kursus")}
                    className=" cursor-pointer flex gap-4 items-center justify-center w-full rounded-lg py-3 border-2 border-slate-300 hover:border-blue-900 transition mt-2"
                  >
                    Lihat Pelatihan Detail
                  </button>
                </div>
              </div>

              <div className=" snap-start shrink-0 bg-white w-[320px] rounded-xl p-4 shadow-lg shadow-blue-300">
                <img
                  className=" w-[300px] rounded-lg"
                  src={ImageAbout}
                  alt=""
                />

                <h2 className=" font-bold text-xl py-6">e Learning</h2>

                <div className=" pt-3">
                  <div className=" flex gap-1">
                    <p className=" border w-fit px-3 py-2 rounded-full text-sm">
                      Online
                    </p>
                    <p className=" border w-fit px-3 py-2 rounded-full text-sm">
                      Full-time
                    </p>
                    <p className=" border w-fit px-3 py-2 rounded-full text-sm">
                      14 Hari
                    </p>
                  </div>

                  <p className=" text-sm py-4">
                    Program khusus yang dirancang sesuai kebutuhan spesifik
                    perusahaan Anda untuk hasil optimal.
                  </p>
                </div>

                <div className=" pt-2 text-lg font-semibold">
                  <button
                    onClick={() => openLink("https://wa.me/6281214277869")}
                    className=" cursor-pointer flex gap-4 items-center justify-center py-3 text-white rounded-lg bg-green-500 hover:bg-green-400 transition w-full"
                  >
                    <BsWhatsapp /> Hubungi Kami
                  </button>
                  <button
                    onClick={() => navigate("/elearning")}
                    className=" cursor-pointer flex gap-4 items-center justify-center w-full rounded-lg py-3 border-2 border-slate-300 hover:border-blue-900 transition mt-2"
                  >
                    Lihat Pelatihan Detail
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className=" flex justify-center">
              <h3 className=" md:text-4xl text-xl font-bold text-center md:w-[700px]">
                Bekerja sama dengan berbagai{" "}
                <span className=" text-secondary">Perusahaan Ternama</span>{" "}
                sebagai <span className=" text-secondary">Client</span> kami.
              </h3>
            </div>

            <div className=" mt-16 marquee-container">
              <div className=" gap-10 marquee">
                <img
                  className="w-32 object-contain bg-black rounded-2xl p-2"
                  src={NalaExplorer}
                  alt="NalaExplorer-image-client"
                />
                <img
                  className="w-32 object-contain"
                  src={LdsGroup}
                  alt="LdsGroup-image-client"
                />
                <img
                  className="w-32 object-contain"
                  src={Minori}
                  alt="Minori-image-client"
                />
                <img
                  className="w-32 object-contain"
                  src={AnakSehat}
                  alt="AnakSehat-image-client"
                />
                <img
                  className="w-32 object-contain"
                  src={Cataler}
                  alt="Cataler-image-client"
                />
                <img
                  className="w-[150px] object-contain"
                  src={Kopsurindo}
                  alt="Kopsurindo-image-client"
                />
                <img
                  className="w-32 object-contain"
                  src={Hybrid}
                  alt="Hybrid-image-client"
                />
                <img
                  className="w-32 object-contain"
                  src={Hyundai}
                  alt="Hyundai-image-client"
                />
                <img
                  className="w-32 object-contain"
                  src={Polyplex}
                  alt="Polyplex-image-client"
                />
                <img
                  className="w-32 object-contain"
                  src={Penilai}
                  alt="Penilai-image-client"
                />
                <img
                  className="w-32 object-contain"
                  src={Sumbawa}
                  alt="Sumbawa-image-client"
                />
                <img
                  className="w-32 object-contain"
                  src={Vale}
                  alt="Vale-image-client"
                />
                <img
                  className="w-32 object-contain"
                  src={Mastrada}
                  alt="Mastrada-image-client"
                />
                <img
                  className="w-32 object-contain"
                  src={Knu}
                  alt="Knu-image-client"
                />
                <img
                  className="w-32 object-contain"
                  src={Nikawa}
                  alt="Nikawa-image-client"
                />
                <img
                  className="w-32 object-contain"
                  src={Pialite}
                  alt="pialite-image-client"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
