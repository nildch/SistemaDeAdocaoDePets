import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DetalhesPet() {
  const { id } = useParams();
  const nav = useNavigate();
  const [pet, setPet] = useState(null);

  const theme = {
    primary: "#10ac84",
    secondary: "#222f3e",
    light: "#f8fafc",
    white: "#ffffff",
    grayText: "#64748b",
    success: "#10ac84"
  };

  useEffect(() => {
    const pets = JSON.parse(localStorage.getItem("pets")) || [];
    setPet(pets.find(p => String(p.id) === String(id)));
  }, [id]);

  if (!pet) return (
    <div className="container py-5 text-center" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="p-5 bg-white rounded-5 shadow-sm d-inline-block">
        <h1 className="mb-3">😢</h1>
        <h4 className="fw-bold" style={{ color: theme.secondary }}>Pet não encontrado</h4>
        <p className="text-muted">Parece que este amiguinho não está mais em nossa base.</p>
        <button className="btn px-4 py-2 rounded-pill fw-bold text-white mt-3" style={{ backgroundColor: theme.primary, border: "none" }} onClick={() => nav("/adocao")}>Explorar outros Pets</button>
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: theme.light, minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="container py-5">
        
        {/* Botão Voltar Minimalista */}
        <button 
          className="btn d-flex align-items-center gap-2 mb-4 fw-bold p-0 border-0 shadow-none" 
          style={{ color: theme.primary }} 
          onClick={() => nav(-1)}
        >
          <span style={{ fontSize: '1.5rem' }}>←</span> VOLTAR
        </button>

        <div className="row g-5">
          {/* Coluna da Foto */}
          <div className="col-lg-6">
            <div className="position-relative shadow-lg" style={{ borderRadius: "40px", overflow: "hidden", height: "500px" }}>
              <img 
                src={pet.foto} 
                alt={pet.nome} 
                className="w-100 h-100" 
                style={{ objectFit: "cover" }}
              />
              <div className="position-absolute top-0 start-0 m-4">
                <span className="badge px-4 py-2 rounded-pill shadow-sm" style={{ backgroundColor: theme.success, fontSize: "0.8rem", fontWeight: "800" }}>
                  {pet.statusAdocao.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Coluna das Informações */}
          <div className="col-lg-6">
            <div className="ps-lg-4">
              <span className="text-uppercase fw-bold opacity-50 small" style={{ letterSpacing: "2px" }}>Conheça o seu novo amigo</span>
              <h1 className="display-3 fw-black mb-4" style={{ color: theme.secondary, letterSpacing: "-2px" }}>{pet.nome}</h1>
              
              {/* Tags/Pills Informativas */}
              <div className="d-flex flex-wrap gap-2 mb-4">
                {[
                  { icon: "🏷️", val: pet.especie },
                  { icon: "🧬", val: pet.raca },
                  { icon: "📏", val: pet.porte },
                  { icon: "🚻", val: pet.genero },
                  { icon: "🎂", val: pet.idade }
                ].map((item, i) => (
                  <div key={i} className="px-3 py-2 bg-white rounded-pill shadow-sm small fw-bold" style={{ color: theme.secondary, border: "1px solid #edf2f7" }}>
                    <span className="me-1">{item.icon}</span> {item.val}
                  </div>
                ))}
              </div>

              {/* Descrição */}
              <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border-0">
                <h6 className="fw-bold mb-3" style={{ color: theme.primary }}>SOBRE {pet.nome.toUpperCase()}</h6>
                <p style={{ color: theme.grayText, lineHeight: "1.7", fontSize: "1.05rem" }}>
                  {pet.descricao || "Este pet é muito carinhoso e está esperando por uma família que lhe dê muito amor e atenção. Venha conhecê-lo!"}
                </p>
              </div>

              {/* Condições Especiais (Se houver) */}
              {pet.temCondicoes && (
                <div className="p-4 rounded-4 mb-4" style={{ backgroundColor: "#fff5f5", border: "1px solid #feb2b2" }}>
                  <h6 className="fw-bold text-danger mb-2">Cuidados Especiais</h6>
                  <p className="mb-0 small text-danger opacity-75">{pet.condicoes}</p>
                </div>
              )}

              {/* CTA Adicional Sutil */}
              <div className="mt-5 p-4 rounded-5" style={{ background: theme.secondary, color: theme.white }}>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h5 className="mb-1 fw-bold">Gostou do {pet.nome}?</h5>
                    <p className="mb-0 small opacity-75">Solicite a adoção na página inicial!</p>
                  </div>
                  <button 
                    className="btn btn-light rounded-pill fw-bold px-4 py-2" 
                    style={{ color: theme.secondary }}
                    onClick={() => nav("/adocao")}
                  >
                    Ir para Adoção
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <style>{`
        .fw-black { font-weight: 900 !important; }
        img { transition: transform 0.5s ease; }
        .row:hover img { transform: scale(1.02); }
      `}</style>
    </div>
  );
}