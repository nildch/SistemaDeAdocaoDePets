import { useContext } from "react";
import { AuthContext } from "../context/AuthCont.jsx";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Cores do Tema Premium
  const theme = {
    primary: "#10ac84",
    secondary: "#222f3e",
    accent: "#ff9f43",
    light: "#f8fafc",
    white: "#ffffff",
    grayText: "#64748b"
  };

  return (
    <div style={{ backgroundColor: theme.light, minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="container pt-5">

        {/* Hero Section para Visitantes */}
        {!user && (
          <div
            className="text-center p-5 mb-5 border-0 position-relative overflow-hidden"
            style={{ 
              backgroundColor: theme.white, 
              borderRadius: "40px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.05)"
            }}
          >
            {/* Decoração sutil de fundo */}
            <div className="position-absolute top-0 start-0 w-100 h-100 opacity-25" style={{ pointerEvents: "none", backgroundImage: "radial-gradient(circle at 20% 150%, #10ac84 0%, transparent 50%)" }}></div>

            <span className="badge rounded-pill px-3 py-2 mb-3" style={{ backgroundColor: `${theme.primary}15`, color: theme.primary, fontWeight: "800", fontSize: "0.75rem" }}>
              BEM-VINDO
            </span>
            
            <h1 className="display-4 fw-black mb-3" style={{ color: theme.secondary, letterSpacing: "-2px" }}>
              Dê um novo <span style={{ color: theme.primary }}>lar!</span> 🐾
            </h1>

            <p className="fs-5 mb-5 mx-auto" style={{ maxWidth: "600px", color: theme.grayText }}>
              Cadastre-se para conhecer os pets que estão ansiosos para te encontrar e transformar sua rotina.
            </p>

            <div className="d-flex justify-content-center gap-3 position-relative">
              <button
                className="btn btn-lg px-5 py-3 fw-bold text-white shadow-lg border-0 hover-grow"
                style={{ borderRadius: "100px", backgroundColor: theme.primary, fontSize: "0.9rem" }}
                onClick={() => navigate("/register")}
              >
                COMEÇAR AGORA
              </button>

              <button
                className="btn btn-lg px-5 py-3 fw-bold hover-grow"
                style={{ borderRadius: "100px", border: `2px solid ${theme.primary}30`, color: theme.primary, fontSize: "0.9rem", backgroundColor: "transparent" }}
                onClick={() => navigate("/login")}
              >
                ENTRAR
              </button>
            </div>
          </div>
        )}

        {/* Carousel de Alta Qualidade */}
        <div
          id="carouselHome"
          className="carousel slide mb-5"
          data-bs-ride="carousel"
          style={{ borderRadius: "40px", overflow: "hidden", boxShadow: "0 30px 60px rgba(0,0,0,0.12)" }}
        >
          <div className="carousel-inner">
            {[
              { id: 3, text: "Amor que transforma destinos" },
              { id: 5, text: "Um amigo leal para toda a vida" },
              { id: 4, text: "Adotar é um ato de coragem e amor" }
            ].map((item, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={item.id}>
                <img
                  src={`https://placedog.net/1200/500?id=${item.id}`}
                  className="d-block w-100"
                  alt="Pet"
                  style={{ height: "500px", objectFit: "cover", filter: "brightness(0.7)" }}
                />
                <div className="carousel-caption d-none d-md-block text-start" style={{ left: "8%", bottom: "10%" }}>
                  <h5 className="display-5 fw-black text-white" style={{ letterSpacing: "-1px" }}>{item.text}</h5>
                  <div style={{ width: "60px", height: "4px", backgroundColor: theme.primary, borderRadius: "2px" }}></div>
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carouselHome" data-bs-slide="prev">
            <span className="carousel-control-prev-icon p-4 bg-white bg-opacity-25 rounded-circle" style={{ backdropFilter: "blur(5px)" }}></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselHome" data-bs-slide="next">
            <span className="carousel-control-next-icon p-4 bg-white bg-opacity-25 rounded-circle" style={{ backdropFilter: "blur(5px)" }}></span>
          </button>
        </div>

        {/* Seção de Ação para Logados */}
        <div className="pb-5">
          {user && (
            <div className="text-center p-5 bg-white shadow-sm rounded-5 border-0" style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
              <p className="small fw-bold text-uppercase mb-3" style={{ color: theme.primary, letterSpacing: "2px" }}>
                {user.role === "admin" ? "Painel do Gestor" : "Tudo Pronto"}
              </p>
              
              <h2 className="fw-bold mb-4" style={{ color: theme.secondary }}>
                {user.role === "admin" ? "Gerencie a plataforma" : "Pronto para encontrar seu melhor amigo?"}
              </h2>

              <button
                className={`btn btn-lg px-5 py-3 fw-bold shadow-lg hover-grow border-0 text-white`}
                style={{ 
                  borderRadius: "100px", 
                  backgroundColor: user.role === "admin" ? theme.secondary : theme.primary,
                  minWidth: "280px"
                }}
                onClick={() => navigate("/adocao")}
              >
                {user.role === "admin" ? "GERENCIAR PETS" : "ADOTE UM AMIGUINHO AGORA!"}
              </button>
            </div>
          )}
        </div>

      </div>

      <style>{`
        .fw-black { font-weight: 900 !important; }
        .hover-grow { transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .hover-grow:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 15px 30px rgba(0,0,0,0.15) !important;
        }
        .carousel-caption h5 {
          text-shadow: 0 4px 15px rgba(0,0,0,0.4);
        }
      `}</style>
    </div>
  );
}