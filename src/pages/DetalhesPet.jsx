import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DetalhesPet() {
  const { id } = useParams();
  const nav = useNavigate();
  const [pet,setPet]=useState(null);

  useEffect(()=>{
    const pets=JSON.parse(localStorage.getItem("pets"))||[];
    setPet(pets.find(p=>String(p.id)===String(id)));
  },[id]);

  if(!pet) return (
    <div className="container mt-5 text-center">
      <p>Pet não encontrado 😢</p>
      <button className="btn btn-secondary" onClick={()=>nav("/adocao")}>Voltar</button>
    </div>
  );

  return (
    <div className="container mt-5">
      <button className="btn btn-outline-secondary mb-4" onClick={()=>nav(-1)}>← Voltar</button>

      <div className="card shadow p-4">

        <div className="d-flex justify-content-center mb-4">
          <img src={pet.foto} alt={pet.nome} className="img-fluid"
            style={{maxWidth:500,maxHeight:350,objectFit:"cover",borderRadius:12}}/>
        </div>

        <h2 className="text-center">{pet.nome}</h2>

        {[
          ["Espécie",pet.especie],
          ["Raça",pet.raca],
          ["Porte",pet.porte],
          ["Gênero",pet.genero],
          ["Idade",pet.idade],
        ].map(([l,v],i)=>(
          <p key={i}><strong>{l}:</strong> {v}</p>
        ))}

        {pet.temCondicoes && (
          <p><strong>Condições especiais:</strong> {pet.condicoes}</p>
        )}

        <p className="mt-3">{pet.descricao}</p>

        <p>
          <strong>Status:</strong>{" "}
          <span className="badge bg-success">{pet.statusAdocao}</span>
        </p>
      </div>
    </div>
  );
}
