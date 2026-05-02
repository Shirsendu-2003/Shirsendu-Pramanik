import { useState } from "react";
import Button from "../components/Button";
import { sendMessage } from "../services/contactService";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 📧 Email validation
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const submit = async () => {
    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.message) {
      setError("Please fill all fields");
      return;
    }

    if (!isValidEmail(form.email)) {
      setError("Invalid email format");
      return;
    }

    try {
      setLoading(true);
      await sendMessage(form);

      setSuccess("Message sent successfully!");

      // reset form
      setForm({ name: "", email: "", message: "" });

    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ⌨️ Enter key support
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      submit();
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">

      <h2 className="text-xl font-bold text-center mb-4">
        Contact Me
      </h2>

      {/* ❌ ERROR */}
      {error && (
        <p className="text-red-500 text-sm text-center mb-2">
          {error}
        </p>
      )}

      {/* ✅ SUCCESS */}
      {success && (
        <p className="text-green-500 text-sm text-center mb-2">
          {success}
        </p>
      )}

      {/* NAME */}
      <input
        className="w-full p-2 mb-3 border rounded"
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
        onKeyDown={handleKeyDown}
      />

      {/* EMAIL */}
      <input
        type="email"
        className="w-full p-2 mb-3 border rounded"
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
        onKeyDown={handleKeyDown}
      />

      {/* MESSAGE */}
      <textarea
        className="w-full p-2 mb-3 border rounded"
        placeholder="Message"
        rows="4"
        value={form.message}
        onChange={(e) =>
          setForm({ ...form, message: e.target.value })
        }
        onKeyDown={handleKeyDown}
      />

      {/* BUTTON */}
      <Button full onClick={submit} loading={loading}>
        {loading ? "Sending..." : "Send Message"}
      </Button>

    </div>
  );
}