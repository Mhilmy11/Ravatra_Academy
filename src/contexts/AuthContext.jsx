import { createContext, useContext, useEffect, useState } from "react";

import api from "../services/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await api.get("/account/profile");

      if (response.data.success) {
        setUser(response.data.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (form) => {
    const response = await api.post("/account/login", form);

    if (!response.data.success) {
      throw new Error(response.data.message || "Login gagal.");
    }

    await checkAuth();

    return response.data;
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await api.post("/account/logout");
    } catch (error) {
      console.error(error);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        checkAuth,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
