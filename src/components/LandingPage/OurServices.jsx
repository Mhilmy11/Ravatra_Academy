import { TbCertificate } from "react-icons/tb";
import { GiTeamIdea } from "react-icons/gi";
import { RiTeamLine, RiUserSettingsLine } from "react-icons/ri";

export default function OurServices() {
  return (
    <div className=" my-16 md:my-24">
      <h1 className=" text-secondary md:text-xl text-lg font-bold text-center mb-4">
        PROGRAM UNGGULAN KAMI
      </h1>

      <h1 className=" md:text-4xl text-2xl font-bold text-center">
        Layanan Pelatihan Ravatra Academy
      </h1>

      <p className=" text-lg mt-6 text-slate-600 text-center md:px-24">
        Ravatra Academy menyediakan berbagai program pelatihan dan pengembangan
        yang dirancang untuk mendukung peningkatan kompetensi individu maupun
        perusahaan.
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
  );
}
