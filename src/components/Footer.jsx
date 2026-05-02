export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-400 text-center py-4 mt-10">
      <p className="text-sm">
        © {new Date().getFullYear()} Shirsendu Pramanik
      </p>
      <p className="text-xs mt-1">
        Built with React + Spring Boot
      </p>
    </footer>
  );
}