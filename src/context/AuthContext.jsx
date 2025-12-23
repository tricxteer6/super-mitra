import { createContext, useContext, useState } from "react";
import DataUser from "../database/DataUser";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email, password) => {
    const user = DataUser.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) return false;

    setCurrentUser(user);
    return true;
  };

  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
