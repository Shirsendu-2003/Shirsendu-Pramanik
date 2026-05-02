import { useEffect, useState, useCallback, useContext } from "react";
import {
  getMessages,
  deleteMessage,
  exportPDF,
  sendReply
} from "../services/contactService";

import { getViews } from "../services/statsService"; // ✅ NEW

import Loader from "../components/Loader";
import ReplyModal from "../components/ReplyModal";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";

export default function AdminDashboard() {
  const { dark } = useContext(ThemeContext);

  const [data, setData] = useState([]);
  const [views, setViews] = useState(0); // ✅ NEW
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [replyOpen, setReplyOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");

  // 🔄 FETCH MESSAGES
  const fetchData = useCallback(() => {
    setLoading(true);
    getMessages(search)
      .then(res => setData(res.data))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, [search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ✅ FETCH VIEWS
  useEffect(() => {
    getViews("home")
      .then(res => setViews(res.data))
      .catch(() => setViews(0));
  }, []);

  // 🗑️ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    await deleteMessage(id);
    fetchData();
  };

  // 📄 EXPORT PDF
  const downloadPDF = async () => {
    try {
      const res = await exportPDF();
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "messages.pdf";
      a.click();
    } catch {
      alert("PDF export failed");
    }
  };

  // 📧 REPLY
  const handleReplyOpen = (email) => {
    setSelectedEmail(email);
    setReplyOpen(true);
  };

  const handleSendReply = async (data) => {
    await sendReply(data);
    alert("Email sent successfully!");
  };

  // 📊 MESSAGE CHART
  const chartMap = {};
  data.forEach(d => {
    const date = d.createdAt
      ? new Date(d.createdAt).toLocaleDateString()
      : "Unknown";

    chartMap[date] = (chartMap[date] || 0) + 1;
  });

  const chartData = Object.keys(chartMap).map(date => ({
    date,
    count: chartMap[date]
  }));

  // 📊 VIEW CHART (simple)
  const viewChartData = [
    { name: "Views", count: views }
  ];

  if (loading) return <Loader />;

  return (
    <div
      className={`min-h-screen p-6 transition-all duration-500 ${
        dark
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-br from-gray-100 to-white text-gray-900"
      }`}
    >

      {/* 🔥 HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-center mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>

        <div className="flex gap-2 mt-4 md:mt-0">
          <input
            placeholder="Search email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`px-3 py-2 rounded-lg ${
              dark ? "bg-gray-700 text-white" : "bg-white border"
            }`}
          />

          <button
            onClick={fetchData}
            className="bg-blue-600 px-4 py-2 rounded-lg text-white"
          >
            Search
          </button>

          <button
            onClick={downloadPDF}
            className="bg-green-600 px-4 py-2 rounded-lg text-white"
          >
            Export PDF
          </button>
        </div>
      </motion.div>

      {/* 🔥 STATS CARDS */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">

        {/* 👁 VIEWS */}
        <div className={`p-6 rounded-xl shadow text-center ${
          dark ? "bg-white/10 backdrop-blur-lg" : "bg-white"
        }`}>
          <h3>Total Views</h3>
          <p className="text-3xl text-blue-500">{views}</p>
        </div>

        {/* 📩 MESSAGES */}
        <div className={`p-6 rounded-xl shadow text-center ${
          dark ? "bg-white/10 backdrop-blur-lg" : "bg-white"
        }`}>
          <h3>Total Messages</h3>
          <p className="text-3xl text-green-500">{data.length}</p>
        </div>

      </div>

      {/* 📊 CHARTS */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">

        {/* MESSAGE BAR */}
        <div className={`p-4 rounded-xl shadow ${
          dark ? "bg-white/10 backdrop-blur-lg" : "bg-white"
        }`}>
          <h3>Messages by Date</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="date" stroke={dark ? "#ccc" : "#333"} />
              <YAxis stroke={dark ? "#ccc" : "#333"} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* VIEW BAR */}
        <div className={`p-4 rounded-xl shadow ${
          dark ? "bg-white/10 backdrop-blur-lg" : "bg-white"
        }`}>
          <h3>Website Views</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={viewChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* 📋 TABLE */}
      <div className={`rounded-xl shadow overflow-x-auto ${
        dark ? "bg-white/10 backdrop-blur-lg" : "bg-white"
      }`}>
        {data.length === 0 ? (
          <p className="text-center p-6">No messages</p>
        ) : (
          <table className="w-full text-sm">
            <thead className={dark ? "bg-gray-700" : "bg-gray-200"}>
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Message</th>
                <th className="p-3">Date</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((m) => (
                <tr key={m.id} className="border-b">
                  <td className="p-3">{m.name}</td>
                  <td className="p-3">{m.email}</td>
                  <td className="p-3">{m.message}</td>
                  <td className="p-3">
                    {m.createdAt
                      ? new Date(m.createdAt).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="p-3 flex gap-2">
                    <button onClick={() => handleDelete(m.id)}
                      className="bg-red-500 px-3 py-1 text-white rounded">
                      Delete
                    </button>

                    <button onClick={() => handleReplyOpen(m.email)}
                      className="bg-blue-500 px-3 py-1 text-white rounded">
                      Reply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 📧 MODAL */}
      <ReplyModal
        open={replyOpen}
        onClose={() => setReplyOpen(false)}
        onSend={handleSendReply}
        email={selectedEmail}
      />
    </div>
  );
}
