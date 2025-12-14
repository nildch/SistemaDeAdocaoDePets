import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthCont.jsx";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const success = login(email, password);

    if (success) {
      navigate("/");
    } else {
      setError("E-mail ou senha inválidos");
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "420px" }}>
      <h2 className="text-center mb-4" style={{ color: "#FF6F00" }}>
        Faça login 🐾
      </h2>

      <form onSubmit={handleSubmit}>
        <input
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

        {error && <div className="alert alert-danger">{error}</div>}

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
