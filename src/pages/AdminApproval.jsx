import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

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
    setModalAction(null); // tutup modal
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  // ✅ Jika sudah ada pesan akhir, tampilkan pesan saja
  if (resultMessage) {
    return (
      <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow text-center pt-32">
        <h1 className="text-2xl font-bold mb-4">STATUS ORDER</h1>
        <p className="text-lg">{resultMessage}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-blue-200 rounded-lg shadow relative mt-24">
      <div className="">
        <p className=" text-center text-2xl font-bold mb-5">Detail Transaksi</p>

        <div>
          <p className=" italic text-xs text-yellow-500 text-center font-bold">
            Nama Product:
          </p>
          <p className=" text-center">{transaction.product_name}</p>
        </div>

        <div className=" flex justify-between pt-5">
          <div>
            <strong className=" italic text-xs text-yellow-500">
              ID Transaksi:
            </strong>
            <p>{transaction.id}</p>
          </div>
          <div>
            <strong className=" italic text-xs text-yellow-500">
              User ID:
            </strong>
            <p>{transaction.user_id}</p>
          </div>
        </div>

        <div className=" pt-3 flex justify-between items-center">
          <div>
            <p className=" text-yellow-500 font-bold text-xs italic">
              Harga Produk:
            </p>
            <p>{transaction.product_price}</p>
          </div>

          <div>
            <p className=" text-yellow-500 font-bold text-xs italic">
              Whatsapp:
            </p>
            <p>{transaction.phone}</p>
          </div>
        </div>

        <div className=" pt-5">
          <div>
            <p className=" text-green-600 font-bold text-xs italic">Status:</p>
            <p>{transaction.status}</p>
          </div>

          <div>
            <p className=" text-red-600 text-end font-bold text-xs italic">
              Batas Pembayaran:
            </p>
            <p className=" text-end">{transaction.expired_at}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => setModalAction("approve")}
          className="px-4 py-2 cursor-pointer bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold"
        >
          APPROVE
        </button>
        <button
          onClick={() => setModalAction("reject")}
          className="px-4 py-2 cursor-pointer bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold"
        >
          REJECT
        </button>
      </div>

      {/* Modal konfirmasi */}
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
};

export default AdminApproval;
