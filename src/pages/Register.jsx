import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveUser, getUsers } from "../services/userStorage.js";

const soLetras = /^[A-Za-zÀ-ÿ\s]+$/;
const semUnderline = /^[^_]+$/;

export default function Register() {
  const navigate = useNavigate();

  // Tema de Cores Profissional
  const theme = {
    primary: "#10ac84",
    secondary: "#222f3e",
    light: "#f8fafc",
    white: "#ffffff",
    grayText: "#64748b",
    danger: "#ef4444"
  };

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
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nome = form.name.trim();

    // LOGICA MANTIDA (Validações)
    if (!nome) return setError("Nome é obrigatório");
    if (!semUnderline.test(nome)) return setError("Nome não pode conter _");
    if (!soLetras.test(nome)) return setError("Nome só aceita letras e espaços");
    if (nome.length < 11) return setError("Nome deve ter no mínimo 11 letras");
    if (!form.email.trim()) return setError("E-mail é obrigatório");
    if (!semUnderline.test(form.email)) return setError("E-mail não pode conter _");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError("E-mail inválido");
    if (!form.phone.trim()) return setError("Telefone é obrigatório");
    if (!semUnderline.test(form.phone)) return setError("Telefone não pode conter _");
    if (!/^\d+$/.test(form.phone)) return setError("Telefone aceita apenas números");
    if (form.phone.length < 9) return setError("Telefone deve ter ao menos 9 números");
    if (!form.password) return setError("Senha é obrigatória");
    if (!semUnderline.test(form.password)) return setError("Senha não pode conter _");
    if (form.password.length < 6) return setError("Senha deve ter no mínimo 6 caracteres");
    if (!form.confirmPassword) return setError("Confirmação de senha é obrigatória");
    if (form.password !== form.confirmPassword) return setError("Senhas não conferem");

    const usuarios = getUsers();
    if (usuarios.some(u => u.email === form.email)) return setError("Este e-mail já está cadastrado");

    saveUser(form);
    alert("Cadastro realizado com sucesso!");
    navigate("/");
  }

  return (
    <div style={{ backgroundColor: theme.light, minHeight: "100vh", display: "flex", alignItems: "center", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">
            
            {/* Card de Cadastro */}
            <div className="card border-0 shadow-lg p-4 p-md-5" style={{ borderRadius: "40px", backgroundColor: theme.white }}>
              
              <div className="text-center mb-5">
                <div className="d-inline-block p-3 rounded-circle mb-3" style={{ backgroundColor: `${theme.primary}15` }}>
                  <span style={{ fontSize: "2rem" }}>🌱</span>
                </div>
                <h2 className="fw-black" style={{ color: theme.secondary, letterSpacing: "-1px" }}>Criar Conta</h2>
                <p style={{ color: theme.grayText }}>Junte-se à nossa comunidade de adoção</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted ps-2">NOME COMPLETO</label>
                  <input
                    name="name"
                    className="form-control border-0 bg-light p-3"
                    style={{ borderRadius: "15px" }}
                    placeholder="Ex: João Silva"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted ps-2">E-MAIL</label>
                  <input
                    name="email"
                    type="email"
                    className="form-control border-0 bg-light p-3"
                    style={{ borderRadius: "15px" }}
                    placeholder="email@exemplo.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted ps-2">TELEFONE (SOMENTE NÚMEROS)</label>
                  <input
                    name="phone"
                    className="form-control border-0 bg-light p-3"
                    style={{ borderRadius: "15px" }}
                    placeholder="11999999999"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label small fw-bold text-muted ps-2">SENHA</label>
                    <input
                      name="password"
                      type="password"
                      className="form-control border-0 bg-light p-3"
                      style={{ borderRadius: "15px" }}
                      placeholder="••••••"
                      value={form.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <label className="form-label small fw-bold text-muted ps-2">CONFIRMAR</label>
                    <input
                      name="confirmPassword"
                      type="password"
                      className="form-control border-0 bg-light p-3"
                      style={{ borderRadius: "15px" }}
                      placeholder="••••••"
                      value={form.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {error && (
                  <div className="alert alert-danger border-0 mb-4 py-2 text-center" style={{ borderRadius: "12px", fontSize: "0.85rem", backgroundColor: "#fee2e2", color: theme.danger }}>
                    <strong>⚠ {error}</strong>
                  </div>
                )}

                <button className="btn btn-lg w-100 fw-bold text-white shadow-lg border-0 py-3 hover-grow" style={{ backgroundColor: theme.primary, borderRadius: "15px", fontSize: "1rem" }}>
                  FINALIZAR CADASTRO
                </button>

                <div className="text-center mt-4">
                  <button type="button" onClick={() => navigate("/login")} className="btn btn-link text-decoration-none small fw-bold" style={{ color: theme.primary }}>
                    Já possui uma conta? Entrar
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .fw-black { font-weight: 900 !important; }
        .hover-grow { transition: all 0.3s ease; }
        .hover-grow:hover { transform: translateY(-3px); filter: brightness(1.1); }
        input:focus { 
          box-shadow: 0 0 0 3px ${theme.primary}20 !important; 
          background-color: #fff !important; 
          outline: none;
        }
      `}</style>
    </div>
  );
}