import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthCont.jsx";
import { Navigate, useNavigate } from "react-router-dom";
import { savePet } from "../services/petStorage.js";

export default function CadastroPet() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Estados dos campos
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [especie, setEspecie] = useState("");
  const [raca, setRaca] = useState("");
  const [porte, setPorte] = useState("Pequeno");
  const [genero, setGenero] = useState("Macho");
  const [condicoes, setCondicoes] = useState("");
  const [descricao, setDescricao] = useState("");
  const [foto, setFoto] = useState("");
  const [error, setError] = useState("");

  if (!user || user.role !== "admin") return <Navigate to="/" />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // --- VALIDAÇÕES OBRIGATÓRIAS ---
    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nome)) {
      setError("Preencha os campos necessários.");
      return;
    }
  
    if (especie.length < 3 || raca.length < 3) {
      setError("Espécie e Raça devem ter pelo menos 3 caracteres");
      return;
    }
    if (nome.length < 3 || nome.length > 100) {
      setError("Nome deve ter entre 3 e 100 caracteres");
      return;
    }

    if (!/^\d+$/.test(idade)) {
      setError("Idade só pode conter números");
      return;
    }

    if (especie.trim() === "" || raca.trim() === "") {
      setError("Espécie e Raça são obrigatórios");
      return;
    }

    if (condicoes.length < 10 || condicoes.length > 255) {
      setError("Condições especiais devem ter entre 10 e 255 caracteres");
      return;
    }

    if (descricao.length < 30 || descricao.length > 2000) {
      setError("Descrição deve ter entre 30 e 2000 caracteres");
      return;
    }

    if (!foto.startsWith("http")) {
      setError("Informe uma URL válida para a foto (começando com http)");
      return;
    }

    try {
      // O objeto deve conter as chaves EXATAS que DetalhesPet.jsx e Adocao.jsx usam
      await savePet({
        id: Date.now(),
        nome,
        idade: `${idade} anos`, // Formatado para exibição
        especie,
        raca,
        porte,
        genero,
        condicoes,
        descricao,
        foto,
        statusAdocao: "Disponível" // Exatamente como o filtro no Adocao.jsx espera
      });

      navigate("/adocao");
    } catch (err) {
      setError("Erro ao salvar o pet. Tente novamente.");
    }
  }

  return (
    <div className="container mt-4 mb-5" style={{ maxWidth: "700px" }}>
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center">🐾 Cadastrar Novo Pet</h2>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-8">
              <label className="form-label">Nome do Pet</label>
              <input className="form-control mb-3" placeholder="Ex: Bob" value={nome} onChange={e => setNome(e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Idade (anos)</label>
              <input className="form-control mb-3" placeholder="Ex: 2" value={idade} onChange={e => setIdade(e.target.value)} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label className="form-label">Espécie</label>
              <input className="form-control mb-3" placeholder="Cão, Gato..." value={especie} onChange={e => setEspecie(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Raça</label>
              <input className="form-control mb-3" placeholder="Ex: Poodle" value={raca} onChange={e => setRaca(e.target.value)} />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Porte</label>
              <select className="form-select" value={porte} onChange={e => setPorte(e.target.value)}>
                <option value="Pequeno">Pequeno</option>
                <option value="Médio">Médio</option>
                <option value="Grande">Grande</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Gênero</label>
              <select className="form-select" value={genero} onChange={e => setGenero(e.target.value)}>
                <option value="Macho">Macho</option>
                <option value="Fêmea">Fêmea</option>
              </select>
            </div>
          </div>

          <label className="form-label">Condições Especiais</label>
          <textarea className="form-control mb-3" rows="2" value={condicoes} onChange={e => setCondicoes(e.target.value)} />

          <label className="form-label">Descrição</label>
          <textarea className="form-control mb-3" rows="4" value={descricao} onChange={e => setDescricao(e.target.value)} />

          <label className="form-label">URL da Foto</label>
          <input className="form-control mb-3" placeholder="https://..." value={foto} onChange={e => setFoto(e.target.value)} />

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <button className="btn btn-warning w-100 fw-bold py-2 mt-2">
            ✅ Salvar Pet para Adoção
          </button>
        </form>
      </div>
    </div>
  );
}