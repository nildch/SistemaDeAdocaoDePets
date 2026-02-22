import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthCont.jsx";
import { useNavigate, Link } from "react-router-dom";

const semUnderline = /^[^_]+$/;

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Tema de Cores Profissionais
  const theme = {
    primary: "#10ac84",
    secondary: "#222f3e",
    light: "#f8fafc",
    white: "#ffffff",
    grayText: "#64748b",
    danger: "#ef4444"
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // LOGICA MANTIDA
    if (!email.trim()) return setError("E-mail é obrigatório");
    if (!semUnderline.test(email)) return setError("E-mail não pode conter _");
    if (!password) return setError("Senha é obrigatória");
    if (!semUnderline.test(password)) return setError("Senha não pode conter _");

    const sucesso = login(email, password);
    if (!sucesso) return setError("Credenciais inválidas");

    navigate("/");
  }

  return (
    <div style={{ backgroundColor: theme.light, minHeight: "100vh", display: "flex", alignItems: "center", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            
            {/* Card de Login Estilo Moderno */}
            <div className="card border-0 shadow-lg p-4 p-md-5" style={{ borderRadius: "40px", backgroundColor: theme.white }}>
              
              <div className="text-center mb-5">
                <div className="d-inline-block p-3 rounded-circle mb-3" style={{ backgroundColor: `${theme.primary}15` }}>
                  <span style={{ fontSize: "2rem" }}>🐾</span>
                </div>
                <h2 className="fw-black" style={{ color: theme.secondary, letterSpacing: "-1.5px" }}>Bem-vindo</h2>
                <p style={{ color: theme.grayText }}>Acesse sua conta para continuar</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label small fw-bold text-muted ps-2">E-MAIL</label>
                  <input
                    type="email"
                    className="form-control border-0 bg-light p-3 shadow-none"
                    style={{ borderRadius: "15px", transition: "0.3s" }}
                    placeholder="exemplo@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-bold text-muted ps-2">SENHA</label>
                  <input
                    type="password"
                    className="form-control border-0 bg-light p-3 shadow-none"
                    style={{ borderRadius: "15px", transition: "0.3s" }}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>

                {error && (
                  <div className="alert alert-danger border-0 mb-4 py-2 text-center" style={{ borderRadius: "12px", fontSize: "0.85rem", backgroundColor: "#fee2e2", color: theme.danger }}>
                    <strong>⚠ {error}</strong>
                  </div>
                )}

                <button 
                  className="btn btn-lg w-100 fw-bold text-white shadow-lg border-0 py-3 mb-4 hover-grow" 
                  style={{ backgroundColor: theme.primary, borderRadius: "15px", fontSize: "1rem" }}
                >
                  ENTRAR NA CONTA
                </button>
              </form>

              <div className="text-center">
                <p className="small text-muted mb-0">Não possui uma conta?</p>
                <Link to="/register" className="text-decoration-none fw-bold" style={{ color: theme.primary }}>
                  Cadastre-se gratuitamente
                </Link>
              </div>
            </div>

            {/* Link de Ajuda Sutil */}
            <div className="text-center mt-4">
               <button onClick={() => navigate("/")} className="btn btn-link btn-sm text-muted text-decoration-none opacity-50">
                 ← Voltar para a Home
               </button>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .fw-black { font-weight: 900 !important; }
        .hover-grow { transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .hover-grow:hover { transform: translateY(-3px) scale(1.02); filter: brightness(1.05); }
        input:focus { 
          background-color: #fff !important; 
          box-shadow: 0 0 0 4px ${theme.primary}15 !important;
          border: 1px solid ${theme.primary}30 !important;
        }
      `}</style>
    </div>
  );
}