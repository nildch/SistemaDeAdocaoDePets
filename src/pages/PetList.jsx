import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const FOTO_PADRAO =
  "https://via.placeholder.com/400x300?text=Pet+Adotado";

export default function PetList() {
  const { user } = useContext(AuthContext);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("pets")) || [];
    setPets(dados);
  }, []);

  function salvar(lista) {
    setPets(lista);
    localStorage.setItem("pets", JSON.stringify(lista));
  }

  function removerPet(id) {
    if (!window.confirm("Deseja remover este pet?")) return;
    salvar(pets.filter(p => p.id !== id));
  }

  function marcarAdotado(id) {
    salvar(
      pets.map(p =>
        p.id === id ? { ...p, statusAdocao: "Adotado" } : p
      )
    );
  }

  const disponiveis = pets.filter(p => p.statusAdocao === "Disponível");
  const adotados = pets.filter(p => p.statusAdocao === "Adotado");

  function CardPet({ pet, adotado }) {
    return (
      <div className="col-md-6 col-lg-4">
        <div className={`card shadow h-100 ${adotado ? "border-success" : ""}`}>
          <img
            src={pet.foto || FOTO_PADRAO}
            alt={pet.nome}
            style={{ height: 220, objectFit: "cover" }}
          />

          <div className="card-body text-center">
            <h5 className="fw-bold">{pet.nome}</h5>
            <p className="text-muted">{pet.animal}</p>

            {adotado && (
              <span className="badge bg-success">Adotado</span>
            )}
          </div>

          {!adotado && (
            <div className="card-footer bg-light">
              {user?.role === "admin" && (
                <>
                  <button
                    className="btn btn-success w-100 mb-2"
                    onClick={() => marcarAdotado(pet.id)}
                  >
                    Marcar como adotado
                  </button>

                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={() => removerPet(pet.id)}
                  >
                    Remover pet
                  </button>
                </>
              )}

              {user?.role === "user" && (
                <button className="btn btn-warning w-100">
                  Quero adotar
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#fdf8f5", minHeight: "100vh", padding: "40px 0" }}>
      <div className="container">

        <h3 className="mb-4">Pets disponíveis</h3>
        <div className="row g-4">
          {disponiveis.length ? (
            disponiveis.map(pet => (
              <CardPet key={pet.id} pet={pet} />
            ))
          ) : (
            <p className="text-muted">Nenhum pet disponível.</p>
          )}
        </div>

        {adotados.length > 0 && (
          <>
            <hr className="my-5" />
            <h3 className="mb-4 text-success">Pets adotados</h3>

            <div className="row g-4">
              {adotados.map(pet => (
                <CardPet key={pet.id} pet={pet} adotado />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}