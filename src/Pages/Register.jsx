import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthCont.jsx";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("As senhas não conferem");
      return;
    }

    register(form.name, form.email, form.password, form.phone);
    navigate("/");
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <h2 className="text-center mb-4" style={{ color: "#FF6F00" }}>
        Cadastro
      </h2>

      <form onSubmit={handleSubmit}>
        <input name="name" className="form-control mb-2" placeholder="Nome completo" onChange={handleChange} required />
        <input name="email" type="email" className="form-control mb-2" placeholder="E-mail" onChange={handleChange} required />
        <input name="phone" className="form-control mb-2" placeholder="Telefone" onChange={handleChange} required />
        <input name="password" type="password" className="form-control mb-2" placeholder="Senha" onChange={handleChange} required />
        <input name="confirmPassword" type="password" className="form-control mb-3" placeholder="Confirmar senha" onChange={handleChange} required />

        <button className="btn btn-warning w-100">Cadastrar</button>
      </form>
    </div>
  );
}
