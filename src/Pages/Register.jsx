import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("As senhas não conferem");
      return;
    }

    const usuariosSalvos =
      JSON.parse(localStorage.getItem("usuarios")) || [];

    const emailJaExiste = usuariosSalvos.some(
      (u) => u.email === form.email
    );

    if (emailJaExiste) {
      setError("Este e-mail já está cadastrado");
      return;
    }

    const novoUsuario = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password
    };

    usuariosSalvos.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuariosSalvos));

    alert("Cadastro realizado com sucesso!");
    navigate("/login");
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <h2 className="text-center mb-4" style={{ color: "#FF6F00" }}>
        Cadastro
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          className="form-control mb-2"
          placeholder="Nome completo"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          className="form-control mb-2"
          placeholder="E-mail"
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          className="form-control mb-2"
          placeholder="Telefone"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          className="form-control mb-2"
          placeholder="Senha"
          onChange={handleChange}
          required
        />

        <input
          name="confirmPassword"
          type="password"
          className="form-control mb-3"
          placeholder="Confirmar senha"
          onChange={handleChange}
          required
        />

        {error && <div className="alert alert-danger">{error}</div>}

        <button className="btn btn-warning w-100">
          Cadastrar
        </button>
      </form>
    </div>
  );
}
