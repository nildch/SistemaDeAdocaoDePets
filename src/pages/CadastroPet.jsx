import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthCont.jsx";
import { Navigate, useNavigate } from "react-router-dom";
import { savePet } from "../services/petStorage.js";

export default function CadastroPet() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user || user.role !== "admin") return <Navigate to="/" />;

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [condicoes, setCondicoes] = useState("");
  const [descricao, setDescricao] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // NOME
    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nome)) {
      setError("Nome só pode conter letras");
      return;
    }
    if (nome.length < 17 || nome.length > 500) {
      setError("Nome deve ter entre 17 e 500 caracteres");
      return;
    }

    // IDADE
    if (!/^\d+$/.test(idade)) {
      setError("Idade só pode conter números");
      return;
    }

    // CONDIÇÕES
    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(condicoes)) {
      setError("Condições especiais só podem conter letras");
      return;
    }
    if (condicoes.length < 10 || condicoes.length > 255) {
      setError("Condições especiais devem ter entre 10 e 255 caracteres");
      return;
    }

    // DESCRIÇÃO
    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(descricao)) {
      setError("Descrição só pode conter letras");
      return;
    }
    if (descricao.length < 30 || descricao.length > 2000) {
      setError("Descrição deve ter entre 30 e 2000 caracteres");
      return;
    }

    savePet({ id: Date.now(), nome, idade, condicoes, descricao });
    navigate("/adocao");
  }

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2>Cadastro de Pet</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Nome do pet"
          onChange={e => setNome(e.target.value)}
        />
        <input
          className="form-control mb-2"
          placeholder="Idade"
          onChange={e => setIdade(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Condições especiais"
          onChange={e => setCondicoes(e.target.value)}
        />
        <textarea
          className="form-control mb-3"
          placeholder="Descrição"
          onChange={e => setDescricao(e.target.value)}
        />

        {error && <div className="alert alert-danger">{error}</div>}

        <button className="btn btn-warning w-100">Salvar</button>
      </form>
    </div>
  );
}
