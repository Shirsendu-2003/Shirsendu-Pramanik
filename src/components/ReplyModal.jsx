import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ReplyModal({ open, onClose, onSend, email }) {
  const [subject, setSubject] = useState("Reply from Admin");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message) return alert("Message cannot be empty");

    try {
      setLoading(true);
      await onSend({ email, subject, message });
      setMessage("");
      onClose();
    } catch {
      alert("Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-md shadow-xl"
          >
            <h2 className="text-xl font-bold mb-4">Reply to {email}</h2>

            <input
              className="w-full mb-3 p-2 border rounded dark:bg-gray-800"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <textarea
              className="w-full mb-4 p-2 border rounded dark:bg-gray-800"
              rows="5"
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-3 py-1 bg-gray-400 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSend}
                disabled={loading}
                className="px-4 py-1 bg-blue-600 text-white rounded"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}