import { useState, useEffect } from "react";
import { AuthContext } from "./AuthCont.jsx";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  function login(email, password) {
    const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (!registeredUser) return false;

    if (
      registeredUser.email === email &&
      registeredUser.password === password
    ) {
      setUser(registeredUser);
      localStorage.setItem("user", JSON.stringify(registeredUser));
      return true;
    }

    return false;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  function register(name, email, password, phone) {
    const newUser = { name, email, password, phone };
    localStorage.setItem("registeredUser", JSON.stringify(newUser));
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
