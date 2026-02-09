import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthCont.jsx";
import { Navigate, useNavigate } from "react-router-dom";
import { savePet } from "../services/petStorage.js";

const R = {
  letras: /^[A-Za-zÀ-ÿ\s]*$/,
  idadeChars: /^[A-Za-zÀ-ÿ0-9\s.,]*$/,
  condicoes: /^[A-Za-zÀ-ÿ0-9\s.,-]*$/,
  descricao: /^[A-Za-zÀ-ÿ0-9\s.,]*$/
};

const LABELS = {
  nome: "nome",
  idade: "idade",
  especie: "espécie",
  raca: "raça",
  porte: "porte",
  genero: "gênero",
  condicoes: "condições especiais",
  descricao: "descrição",
  foto: "foto"
};

export default function CadastroPet() {
  const { user } = useContext(AuthContext);
  const nav = useNavigate();
  if (!user || user.role !== "admin") return <Navigate to="/" />;

  const [f, setF] = useState({
    nome: "",
    idade: "",
    especie: "",
    raca: "",
    porte: "",
    genero: "",
    temCondicoes: false,
    condicoes: "",
    descricao: "",
    foto: ""
  });

  const [fe, setFe] = useState({});

  const liveValidate = (name, value) => {
    let error = null;

    if (name === "nome") {
      if (!R.letras.test(value))
        error = `O campo ${LABELS.nome} aceita apenas letras e espaços`;
      else if (value && value.length < 3)
        error = `${LABELS.nome} deve ter pelo menos 3 caracteres`;
    }

    if (name === "especie" || name === "raca") {
      if (!R.letras.test(value))
        error = `O campo ${LABELS[name]} não aceita números ou símbolos`;
    }

    if (name === "idade") {
      if (!R.idadeChars.test(value))
        error = `O campo ${LABELS.idade} não aceita símbolos especiais`;
      else {
        const nums = value.match(/\d/g);
        if (!nums)
          error = `O campo ${LABELS.idade} precisa conter ao menos um número`;
        else if (nums.length > 3)
          error = `O campo ${LABELS.idade} aceita no máximo 3 números`;
      }
    }

    if (name === "condicoes") {
      if (!R.condicoes.test(value))
        error = `O campo ${LABELS.condicoes} aceita apenas letras, números, ponto, vírgula e hífen`;
      else if (value && value.length < 10)
        error = `${LABELS.condicoes} deve ter no mínimo 10 caracteres`;
    }

    if (name === "descricao") {
      if (!R.descricao.test(value))
        error = `O campo ${LABELS.descricao} aceita apenas letras, números, ponto e vírgula`;
      else if (value && value.length < 30)
        error = `${LABELS.descricao} deve ter no mínimo 30 caracteres`;
    }

    setFe(p => ({ ...p, [name]: error }));
    return error;
  };

  const ch = e => {
    const { name, value, type, checked } = e.target;
    const v = type === "checkbox" ? checked : value;
    setF(p => ({ ...p, [name]: v }));
    liveValidate(name, v);
  };

  const validateFinal = () => {
  const e = {};

  // obrigatórios
  Object.keys(LABELS).forEach(k => {
    if (k === "condicoes" && !f.temCondicoes) return;

    if (!f[k]) {
      e[k] = `O campo ${LABELS[k]} é obrigatório`;
    }
  });

  // valida regras específicas
  Object.keys(f).forEach(k => {
    const err = liveValidate(k, f[k]);
    if (err) e[k] = err;
  });

  // foto obrigatória (reforço)
  if (!f.foto) {
    e.foto = "O campo Foto é obrigatório";
  }

  setFe(e);
  return !Object.keys(e).length;
};

  const sub = e => {
    e.preventDefault();
    if (!validateFinal()) return;

    savePet({
      id: Date.now(),
      ...f,
      statusAdocao: "Disponível"
    });

    nav("/adocao");
  };

  const input = (name, label) => (
    <div className="mb-2">
      <label className="form-label fw-semibold">{label}</label>
      <input
        name={name}
        value={f[name]}
        onChange={ch}
        className={`form-control ${fe[name] ? "is-invalid" : ""}`}
      />
      {fe[name] && <div className="invalid-feedback d-block">{fe[name]}</div>}
    </div>
  );

  return (
    <div className="container mt-4 mb-5" style={{ maxWidth: 700 }}>
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">🐾 Cadastrar Pet</h2>

        <form onSubmit={sub}>
          {input("nome", "Nome do Pet")}
          {input("idade", "Idade")}
          {input("especie", "Espécie")}
          {input("raca", "Raça")}

          <div className="row mb-2">
            <div className="col">
              <label className="form-label fw-semibold">Porte</label>
              <select
                name="porte"
                value={f.porte}
                onChange={ch}
                className={`form-select ${fe.porte ? "is-invalid" : ""}`}
              >
                <option value="">Selecione</option>
                <option>Pequeno</option>
                <option>Médio</option>
                <option>Grande</option>
              </select>
              {fe.porte && <div className="invalid-feedback d-block">{fe.porte}</div>}
            </div>

            <div className="col">
              <label className="form-label fw-semibold">Gênero</label>
              <select
                name="genero"
                value={f.genero}
                onChange={ch}
                className={`form-select ${fe.genero ? "is-invalid" : ""}`}
              >
                <option value="">Selecione</option>
                <option>Macho</option>
                <option>Fêmea</option>
              </select>
              {fe.genero && <div className="invalid-feedback d-block">{fe.genero}</div>}
            </div>
          </div>

          <div className="form-check mb-2">
            <input
              type="checkbox"
              className="form-check-input"
              name="temCondicoes"
              checked={f.temCondicoes}
              onChange={ch}
            />
            <label className="form-check-label">
              Possui condições especiais?
            </label>
          </div>

          {f.temCondicoes && input("condicoes", "Condições especiais")}

          <div className="mb-2">
            <label className="form-label fw-semibold">Descrição</label>
            <textarea
              name="descricao"
              rows="4"
              value={f.descricao}
              onChange={ch}
              className={`form-control ${fe.descricao ? "is-invalid" : ""}`}
            />
            {fe.descricao && (
              <div className="invalid-feedback d-block">{fe.descricao}</div>
            )}
          </div>

          <div className="mb-2">
            <label className="form-label fw-semibold">Foto do Pet</label>
            <input
              type="file"
              accept="image/*"
              className={`form-control ${fe.foto ? "is-invalid" : ""}`}
              onChange={e => {
                const file = e.target.files[0];
                if (!file) {
                  setFe(p => ({ ...p, foto: "O campo Foto é obrigatório" }));
                  return;
                }
                const r = new FileReader();
                r.onload = () => {
                  setF(p => ({ ...p, foto: r.result }));
                  setFe(p => ({ ...p, foto: null }));
                };
                r.readAsDataURL(file);
              }}
            />
            {fe.foto && <div className="invalid-feedback d-block">{fe.foto}</div>}
          </div>

          <button className="btn btn-warning w-100 fw-bold">
            Salvar Pet
          </button>
        </form>
      </div>
    </div>
  );
}
