import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthCont.jsx";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  
  const theme = {
    primary: "#10ac84",
    secondary: "#222f3e",
    white: "#ffffff",
    light: "#f8fafc",
    danger: "#ee5253"
  };

  return (
    <header className="sticky-top shadow-sm" style={{ 
      backgroundColor: "rgba(255, 255, 255, 0.95)", 
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(0,0,0,0.05)",
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    }}>
      <div className="container py-3">
        <div className="d-flex justify-content-between align-items-center">
          
          {/* Logo */}
          <h2 className="m-0" style={{ fontSize: "1.4rem" }}>
            <Link to="/" className="text-decoration-none d-flex align-items-center fw-black" style={{ color: theme.secondary, letterSpacing: "-1px" }}>
              <span className="me-2" style={{ fontSize: "1.6rem" }}>🐾</span>
              <span className="d-none d-sm-inline">Patinhas <span style={{ color: theme.primary }}>Felizes</span></span>
            </Link>
          </h2>

          {/* Navegação e Saudação */}
          <nav className="d-flex align-items-center gap-2 gap-md-3">
            
           
            <span className="small fw-bold d-none d-sm-inline" style={{ color: theme.secondary }}>
              Olá, <span style={{ color: theme.primary }}>
                {user 
                  ? (user.name ? user.name.split(' ')[0] : (user.role === "admin" ? "Admin" : "Usuário"))
                  : "Visitante"
                }
              </span>
            </span>

            <div className="vr d-none d-sm-block mx-2 opacity-10"></div>

            {user ? (
              <div className="d-flex align-items-center gap-2 gap-md-3">
                {user.role === "admin" && (
                  <Link to="/cadastro-pet" className="btn btn-sm px-3 rounded-pill fw-bold d-none d-md-block" style={{ backgroundColor: `${theme.primary}15`, color: theme.primary, border: "none" }}>
                    + Cadastrar Pet
                  </Link>
                )}
                <button 
                  onClick={logout} 
                  className="btn btn-sm px-4 rounded-pill fw-bold text-white shadow-sm hover-grow" 
                  style={{ backgroundColor: theme.secondary, border: "none", fontSize: "0.8rem" }}
                >
                  SAIR
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Link to="/login" className="btn btn-link text-decoration-none fw-bold small shadow-none px-2" style={{ color: theme.secondary }}>
                  Entrar
                </Link>
                
                <Link 
                  to="/register" 
                  className="btn btn-sm px-4 rounded-pill fw-bold text-white shadow-sm hover-grow" 
                  style={{ backgroundColor: theme.primary, border: "none", fontSize: "0.8rem" }}
                >
                  CADASTRAR
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>

      <style>{`
        .fw-black { font-weight: 900 !important; }
        .hover-grow { transition: all 0.2s ease; }
        .hover-grow:hover { transform: translateY(-2px); filter: brightness(1.1); }
        .sticky-top { z-index: 1020; }
        .btn-link:hover { color: ${theme.primary} !important; }
      `}</style>
    </header>
  );
}