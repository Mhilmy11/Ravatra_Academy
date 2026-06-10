import Client1 from "../../assets/clients_assets/knu.webp";
import Client2 from "../../assets/clients_assets/kopsurindo.webp";
import Client3 from "../../assets/clients_assets/lds-group-black.webp";
import Client4 from "../../assets/clients_assets/logo-minori-300x136.webp";
import Client5 from "../../assets/clients_assets/nala.webp";
import Client6 from "../../assets/clients_assets/pialite.webp";
import Client7 from "../../assets/clients_assets/polyplex-logo.webp";
import Client8 from "../../assets/clients_assets/pt-anak-sehat-idaman-hati.webp";
import Client9 from "../../assets/clients_assets/pt-cataler-indonesia.webp";
import Client10 from "../../assets/clients_assets/pt-hybrid-power.webp";
import Client11 from "../../assets/clients_assets/pt-hyundai-elevator-indonesia.webp";
import Client12 from "../../assets/clients_assets/pt-nikawa-textile-industry.webp";
import Client13 from "../../assets/clients_assets/pt-penilai-harga-efek-indonesia-(PHEI).webp";
import Client14 from "../../assets/clients_assets/pt-sumbawa-timur.webp";
import Client15 from "../../assets/clients_assets/pt-vale-indonesia.webp";
import Client16 from "../../assets/clients_assets/tokopedia-pt-mastrada.webp";
import LazyImage from "../../shared/LazyImage";

const Clients = [
  {
    image: Client2,
    alt: "kopsurindo-image-client",
  },
  {
    image: Client6,
    alt: "pialite-image-client",
  },
  {
    image: Client7,
    alt: "polyplex-image-client",
  },
  {
    image: Client8,
    alt: "anak-sehat-idaman-hati-image-client",
  },
  {
    image: Client9,
    alt: "cataler-indonesia-image-client",
  },
  {
    image: Client10,
    alt: "hybrid-power-image-client",
  },
  {
    image: Client11,
    alt: "hyundai-elevator-indonesia-image-client",
  },
  {
    image: Client5,
    alt: "nala-image-client",
  },
  {
    image: Client14,
    alt: "sumbawa-timur-image-client",
  },
  {
    image: Client3,
    alt: "lds-group-image-client",
  },
  {
    image: Client4,
    alt: "minori-image-client",
  },
  {
    image: Client12,
    alt: "nikawa-textile-industry-image-client",
  },
  {
    image: Client13,
    alt: "penilai-harga-efek-indonesia-image-client",
  },
  {
    image: Client15,
    alt: "vale-indonesia-image-client",
  },
  {
    image: Client16,
    alt: "tokopedia-mastrada-image-client",
  },
  {
    image: Client1,
    alt: "knu-image-client",
  },
];

export default function OurClients() {
  return (
    <div>
      <div className=" flex justify-center">
        <h3 className=" md:text-4xl text-xl font-bold text-center md:w-[700px]">
          Bekerja sama dengan berbagai{" "}
          <span className=" text-secondary">Perusahaan Ternama</span> sebagai{" "}
          <span className=" text-secondary">Client</span> kami.
        </h3>
      </div>

      <div className=" grid grid-cols-2 md:grid-cols-8 place-items-center gap-y-10 md:gap-y-5 mt-10">
        {Clients.map((client, i) => (
          <div key={i}>
            <LazyImage className=" w-24" src={client.image} alt={client.alt} />
          </div>
        ))}
      </div>
    </div>
  );
}
