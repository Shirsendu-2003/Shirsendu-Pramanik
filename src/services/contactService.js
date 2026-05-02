import API from "./api";

// ✅ ADD THIS (your error fix)
export const sendMessage = (data) =>
  API.post("/api/contact", data);

// existing
export const getMessages = (email) =>
  API.get("/api/contact", { params: { email } });

export const deleteMessage = (id) =>
  API.delete(`/api/contact/${id}`);

export const exportPDF = () =>
  API.get("/api/contact/export/pdf", {
    responseType: "blob",
  });

  export const sendReply = (data) =>
  API.post("/api/contact/reply", data);