import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthCont.jsx";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef(null);
  const formRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    // limpa erro anterior
    emailRef.current.setCustomValidity("");

    // =========================
    // ADMIN SIMPLES (FACILITADO)
    // =========================
    if (email === "admin@patinhas.com") {
      login(email, password); // senha qualquer
      navigate("/");
      return;
    }

    // =========================
    // USUÁRIO NORMAL
    // =========================
    const usuarios =
      JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioValido = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    // ❌ INVÁLIDO → ERRO VISÍVEL
    if (!usuarioValido) {
      emailRef.current.setCustomValidity(
        "E-mail ou senha inválidos"
      );
      formRef.current.reportValidity();
      return;
    }

    // ✅ LOGIN NORMAL
    login(email, password);
    navigate("/");
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "420px" }}>
      <h2 className="text-center mb-4" style={{ color: "#FF6F00" }}>
        Faça login 🐾
      </h2>

      <form ref={formRef} onSubmit={handleSubmit}>
        <input
          ref={emailRef}
          type="email"
          className="form-control mb-3"
          placeholder="E-mail cadastrado"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-warning w-100 mb-3">
          Entrar com cadastro existente
        </button>
      </form>

      <div className="text-center">
        <Link to="/register">Não tem conta? Cadastre-se</Link>
      </div>
    </div>
  );
}
