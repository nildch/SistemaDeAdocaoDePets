import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthCont.jsx";
import { Navigate, useNavigate } from "react-router-dom";

export default function CadastroPet() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🔒 APENAS ADMIN
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // 📌 Informações básicas
  const [nome, setNome] = useState("");
  const [especie, setEspecie] = useState("");
  const [raca, setRaca] = useState("");
  const [porte, setPorte] = useState("");
  const [genero, setGenero] = useState("");
  const [idade, setIdade] = useState("");

  // 🩺 Saúde e status
  const [statusAdocao, setStatusAdocao] = useState("Disponível");
  const [castrado, setCastrado] = useState("");
  const [vacinacao, setVacinacao] = useState("");
  const [condicoes, setCondicoes] = useState("");

  // 🖼️ Mídia e descrição
  const [descricao, setDescricao] = useState("");
  const [foto, setFoto] = useState(null);

  // 📸 Upload da foto (Base64)
  function handleFoto(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFoto(reader.result);
    };
    reader.readAsDataURL(file);
  }

  // 💾 Salvar pet
  function handleSubmit(e) {
    e.preventDefault();

    if (!foto) {
      alert("Adicione pelo menos uma foto do pet.");
      return;
    }

    const novoPet = {
      id: Date.now(),
      nome,
      especie,
      raca,
      porte,
      genero,
      idade,
      statusAdocao,
      castrado,
      vacinacao,
      condicoes,
      descricao,
      foto
    };

    const petsSalvos = JSON.parse(localStorage.getItem("pets")) || [];
    petsSalvos.push(novoPet);
    localStorage.setItem("pets", JSON.stringify(petsSalvos));

    alert("✅ Pet cadastrado com sucesso!");

    navigate("/adocao");
  }

  return (
    <div className="container mt-4" style={{ maxWidth: "700px" }}>
      <h2 className="text-center mb-4">
        Cadastro de Novo Pet para Adoção 🐾
      </h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow">

        {/* INFORMAÇÕES BÁSICAS */}
        <h5>Informações Básicas</h5>

        <input
          className="form-control mb-2"
          placeholder="Nome do Pet"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <select
          className="form-select mb-2"
          value={especie}
          onChange={(e) => setEspecie(e.target.value)}
          required
        >
          <option value="">Espécie</option>
          <option value="Cão">Cão</option>
          <option value="Gato">Gato</option>
          <option value="Outro">Outro</option>
        </select>

        <input
          className="form-control mb-2"
          placeholder="Raça (ou SRD)"
          value={raca}
          onChange={(e) => setRaca(e.target.value)}
          required
        />

        <select
          className="form-select mb-2"
          value={porte}
          onChange={(e) => setPorte(e.target.value)}
          required
        >
          <option value="">Porte</option>
          <option value="Pequeno">Pequeno</option>
          <option value="Médio">Médio</option>
          <option value="Grande">Grande</option>
        </select>

        <select
          className="form-select mb-2"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          required
        >
          <option value="">Gênero</option>
          <option value="Macho">Macho</option>
          <option value="Fêmea">Fêmea</option>
        </select>

        <input
          className="form-control mb-3"
          placeholder="Idade ou data aproximada"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          required
        />

        {/* SAÚDE E STATUS */}
        <h5>Saúde e Status</h5>

        <select
          className="form-select mb-2"
          value={statusAdocao}
          onChange={(e) => setStatusAdocao(e.target.value)}
          required
        >
          <option value="Disponível">Disponível</option>
          <option value="Em Processo">Em Processo</option>
          <option value="Adotado">Adotado</option>
        </select>

        <select
          className="form-select mb-2"
          value={castrado}
          onChange={(e) => setCastrado(e.target.value)}
        >
          <option value="">Castrado?</option>
          <option value="Sim">Sim</option>
          <option value="Não">Não</option>
        </select>

        <select
          className="form-select mb-2"
          value={vacinacao}
          onChange={(e) => setVacinacao(e.target.value)}
        >
          <option value="">Vacinação</option>
          <option value="Completa">Completa</option>
          <option value="Incompleta">Incompleta</option>
        </select>

        <textarea
          className="form-control mb-3"
          placeholder="Condições especiais / alergias"
          value={condicoes}
          onChange={(e) => setCondicoes(e.target.value)}
        />

        {/* MÍDIA E DESCRIÇÃO */}
        <h5>Descrição e Mídia</h5>

        <textarea
          className="form-control mb-3"
          rows="4"
          placeholder="História e temperamento do pet"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />

        <input
          type="file"
          className="form-control mb-3"
          accept="image/*"
          onChange={handleFoto}
          required
        />

        <button className="btn btn-warning w-100">
          Salvar e Publicar
        </button>
      </form>
    </div>
  );
}
