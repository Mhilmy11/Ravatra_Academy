import api from "./api";

export const login = (email, password) => {
  return api.post("/login.php", { email, password });
};

export const getDashboard = () => {
  return api.get("/dashboard.php");
};

export const logout = () => {
  localStorage.removeItem("token");
};
