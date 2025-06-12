import { useState } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function ConfirmActionToast({ 
  toastInstance, 
  title = "Are you sure?", 
  message = "This action cannot be undone.", 
  confirmText = "Confirm", 
  cancelText = "Cancel",
  onConfirm, 
  onCancel 
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    setLoading(true);
    setError("");
    try {
      await onConfirm();
      toast.dismiss(toastInstance.id);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 16 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: 16 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="p-5 w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-200"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-3">{message}</p>

      {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

      <div className="flex gap-3 justify-end">
        <button
          onClick={() => {
            toast.dismiss(toastInstance.id);
            onCancel && onCancel();
          }}
          disabled={loading}
          className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
        >
          {cancelText}
        </button>
        <button
          onClick={handleConfirm}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition ${
            loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading ? "Processing..." : confirmText}
        </button>
      </div>
    </motion.div>
  );
}
