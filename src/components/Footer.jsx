export default function Footer() {
  // Tema de Cores Profissionais
  const theme = {
    primary: "#10ac84",
    secondary: "#222f3e",
    white: "#ffffff",
    grayText: "#94a3b8",
    light: "#f8fafc"
  };

  return (
    <footer style={{ 
      backgroundColor: theme.secondary, 
      color: theme.white, 
      padding: "60px 0 30px 0",
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    }}>
      <div className="container">
        <div className="row justify-content-between align-items-center g-4">
          
          {/* Lado Esquerdo: Info de Contato */}
          <div className="col-md-6 text-center text-md-start">
            <h5 className="fw-black mb-4" style={{ color: theme.primary, letterSpacing: "-0.5px" }}>
              🐾 Patinhas Felizes
            </h5>
            <div className="d-flex flex-column gap-2 opacity-75">
              <p className="mb-0 small">
                <strong style={{ color: theme.primary }}>📧 Email:</strong> contato@patinhasfelizes.org
              </p>
              <p className="mb-0 small">
                <strong style={{ color: theme.primary }}>📱 WhatsApp:</strong> (83) 90000-0000
              </p>
              <p className="mb-0 small">
                <strong style={{ color: theme.primary }}>⏰ Atendimento:</strong> Seg a Sex • 08h às 17h
              </p>
            </div>
          </div>

          {/* Lado Direito: Social/Slogan Sutil */}
          <div className="col-md-4 text-center text-md-end">
             <p className="small mb-0 opacity-50" style={{ fontStyle: "italic" }}>
               "Adotar é ver o mundo através de um olhar de gratidão."
             </p>
          </div>
        </div>

        {/* Linha Divisória */}
        <hr className="my-5 opacity-10" style={{ borderColor: theme.white }} />

        {/* Copyright */}
        <div className="text-center">
          <p className="mb-0" style={{ fontSize: "0.8rem", color: theme.grayText, letterSpacing: "0.5px" }}>
            © 2025 CENTRO DE ADOÇÃO <span className="fw-bold" style={{ color: theme.white }}>PATINHAS FELIZES</span>. TODOS OS DIREITOS RESERVADOS.
          </p>
        </div>
      </div>

      <style>{`
        .fw-black { font-weight: 900 !important; }
      `}</style>
    </footer>
  );
}