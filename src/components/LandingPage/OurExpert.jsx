import Team01 from "../../assets/teams-assets/team01.webp";
import Team02 from "../../assets/teams-assets/team02.webp";
import Team04 from "../../assets/teams-assets/team04.webp";
import Team05 from "../../assets/teams-assets/team05.webp";
import LazyImage from "../../shared/LazyImage";

const teams = [
  {
    name: "Rahmad Adam",
    role: "MANAGING PARTNER",
    image: Team01,
  },
  {
    name: "Rheza Siswa Wiguna",
    role: "TAX PARTNER",
    image: Team02,
  },
  {
    name: "Nofiah Mahdayani",
    role: "ACCOUNT EXECUTIVE",
    image: Team04,
  },
  {
    name: "Sofie",
    role: "ACCOUNT EXECUTIVE",
    image: Team05,
  },
];

export default function OurExpert() {
  return (
    <div className=" my-16 md:my-24">
      <h3 className=" md:text-5xl text-3xl font-semibold mb-14">Tim Kami</h3>

      <div className=" grid grid-cols-1 md:grid-cols-4 justify-items-center space-y-5">
        {teams.map((team, i) => (
          <div key={i}>
            <LazyImage
              className=" w-48 mb-2 bg-yellow-500 rounded-full"
              src={team.image}
              alt={team.name}
            />
            <div className=" text-center">
              <p className=" text-lg font-semibold">{team.name}</p>
              <p className=" text-sm text-blue-800">{team.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
