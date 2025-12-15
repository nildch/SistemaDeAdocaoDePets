import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DetalhesPet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const petsSalvos = JSON.parse(localStorage.getItem("pets")) || [];
    const encontrado = petsSalvos.find(
      (p) => String(p.id) === String(id)
    );
    setPet(encontrado);
  }, [id]);

  if (!pet) {
    return (
      <div className="container mt-5 text-center">
        <p>Pet não encontrado 😢</p>
        <button className="btn btn-secondary" onClick={() => navigate("/adocao")}>
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
        ← Voltar
      </button>

      <div className="card shadow p-4">
        <img
          src={pet.foto}
          alt={pet.nome}
          style={{ width: "100%", maxHeight: "350px", objectFit: "cover" }}
        />

        <h2 className="mt-3">{pet.nome}</h2>

        <p><strong>Espécie:</strong> {pet.especie}</p>
        <p><strong>Raça:</strong> {pet.raca}</p>
        <p><strong>Porte:</strong> {pet.porte}</p>
        <p><strong>Gênero:</strong> {pet.genero}</p>
        <p><strong>Idade:</strong> {pet.idade}</p>

        <p className="mt-3">{pet.descricao}</p>

        <p>
          <strong>Status:</strong>{" "}
          <span className="badge bg-success">
            {pet.statusAdocao}
          </span>
        </p>
      </div>
    </div>
  );
}
