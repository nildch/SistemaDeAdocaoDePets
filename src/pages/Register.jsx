import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveUser, getUsers } from "../services/userStorage.js";

const R = {
  nome: /^[A-Za-zÀ-ÿ\s]*$/,
  telefone: /^\d*$/,
  email: /^\S+@\S+\.\S+$/
};

const LABELS = {
  name: "Nome completo",
  email: "E-mail",
  phone: "Telefone",
  password: "Senha",
  confirmPassword: "Confirmar senha"
};

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [fe, setFe] = useState({});

  const liveValidate = (name, value) => {
    let error = null;

    if (name === "name") {
      if (!R.nome.test(value))
        error = `O campo ${LABELS.name} aceita apenas letras e espaços`;
      else if (value && value.length < 12)
        error = `${LABELS.name} deve ter pelo menos 12 caracteres`;
    }

    if (name === "email") {
      if (value && !R.email.test(value))
        error = `Informe um ${LABELS.email} válido`;
    }

    if (name === "phone") {
      if (!R.telefone.test(value))
        error = `O campo ${LABELS.phone} aceita apenas números`;
      else if (value && value.length < 9)
        error = `${LABELS.phone} deve ter no mínimo 9 números`;
    }

    if (name === "password") {
      if (value && value.length < 6)
        error = `${LABELS.password} deve ter no mínimo 6 caracteres`;
    }

    if (name === "confirmPassword") {
      if (value && value !== form.password)
        error = "As senhas não conferem";
    }

    setFe(p => ({ ...p, [name]: error }));
    return error;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    liveValidate(name, value);
  };

  const validateFinal = () => {
    const e = {};

    // obrigatórios
    Object.keys(LABELS).forEach(k => {
      if (!form[k]) {
        e[k] = `O campo ${LABELS[k]} é obrigatório`;
      }
    });

    // regras específicas
    Object.keys(form).forEach(k => {
      const err = liveValidate(k, form[k]);
      if (err) e[k] = err;
    });

    // email duplicado
    const usuarios = getUsers();
    if (usuarios.some(u => u.email === form.email)) {
      e.email = "Este e-mail já está cadastrado";
    }

    setFe(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validateFinal()) return;

    saveUser(form);
    alert("Cadastro realizado com sucesso!");
    navigate("/");
  };

  const input = (name, type = "text") => (
    <div className="mb-2">
      <label className="form-label fw-semibold">{LABELS[name]}</label>
      <input
        name={name}
        type={type}
        value={form[name]}
        onChange={handleChange}
        className={`form-control ${fe[name] ? "is-invalid" : ""}`}
      />
      {fe[name] && (
        <div className="invalid-feedback d-block">{fe[name]}</div>
      )}
    </div>
  );

  return (
    <div className="container mt-5" style={{ maxWidth: 450 }}>
      <h2 className="text-center mb-4 text-warning">Cadastro</h2>

      <form onSubmit={handleSubmit}>
        {input("name")}
        {input("email", "email")}
        {input("phone")}
        {input("password", "password")}
        {input("confirmPassword", "password")}

        <button className="btn btn-warning w-100 fw-bold mt-3">
          Cadastrar
        </button>
      </form>
    </div>
  );
}
