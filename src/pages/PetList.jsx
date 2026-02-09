import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function PetList() {
  const { user } = useContext(AuthContext);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("pets")) || [];
    setPets(dados);
  }, []);

  function salvar(petsAtualizados) {
    setPets(petsAtualizados);
    localStorage.setItem("pets", JSON.stringify(petsAtualizados));
  }

  function removerPet(id) {
    if (!window.confirm("Deseja remover este pet?")) return;
    const filtrados = pets.filter(p => p.id !== id);
    salvar(filtrados);
  }

  function marcarAdotado(id) {
    const atualizados = pets.map(p =>
      p.id === id ? { ...p, statusAdocao: "Adotado" } : p
    );
    salvar(atualizados);
  }

  const petsParaMostrar = pets.filter(p => {
    if (user?.role === "admin") return true; // Admin vê TUDO (Disponível e Adotado)
    return p.statusAdocao === "Disponível";  // Usuário vê apenas Disponível
  });

  return (
    <div style={{ backgroundColor: "#fdf8f5", minHeight: "100vh", padding: "40px 0" }}>
      <div className="container">
        
        <div className="text-center mb-5">
          <h2 className="fw-bold display-5" style={{ color: "#4e342e" }}>
            {user?.role === "admin" ? "Painel do Administrador ⚙️" : "Encontre seu Novo Amigo 🐾"}
          </h2>
          <p className="text-muted">
            {user?.role === "admin" 
              ? `Gerenciando ${pets.length} pets no total` 
              : "Amizade não se compra, se encontra."}
          </p>
        </div>

        <div className="row g-4">
          {petsParaMostrar.length > 0 ? (
            petsParaMostrar.map(pet => (
              <div className="col-md-6 col-lg-4" key={pet.id}>
                <div 
                  className="pet-card shadow" 
                  style={{ 
                    opacity: pet.statusAdocao === "Adotado" ? 0.8 : 1,
                    border: pet.statusAdocao === "Adotado" ? "2px solid #2ecc71" : "none" 
                  }}
                >
                  <div className="pet-img-container">
                    <img src={pet.foto} className="pet-img" alt={pet.nome} />
                    <div className={`pet-badge ${pet.statusAdocao === "Adotado" ? "bg-success text-white" : ""}`}>
                      {pet.statusAdocao === "Adotado" ? "ADOTADO" : pet.porte}
                    </div>
                  </div>

                  <div className="card-body p-4 text-center">
                    <h4 className="fw-bold mb-1">{pet.nome}</h4>
                    <p className="text-uppercase small fw-bold text-warning mb-3">
                      {pet.especie}
                    </p>
                  </div>

                  <div className="p-3 bg-light border-top d-flex flex-column gap-2">
                    
                    {/* BOTÕES DO ADMIN */}
                    {user?.role === "admin" && (
                      <>
                        {pet.statusAdocao !== "Adotado" && (
                          <button
                            className="btn btn-adotado w-100"
                            onClick={() => marcarAdotado(pet.id)}
                          >
                            Marcar como adotado
                          </button>
                        )}
                        <button
                          className="btn btn-remover w-100"
                          onClick={() => removerPet(pet.id)}
                        >
                          Remover Pet
                        </button>
                      </>
                    )}

                    {/* BOTÃO DO USUÁRIO */}
                    {user?.role === "user" && (
                      <button className="btn btn-adotar-agora w-100">
                        Quero Adotar
                      </button>
                    )}

                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-5">
              <p className="text-muted">Nenhum pet encontrado.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .pet-card { background: white; border-radius: 20px; overflow: hidden; transition: 0.3s; }
        .pet-card:hover { transform: translateY(-5px); }
        .pet-img-container { position: relative; height: 230px; }
        .pet-img { width: 100%; height: 100%; object-fit: cover; }
        .pet-badge { 
          position: absolute; top: 15px; right: 15px; 
          background: white; padding: 5px 15px; border-radius: 50px; 
          font-weight: bold; font-size: 0.75rem; color: #FF6F00;
        }
        .btn-adotar-agora { background: #FF6F00; color: white; border: none; padding: 10px; border-radius: 10px; font-weight: bold; }
        .btn-adotado { background: #2ecc71; color: white; border: none; padding: 10px; border-radius: 10px; font-weight: bold; }
        .btn-remover { background: white; color: #e74c3c; border: 1px solid #e74c3c; padding: 10px; border-radius: 10px; font-weight: bold; }
      `}</style>
    </div>
  );
}