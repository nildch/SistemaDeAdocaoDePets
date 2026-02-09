import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthCont.jsx";
import { useNavigate, Link } from "react-router-dom";

const R = {
  email: /^\S+@\S+\.\S+$/
};

const LABELS = {
  email: "E-mail",
  password: "Senha"
};

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [fe, setFe] = useState({});

  const liveValidate = (name, value) => {
    let error = null;

    if (name === "email") {
      if (!value)
        error = `O campo ${LABELS.email} é obrigatório`;
      else if (!R.email.test(value))
        error = `Informe um ${LABELS.email} válido`;
    }

    if (name === "password") {
      if (!value)
        error = `O campo ${LABELS.password} é obrigatório`;
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

    Object.keys(LABELS).forEach(k => {
      if (!form[k]) {
        e[k] = `O campo ${LABELS[k]} é obrigatório`;
      }
    });

    Object.keys(form).forEach(k => {
      const err = liveValidate(k, form[k]);
      if (err) e[k] = err;
    });

    setFe(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validateFinal()) return;

    const sucesso = login(form.email, form.password);
    if (!sucesso) {
      setFe({
        email: "E-mail ou senha inválidos",
        password: "E-mail ou senha inválidos"
      });
      return;
    }

    navigate("/");
  };

  const input = (name, type) => (
    <div className="mb-3">
      <label className="form-label fw-semibold">{LABELS[name]}</label>
      <input
        type={type}
        name={name}
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
    <div className="container mt-5" style={{ maxWidth: "420px" }}>
      <h2 className="text-center mb-4" style={{ color: "#FF6F00" }}>
        Faça login 🐾
      </h2>

      <form onSubmit={handleSubmit}>
        {input("email", "email")}
        {input("password", "password")}

        <button className="btn btn-warning w-100 mb-3 fw-bold">
          Entrar
        </button>
      </form>

      <div className="text-center">
        <Link to="/register">Não tem conta? Cadastre-se</Link>
      </div>
    </div>
  );
}
