import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveUser, getUsers } from "../services/userStorage.js";

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

    // NOME
    if (!/^[A-Za-z\s]+$/.test(form.name)) {
      setError("Nome só pode conter letras e espaços");
      return;
    }
    if (form.name.length < 12 || form.name.length > 500) {
      setError("Nome deve ter entre 12 e 500 caracteres");
      return;
    }

    // EMAIL
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("E-mail inválido");
      return;
    }

    // TELEFONE
    if (!/^\d+$/.test(form.phone)) {
      setError("Telefone só pode conter números");
      return;
    }
    if (form.phone.length < 9) {
      setError("Telefone deve ter ao menos 9 números");
      return;
    }

    // SENHA
    if (form.password.length < 6) {
      setError("Senha deve ter pelo menos 6 caracteres");
      return;
    }

    // CONFIRMAÇÃO DE SENHA
    if (form.password !== form.confirmPassword) {
      setError("Senhas não conferem");
      return;
    }

    // EMAIL JÁ CADASTRADO
    const usuarios = getUsers();
    if (usuarios.some(u => u.email === form.email)) {
      setError("Este e-mail já está cadastrado");
      return;
    }

    // SALVAR
    saveUser({
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password
    });

    alert("Cadastro realizado com sucesso!");
    navigate("/");
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

        <button className="btn btn-warning w-100">Cadastrar</button>
      </form>
    </div>
  );
}
