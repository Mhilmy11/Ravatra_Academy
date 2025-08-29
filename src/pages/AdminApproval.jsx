import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import RavatraLogo from "../assets/logo-ravatra-academy-nobg.png";

const AdminApproval = () => {
  const { id, userId } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalAction, setModalAction] = useState(null);
  const [resultMessage, setResultMessage] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://ravatraacademy.id/api/index.php?route=getTransaction&id=${id}&user_id=${userId}`
      )
      .then((res) => {
        if (res.data.success) {
          setTransaction(res.data.transaction);
        } else {
          setError(res.data.message || "Transaksi tidak ditemukan");
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, userId]);

  const handleConfirm = () => {
    if (modalAction === "approve") {
      axios
        .post("https://ravatraacademy.id/api/index.php?route=approvalPayment", {
          id,
          user_id: userId,
        })
        .then(() => {
          setResultMessage(
            "🎉 Yeay! Order ini telah di-approve dan package product sudah dikirim ke user."
          );
        })
        .catch((err) => {
          setError("Gagal approve: " + err.message);
        });
    } else if (modalAction === "reject") {
      axios
        .post("https://ravatraacademy.id/api/index.php?route=rejectPayment", {
          id,
          user_id: userId,
        })
        .then(() => {
          setResultMessage(
            "❌ Baik, status order ini telah Rejected. Tunggu customer melakukan validasi kembali melalui Customer Service."
          );
        })
        .catch((err) => {
          setError("Gagal reject: " + err.message);
        });
    }
    setModalAction(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  if (transaction.status === "PAID") {
    return (
      <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow text-center pt-32">
        <h1 className="text-2xl font-bold mb-4">STATUS ORDER</h1>
        <p className="text-lg text-green-600 font-semibold">
          🎉 Transaksi berhasil! Order sudah disetujui dan produk telah
          terbentuk.
        </p>
      </div>
    );
  }

  if (transaction.status === "REJECTED") {
    return (
      <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow text-center pt-32">
        <h1 className="text-2xl font-bold mb-4">STATUS ORDER</h1>
        <p className="text-lg text-red-600 font-semibold">
          ❌ Transaksi telah dibatalkan. Silakan hubungi Customer Service untuk
          bantuan lebih lanjut.
        </p>
      </div>
    );
  }

  if (resultMessage) {
    return (
      <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow text-center pt-32">
        <h1 className="text-2xl font-bold mb-4">STATUS ORDER</h1>
        <p className="text-lg">{resultMessage}</p>
      </div>
    );
  }

  if (transaction.status === "PENDING") {
    return (
      <div className="p-6 max-w-md mx-auto border bg-gradient-to-b from-blue-200 from-5% to-white to-90% border-slate-200 rounded-lg shadow relative md:mt-16">
        <div className="">
          <div>
            <p className=" text-center text-2xl font-bold mb-2">
              Detail Transaksi
            </p>
            <p className=" text-center text-lg font-semibold mb-5">
              Lakukan Konfirmasi pada Pesanan Berikut:
            </p>
          </div>

          <div className=" flex justify-between items-center border border-slate-400 rounded-xl px-3 py-4">
            <div className=" flex items-center gap-2">
              <img className=" w-14" src={RavatraLogo} alt="product-logo" />
              <p className=" font-semibold text-sm w-[250px]">
                {transaction.product_name}
              </p>
            </div>
            <p className=" font-semibold text-slate-400">1x</p>
          </div>

          <div className=" mt-8 px-3 flex flex-col gap-4">
            <div className=" flex justify-between items-center">
              <p className=" text-slate-500 text-sm font-semibold italic">
                User ID
              </p>
              <p className=" text-blue-900 font-semibold text-lg">
                {transaction.user_id}
              </p>
            </div>

            <div className=" flex justify-between items-center">
              <p className=" text-slate-500 text-sm font-semibold italic">
                Whatsapp
              </p>
              <p className=" text-blue-900 font-semibold text-lg">
                {transaction.phone}
              </p>
            </div>

            <div className=" flex justify-between items-center">
              <p className=" text-slate-500 text-sm font-semibold italic">
                Id Transaksi
              </p>
              <p className=" text-blue-900 font-semibold text-lg">
                {transaction.id}
              </p>
            </div>

            <div className=" flex justify-between items-center">
              <p className=" text-slate-500 text-sm font-semibold italic">
                Total Transaksi
              </p>
              <p className=" text-blue-900 font-semibold text-lg">
                {transaction.product_price}
              </p>
            </div>

            <div className=" flex justify-between items-center">
              <p className=" text-slate-500 text-sm font-semibold italic">
                Status
              </p>
              <p
                className={`px-2 rounded-lg text-white font-semibold text-lg ${
                  transaction.status === "PENDING"
                    ? "bg-blue-900"
                    : transaction.status === "PAID"
                    ? "bg-green-500"
                    : transaction.status === "REJECTED"
                    ? "bg-red-500"
                    : transaction.status === "EXPIRED"
                    ? "bg-gray-500"
                    : "bg-white"
                }`}
              >
                {transaction.status}
              </p>
            </div>

            <div className=" flex justify-between items-center">
              <p className=" text-slate-500 text-sm font-semibold italic">
                Batas Pembayaran
              </p>
              <p className=" text-red-500 font-semibold text-lg">
                {transaction.expired_at}
              </p>
            </div>
          </div>
        </div>

        <div className=" mt-10 flex items-center gap-4 justify-center">
          <button
            onClick={() => setModalAction("reject")}
            className=" py-2 cursor-pointer w-full bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold"
          >
            REJECT
          </button>

          <p className=" h-9 w-0.5 bg-slate-300"></p>

          <button
            onClick={() => setModalAction("approve")}
            className=" py-2 w-full cursor-pointer bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold"
          >
            APPROVE
          </button>
        </div>

        {modalAction && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
              <h2 className="text-xl font-semibold mb-4">
                Payment {modalAction === "approve" ? "Approval" : "Reject"}
              </h2>
              <p className="mb-4">
                Apakah Anda yakin ingin{" "}
                <span className="font-bold text-red-600">
                  {modalAction === "approve" ? "MENYETUJUI" : "MENOLAK"}
                </span>{" "}
                transaksi ini?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setModalAction(null)}
                  className="px-4 py-2 bg-gray-300 rounded-lg cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirm}
                  className={`px-4 py-2 rounded-lg text-white cursor-pointer ${
                    modalAction === "approve" ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  Ya, {modalAction === "approve" ? "Approve" : "Reject"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default AdminApproval;
