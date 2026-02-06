import { createContext, useEffect, useState } from "react";
import { getAuth, saveAuth, removeAuth } from "../services/authStorage.js";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    if (auth) setUser(auth);
  }, []);

  function login(email, password) {
    // ADMIN FIXO
    if (email === "admin@patinhas.com" && password === "admin123") {
      const admin = { email, role: "admin" };
      setUser(admin);
      saveAuth(admin);
      return true;
    }

    // USUÁRIO NORMAL
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioValido = usuarios.find(
      u => u.email === email && u.password === password
    );

    if (usuarioValido) {
      setUser({ email, role: "user" });
      saveAuth({ email, role: "user" });
      return true;
    }

    return false;
  }

  function logout() {
    setUser(null);
    removeAuth();
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
