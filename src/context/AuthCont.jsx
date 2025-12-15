import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(email, password) {
    if (email === "admin@patinhas.com") {
      setUser({
        name: "Administrador",
        email,
        role: "admin",
      });
      return true;
    }

    setUser({
      name: "Usuário",
      email,
      role: "user",
    });
    return true;
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
