import { motion } from "framer-motion";

export default function Card({ title, children }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition"
    >
      {title && (
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
      )}
      <div className="text-gray-600 dark:text-gray-300">
        {children}
      </div>
    </motion.div>
  );
}