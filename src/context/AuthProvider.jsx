import { useState } from "react";
import { AuthContext } from "./AuthCont.jsx";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(email, password) {
    // 👑 ADMIN FIXO
    if (email === "admin@patinhas.com") {
      setUser({
        name: "Admin",
        email,
        role: "admin",
      });
      return true;
    }

    // 👤 USUÁRIO COMUM (TEM QUE ESTAR CADASTRADO)
    const usuariosSalvos =
      JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuariosSalvos.find(
      (u) => u.email === email && u.password === password
    );

    if (!usuarioEncontrado) {
      return false; // ❌ NÃO DEIXA ENTRAR
    }

    setUser({
      name: usuarioEncontrado.name,
      email: usuarioEncontrado.email,
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
