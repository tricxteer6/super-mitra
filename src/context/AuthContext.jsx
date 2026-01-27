import { createContext, useContext, useState, useEffect } from "react";
import * as authService from "../services/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // ===== LOAD DARI LOCALSTORAGE =====
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ===== LOGIN =====
  const login = async (email, password) => {
    const res = await authService.login(email, password);

    // backend kamu kirim { token, user }
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));

    setToken(res.token);
    setUser(res.user);

    return res.user;
  };

  // ===== LOGOUT =====
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
