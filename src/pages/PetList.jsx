import { useEffect, useState } from "react";

export default function PetsList() {
  const [pets, setPets] = useState([]);
  const [filtroEspecie, setFiltroEspecie] = useState("");
  const [filtroPorte, setFiltroPorte] = useState("");

  useEffect(() => {
    const petsSalvos = JSON.parse(localStorage.getItem("pets")) || [];

    // apenas pets disponíveis
    const disponiveis = petsSalvos.filter(
      (pet) => pet.statusAdocao === "Disponível"
    );

    setPets(disponiveis);
  }, []);

  // 🔎 aplica filtros
  const petsFiltrados = pets.filter((pet) => {
    const especieOk =
      filtroEspecie === "" || pet.especie === filtroEspecie;

    const porteOk =
      filtroPorte === "" || pet.porte === filtroPorte;

    return especieOk && porteOk;
  });

  return (
    <div className="container my-5">

      <h2 className="text-center mb-4">
        🐾 Nossos Amiguinhos para Adoção
      </h2>

      {/* FILTROS */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="row g-3">

            <div className="col-md-6">
              <label className="form-label fw-bold">
                Espécie
              </label>
              <select
                className="form-select"
                value={filtroEspecie}
                onChange={(e) => setFiltroEspecie(e.target.value)}
              >
                <option value="">Todas</option>
                <option>Cão</option>
                <option>Gato</option>
                <option>Outro</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">
                Porte
              </label>
              <select
                className="form-select"
                value={filtroPorte}
                onChange={(e) => setFiltroPorte(e.target.value)}
              >
                <option value="">Todos</option>
                <option>Pequeno</option>
                <option>Médio</option>
                <option>Grande</option>
              </select>
            </div>

          </div>
        </div>
      </div>

      {/* LISTAGEM */}
      {petsFiltrados.length === 0 && (
        <p className="text-center text-muted">
          Nenhum pet encontrado com os filtros selecionados 🐾
        </p>
      )}

      <div className="row g-4">
        {petsFiltrados.map((pet, index) => (
          <div className="col-md-4" key={index}>
            <div className="card h-100 shadow-sm">

              <img
                src={URL.createObjectURL(pet.fotos[0])}
                className="card-img-top"
                style={{ height: "220px", objectFit: "cover" }}
                alt={pet.nome}
              />

              <div className="card-body">
                <h5 className="card-title">{pet.nome}</h5>

                <p className="mb-1">
                  <strong>Espécie:</strong> {pet.especie}
                </p>
                <p className="mb-1">
                  <strong>Porte:</strong> {pet.porte}
                </p>
                <p className="mb-1">
                  <strong>Idade:</strong> {pet.idade}
                </p>

                <p className="text-muted mt-2">
                  {pet.descricao.length > 80
                    ? pet.descricao.substring(0, 80) + "..."
                    : pet.descricao}
                </p>
              </div>

              <div className="card-footer bg-white border-0">
                <button className="btn btn-outline-success w-100">
                  Quero Adotar 💚
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
