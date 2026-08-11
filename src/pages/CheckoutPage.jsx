import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiShoppingBag,
  FiUser,
  FiArrowRight,
  FiAlertCircle,
  FiCheck,
} from "react-icons/fi";

import api from "../services/axios";

export default function CheckoutPage() {
  const { checkoutToken } = useParams();

  const [checkout, setCheckout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showPayment, setShowPayment] = useState(false);
  const [paymentProof, setPaymentProof] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);

  useEffect(() => {
    const getCheckout = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/checkout/${checkoutToken}`);

        setCheckout(response.data.data);
      } catch (error) {
        console.error("Failed to fetch checkout:", error);

        const message =
          error.response?.data?.message ||
          "Checkout tidak dapat ditemukan atau sudah tidak tersedia.";

        setError(message);
      } finally {
        setLoading(false);
      }
    };

    if (checkoutToken) {
      getCheckout();
    }
  }, [checkoutToken]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(Number(price));
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  };

  const handlePaymentSubmit = async () => {
    if (!paymentProof) {
      setPaymentError("Silakan pilih bukti pembayaran terlebih dahulu.");
      return;
    }

    try {
      setPaymentLoading(true);
      setPaymentError("");

      const formData = new FormData();

      formData.append("payment_proof", paymentProof);

      const response = await api.post(
        `/checkout/${checkoutToken}/payment`,
        formData,
      );

      setPaymentResult(response.data.data);
      setPaymentSuccess(true);
    } catch (error) {
      console.error("Payment Error:", error);
      console.error("Response:", error.response?.data);

      setPaymentError(
        error.response?.data?.message || "Gagal mengirim bukti pembayaran.",
      );
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-sm text-gray-500">
            Memuat detail checkout...
          </p>
        </div>
      </div>
    );
  }

  if (error || !checkout) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto">
            <FiAlertCircle className="text-red-500 text-2xl" />
          </div>

          <h1 className="mt-5 text-xl font-semibold text-gray-900">
            Checkout Tidak Tersedia
          </h1>

          <p className="mt-2 text-sm text-gray-500 leading-6">
            {error || "Link checkout tidak valid atau sudah tidak tersedia."}
          </p>
        </div>
      </div>
    );
  }

  const { product, deal_price, notes, transaction_code, created_by } = checkout;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
              <FiShoppingBag className="text-white" />
            </div>

            <span className="text-lg font-bold text-gray-900">
              Ravatra Academy
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600 mb-2">CHECKOUT</p>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Selesaikan Pesanan Anda
          </h1>

          <p className="mt-2 text-gray-500">
            Periksa kembali detail pesanan sebelum melanjutkan pembayaran.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="aspect-[16/7] bg-gray-100">
                <img
                  src={product.thumbnail}
                  alt={product.slug}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-600">
                    {product.product_type.replaceAll("_", " ")}
                  </span>

                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                    {product.schedule}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900">
                  {product.product_name}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {product.product_code}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-7">
                  <div className="p-4 rounded-xl bg-gray-50">
                    <FiCalendar className="text-blue-600 mb-3" />

                    <p className="text-xs text-gray-500">Tanggal</p>

                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {formatDate(product.start_date)}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50">
                    <FiClock className="text-blue-600 mb-3" />

                    <p className="text-xs text-gray-500">Waktu</p>

                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {product.start_end_time}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50">
                    <FiMapPin className="text-blue-600 mb-3" />

                    <p className="text-xs text-gray-500">Lokasi</p>

                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {product.location}
                    </p>
                  </div>
                </div>

                {notes && (
                  <div className="mt-6 p-4 rounded-xl border border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">
                      Catatan
                    </p>

                    <p className="mt-2 text-sm text-gray-500 leading-6">
                      {notes}
                    </p>
                  </div>
                )}

                {created_by?.name && (
                  <div className="mt-5 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                      <FiUser className="text-gray-500" />
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Dibuat oleh</p>

                      <p className="text-sm font-medium text-gray-900">
                        {created_by.name}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 lg:sticky lg:top-6">
              <h2 className="text-lg font-bold text-gray-900">
                Ringkasan Pesanan
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between gap-4">
                  <span className="text-sm text-gray-500">Produk</span>

                  <span className="text-sm font-medium text-gray-900 text-right">
                    {product.product_name}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-sm text-gray-500">Harga</span>

                  <span className="text-sm font-medium text-gray-900">
                    {formatPrice(product.product_price)}
                  </span>
                </div>

                {Number(product.product_price) !== Number(deal_price) && (
                  <div className="flex justify-between gap-4">
                    <span className="text-sm text-gray-500">Harga khusus</span>

                    <span className="text-sm font-semibold text-green-600">
                      {formatPrice(deal_price)}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 my-6" />

              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">Total Pembayaran</p>

                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    {formatPrice(deal_price)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                disabled={showPayment === true}
                onClick={() => {
                  setShowPayment(true);
                  setPaymentError("");
                }}
                className="mt-6 w-full h-12 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 transition"
              >
                Lanjutkan Pembayaran
                <FiArrowRight />
              </button>

              <p className="mt-4 text-xs text-gray-400 text-center leading-5">
                Dengan melanjutkan, Anda akan diarahkan ke proses pembayaran.
              </p>

              <div className="mt-6 pt-5 border-t border-gray-100">
                <p className="text-xs text-gray-400">Kode Transaksi</p>

                <p className="mt-1 text-sm font-mono font-medium text-gray-700">
                  {transaction_code}
                </p>
              </div>
            </div>
          </div>
        </div>

        {showPayment && !paymentSuccess && (
          <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
            <div className="mb-6">
              <p className="text-sm font-medium text-blue-600">PEMBAYARAN</p>

              <h2 className="mt-1 text-xl font-bold text-gray-900">
                Lakukan Pembayaran
              </h2>

              <p className="mt-2 text-sm text-gray-500 leading-6">
                Silakan transfer sesuai nominal pembayaran ke rekening berikut,
                kemudian upload bukti pembayaran Anda.
              </p>
            </div>

            {/* Bank */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <p className="text-sm text-gray-500">Transfer ke</p>

              <p className="mt-2 text-lg font-bold text-gray-900">Bank BCA</p>

              <p className="mt-1 text-2xl font-bold tracking-wide text-gray-900">
                1234567890
              </p>

              <p className="mt-1 text-sm text-gray-500">a.n. Ravatra Academy</p>
            </div>

            {/* Total */}
            <div className="mt-5 flex items-center justify-between gap-4 rounded-xl bg-blue-50 border border-blue-100 p-4">
              <span className="text-sm font-medium text-gray-700">
                Total Pembayaran
              </span>

              <span className="text-xl font-bold text-blue-600">
                {formatPrice(deal_price)}
              </span>
            </div>

            {/* Upload */}
            <div className="mt-6">
              <label
                htmlFor="payment-proof"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Bukti Pembayaran
              </label>

              <input
                id="payment-proof"
                type="file"
                accept="image/jpeg,image/png,application/pdf"
                onChange={(event) => {
                  const file = event.target.files?.[0] || null;

                  setPaymentProof(file);
                  setPaymentError("");
                }}
                className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2.5 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-medium
          file:bg-blue-50 file:text-blue-600
          hover:file:bg-blue-100"
              />

              <p className="mt-2 text-xs text-gray-400">
                Format JPG, PNG, atau PDF. Maksimal 5 MB.
              </p>

              {paymentProof && (
                <div className="mt-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <p className="text-sm text-gray-700">File dipilih:</p>

                  <p className="mt-1 text-sm font-medium text-gray-900 break-all">
                    {paymentProof.name}
                  </p>
                </div>
              )}
            </div>

            {/* Error */}
            {paymentError && (
              <div className="mt-5 p-4 rounded-xl bg-red-50 border border-red-100">
                <p className="text-sm text-red-600">{paymentError}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="button"
              onClick={handlePaymentSubmit}
              disabled={!paymentProof || paymentLoading}
              className="mt-6 w-full h-12 rounded-xl
        bg-blue-600 hover:bg-blue-700
        disabled:bg-gray-300
        disabled:cursor-not-allowed
        text-white font-semibold
        flex items-center justify-center
        transition"
            >
              {paymentLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="ml-2">Mengirim Pembayaran...</span>
                </>
              ) : (
                "Konfirmasi Pembayaran"
              )}
            </button>
          </div>
        )}

        {paymentSuccess && (
          <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-50 flex items-center justify-center">
              <FiCheck className="text-3xl text-green-600" />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              Bukti Pembayaran Berhasil Dikirim
            </h2>

            <p className="mt-3 text-sm text-gray-500 leading-6 max-w-md mx-auto">
              Bukti pembayaran Anda telah berhasil dikirim dan sedang menunggu
              verifikasi dari admin.
            </p>

            {paymentResult?.transaction_code && (
              <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200 max-w-sm mx-auto">
                <p className="text-xs text-gray-500">Kode Transaksi</p>

                <p className="mt-1 font-mono font-semibold text-gray-900">
                  {paymentResult.transaction_code}
                </p>
              </div>
            )}

            <div className="mt-6 inline-flex items-center px-4 py-2 rounded-full bg-yellow-50 text-yellow-700 text-sm font-medium">
              Menunggu Verifikasi
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
