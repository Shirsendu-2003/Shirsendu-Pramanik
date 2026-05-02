import API from "./api";

// ✅ Track page view
export const addView = (page) =>
  API.post(`/api/stats/view?page=${page}`);

// ✅ Get page views
export const getViews = (page) =>
  API.get(`/api/stats/views?page=${page}`);