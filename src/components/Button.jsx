import { motion } from "framer-motion";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  full = false,
}) {
  const base =
    "px-4 py-2 rounded-lg font-medium transition focus:outline-none";

  const styles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 dark:bg-gray-700 text-black dark:text-white",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      type={type}
      onClick={onClick}
      className={`${base} ${styles[variant]} ${full ? "w-full" : ""}`}
    >
      {children}
    </motion.button>
  );
}