import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthCont.jsx";

export default function Adocao() {
  const [pets, setPets] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // 🔒 se não estiver logado, volta pra home
    if (!user) {
      navigate("/");
      return;
    }

    const petsSalvos = JSON.parse(localStorage.getItem("pets")) || [];

    const disponiveis = petsSalvos.filter(
      (pet) => pet.statusAdocao === "Disponível"
    );

    setPets(disponiveis);
  }, [user, navigate]);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4" style={{ color: "#FF6F00" }}>
        Encontre seu Novo Amigo 🐾
      </h1>

      <p className="text-center mb-5">
        Encontrados <strong>{pets.length}</strong> pets disponíveis
      </p>

      {pets.length === 0 && (
        <p className="text-center text-muted">
          Ops! Não encontramos nenhum pet disponível no momento 😢
        </p>
      )}

      <div className="row">
        {pets.map((pet) => (
          <div key={pet.id} className="col-md-4 mb-4">
            <div 
            className="card h-100 shadow-sm"
  style={{ cursor: "pointer" }}
  onClick={() => navigate(`/pet/${pet.id}`)} >
              <img
                src={pet.foto}
                alt={pet.nome}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />

              <div className="card-body text-center">
                <h5 className="card-title">{pet.nome}</h5>
                <p className="card-text">
                  {pet.especie} • {pet.porte}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
