import { motion } from "framer-motion";
import profile from "../assets/images/Photos.jpeg";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useEffect } from "react";
import { addView } from "../services/statsService"; // ✅ use service

export default function Home() {

  // ✅ VIEW TRACKING (session-based, no refresh spam)
  useEffect(() => {
    const viewed = sessionStorage.getItem("home_viewed");

    if (!viewed) {
      addView("home").catch(err => console.error(err));
      sessionStorage.setItem("home_viewed", "true");
    }
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between">
        
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Hi, I'm <span className="text-blue-500">Shirsendu</span>
          </h1>

          <h2 className="text-xl md:text-2xl mt-3 text-gray-600 dark:text-gray-300">
            Full Stack Developer (Java + React)
          </h2>

          <p className="mt-4 max-w-lg text-gray-500">
            I build secure, scalable web applications using Spring Boot and React.
            Passionate about clean architecture and real-world systems.
          </p>

          {/* BUTTONS */}
          <div className="mt-6 flex gap-4">
            <a href="/projects">
              <button className="bg-blue-600 px-5 py-2 rounded-lg text-white hover:bg-blue-700">
                View Projects
              </button>
            </a>

            <a href="/Shirsendu Pramanik.pdf" download>
              <button className="border px-5 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800">
                Download Resume
              </button>
            </a>
          </div>

          {/* SOCIAL */}
          <div className="flex gap-4 mt-5 text-2xl">
            <a href="https://github.com/Shirsendu-2003" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/shirsendu-pramanik-085151248" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.img
          src={profile}
          alt="profile"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-40 h-40 md:w-60 md:h-60 rounded-full object-cover mt-8 md:mt-0 shadow-lg"
        />
      </section>

      {/* SKILLS */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-4">Skills</h2>

        <div className="flex flex-wrap gap-3">
          {["Java", "Spring Boot", "React", "JWT", "PostgreSQL", "Git"].map(skill => (
            <span
              key={skill}
              className="px-4 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-4">Featured Projects</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg">Leave Management System</h3>
            <p className="text-sm text-gray-500 mt-2">
              React + Spring Boot system with JWT authentication and role-based access.
            </p>
          </div>

          <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg">Pizza Bill Generator</h3>
            <p className="text-sm text-gray-500 mt-2">
              Java OOP console application demonstrating clean architecture.
            </p>
          </div>
        </div>
      </section>

      {/* WORK EXPERIENCE */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-4">Work Experience</h2>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">

          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h3 className="text-lg font-semibold">
                Java Developer Intern
              </h3>

              <p className="text-gray-600 dark:text-gray-300">
                Internship Studio
              </p>
            </div>

            <p className="text-sm text-gray-500 mt-2 md:mt-0">
              May 2025 – Nov 2025 | Bangalore, India
            </p>
          </div>

          <p className="text-sm text-gray-500 mt-3 italic">
            Internship Studio is a platform offering industry-oriented training and internships in software development and IT.
          </p>

          <ul className="mt-4 list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <li>Assisted in developing and debugging Java-based applications</li>
            <li>Applied Object-Oriented Programming (OOP) concepts in real-world projects</li>
            <li>Developed backend modules using Java and PostgreSQL</li>
          </ul>

          <p className="text-xs text-gray-500 mt-4">
            Contact: Supriya Dongre – Internship Mentor
          </p>

        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="text-center py-16">
        <h2 className="text-2xl font-bold">Let's Build Something Together</h2>
        <p className="text-gray-500 mt-2">Feel free to reach out</p>

        <a href="/contact">
          <button className="mt-4 bg-green-600 px-6 py-2 text-white rounded-lg hover:bg-green-700">
            Contact Me
          </button>
        </a>
      </section>

    </div>
  );
}