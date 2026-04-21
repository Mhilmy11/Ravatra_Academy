import api from "./api";

export const login = async (email, password) => {
  try {
    const res = await api.post("?route=login", {
      email,
      password,
    });

    const { token, user } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Login gagal" };
  }
};

export const getDashboard = async () => {
  const res = await api.get("?route=dashboard");
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.href = "/login";
};
