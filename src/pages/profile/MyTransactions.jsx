import { useEffect, useState } from "react";

import api from "../../services/axios";

export default function MyTransactions() {
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/account/transactions");

      if (response.data.success) {
        setTransactions(response.data.data || []);
      } else {
        setTransactions([]);
        setError(response.data.message || "Failed to load transactions.");
      }
    } catch (error) {
      console.error("TRANSACTIONS ERROR:", error.response?.data || error);

      setError(error.response?.data?.message || "Failed to load transactions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(value));
  };

  const formatDate = (value) => {
    if (!value) {
      return "-";
    }

    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(value));
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "PENDING":
        return "Pending";

      case "WAITING_APPROVAL":
        return "Waiting Approval";

      case "PAID":
        return "Paid";

      case "REJECTED":
        return "Rejected";

      default:
        return status;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "WAITING_APPROVAL":
        return "bg-orange-100 text-orange-700";

      case "PAID":
        return "bg-green-100 text-green-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const handleDetail = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleDownloadInvoice = (transaction) => {
    if (!transaction.invoice_path) {
      return;
    }

    window.open(transaction.invoice_path, "_blank");
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-slate-500">Loading transactions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-red-600">{error}</p>

        <button
          type="button"
          onClick={fetchTransactions}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      <div>
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-800">
            My Transactions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            View your transaction history and order information.
          </p>
        </div>

        {/* Empty State */}
        {transactions.length === 0 && (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800">
              No Transactions
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              You don't have any transactions yet.
            </p>
          </div>
        )}

        {/* Transaction List */}
        {transactions.length > 0 && (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
              >
                {/* Card Header */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Transaction Code
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {transaction.transaction_code}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                      transaction.status,
                    )}`}
                  >
                    {getStatusLabel(transaction.status)}
                  </span>
                </div>

                {/* Product */}
                <div className="mt-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Product
                  </p>

                  <h3 className="mt-1 text-lg font-semibold text-slate-800">
                    {transaction.product_name}
                  </h3>

                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                    {transaction.product_type}
                  </p>
                </div>

                {/* Information */}
                <div className="mt-5 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Transaction Date
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {formatDate(transaction.created_at)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      PRICE
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {formatCurrency(transaction.deal_price)}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                {(transaction.status === "PAID" ||
                  transaction.status === "REJECTED") && (
                  <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={() => handleDetail(transaction)}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
                    >
                      Detail Order
                    </button>

                    {transaction.status === "PAID" &&
                      transaction.invoice_number &&
                      transaction.invoice_path && (
                        <button
                          type="button"
                          onClick={() => handleDownloadInvoice(transaction)}
                          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
                        >
                          Download Invoice
                        </button>
                      )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Order Detail
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {selectedTransaction.transaction_code}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTransaction(null)}
                className="rounded-lg px-2 py-1 text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-5 px-5 py-6 sm:px-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Product
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {selectedTransaction.product_name}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Product Type
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {selectedTransaction.product_type}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Transaction Code
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {selectedTransaction.transaction_code}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Transaction Date
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {formatDate(selectedTransaction.created_at)}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Total
                </p>

                <p className="mt-1 text-base font-semibold text-slate-800">
                  {formatCurrency(selectedTransaction.deal_price)}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Status
                </p>

                <span
                  className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                    selectedTransaction.status,
                  )}`}
                >
                  {getStatusLabel(selectedTransaction.status)}
                </span>
              </div>

              {/* Reject Reason */}
              {selectedTransaction.status === "REJECTED" &&
                selectedTransaction.reject_reason && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-red-500">
                      Reject Reason
                    </p>

                    <p className="mt-1 text-sm text-red-700">
                      {selectedTransaction.reject_reason}
                    </p>
                  </div>
                )}

              {/* Invoice */}
              {selectedTransaction.invoice_number && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Invoice Number
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {selectedTransaction.invoice_number}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-slate-200 px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={() => setSelectedTransaction(null)}
                className="w-full rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
