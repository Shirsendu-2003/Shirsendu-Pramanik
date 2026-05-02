const TOKEN_KEY = "token";

// 🔹 Get token
export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

// 🔹 Set token
export const setToken = (token) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    console.error("Error saving token");
  }
};

// 🔹 Remove token
export const removeToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    console.error("Error removing token");
  }
};

// 🔹 Check login
export const isAuthenticated = () => {
  return !!getToken();
};