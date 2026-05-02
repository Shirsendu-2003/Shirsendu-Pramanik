import Card from "../components/Card";
import { motion } from "framer-motion";

export default function Projects() {
  const projects = [
    {
      title: "Pizza Bill Generator",
      desc: "Java OOP-based console application demonstrating clean architecture.",
      tech: ["Java", "OOP"],
      live: "https://html-starter-pi-rust-47.vercel.app/",
      github: "https://github.com/Shirsendu-2003",
      image: "/pizza.jpeg" // put image in public/
    },
    {
      title: "Leave Management System",
      desc: "Full-stack React + Spring Boot app with JWT authentication and role-based access.",
      tech: ["React", "Spring Boot", "JWT"],
      live: "https://lms-frontend-kappa-fawn.vercel.app",
      github: "https://github.com/Shirsendu-2003",
      image: "/LMS.jpeg"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4">

      <h2 className="text-3xl font-bold mb-8 text-center">
        My Projects
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {projects.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <Card>

              {/* IMAGE */}
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />

              {/* TITLE */}
              <h3 className="text-lg font-semibold">
                {p.title}
              </h3>

              {/* DESC */}
              <p className="text-sm text-gray-500 mt-2">
                {p.desc}
              </p>

              {/* TECH */}
              <div className="flex flex-wrap gap-2 mt-3">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* LINKS */}
              <div className="flex gap-3 mt-4">

                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-500 text-sm font-medium hover:underline"
                  >
                    Live
                  </a>
                )}

                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 text-sm font-medium hover:underline"
                >
                  GitHub
                </a>

              </div>

            </Card>
          </motion.div>
        ))}

      </div>
    </div>
  );
}