import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthCont.jsx";
import { Navigate, useNavigate } from "react-router-dom";

const R = {
  letras: /^[A-Za-zÀ-ÿ\s]+$/,
  racaChars: /^[A-Za-zÀ-ÿ\s-]+$/, 
  idadeChars: /^[A-Za-zÀ-ÿ0-9\s.,]+$/,
  condicoes: /^[A-Za-zÀ-ÿ0-9\s.,-]+$/,
  descricao: /^[A-Za-zÀ-ÿ0-9\s.,]+$/
};

const LABELS = {
  nome: "nome",
  idade: "idade",
  animal: "animal",
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

  const theme = {
    primary: "#10ac84",
    secondary: "#222f3e",
    light: "#f8fafc",
    white: "#ffffff",
    grayText: "#64748b",
    danger: "#ef4444"
  };

  if (!user || user.role !== "admin") return <Navigate to="/" />;

  const [f, setF] = useState({
    nome: "",
    idade: "",
    animal: "",
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
      if (!value.trim()) error = "Nome é obrigatório";
      else if (!R.letras.test(value)) error = "Nome aceita apenas letras e espaços";
      else if (value.trim().length < 3) error = "Nome deve ter no mínimo 3 letras";
    }
    if (name === "animal") {
      if (!value.trim()) error = `O campo ${LABELS[name]} é obrigatório`;
      else if (!R.letras.test(value)) error = `O campo ${LABELS[name]} aceita apenas letras`;
      else if (value.trim().length < 3) error = `O campo ${LABELS[name]} deve ter no mínimo 3 letras`;
    }
    if (name === "raca") {
      if (!value.trim()) error = `O campo ${LABELS[name]} é obrigatório`;
      else if (!R.racaChars.test(value)) error = `O campo ${LABELS[name]} aceita apenas letras e hífen`;
      else if (value.trim().length < 3) error = `O campo ${LABELS[name]} deve ter no mínimo 3 caracteres`;
    }
    if (name === "idade") {
      if (!value.trim()) error = "Idade é obrigatória";
      else if (!R.idadeChars.test(value)) error = "Idade não aceita símbolos especiais";
      else {
        const nums = value.match(/\d/g);
        if (!nums) error = "Idade precisa conter ao menos um número";
        else if (nums.length > 3) error = "Idade aceita no máximo 3 números";
      }
    }
    if (name === "condicoes" && f.temCondicoes) {
      if (!R.condicoes.test(value)) error = "Condições aceitam apenas letras, números, ponto, vírgula e hífen";
      else if (value.trim().length < 10) error = "Condições devem ter no mínimo 10 caracteres";
    }
    if (name === "descricao") {
      if (!value.trim()) error = "Descrição é obrigatória";
      else if (!R.descricao.test(value)) error = "Descrição aceita apenas letras, números, ponto e vírgula";
      else if (value.trim().length < 30) error = "Descrição deve ter no mínimo 30 caracteres";
    }
    setFe(p => ({ ...p, [name]: error }));
    return error;
  };

  const ch = e => {
    const { name, value, type, checked } = e.target;
    const v = type === "checkbox" ? checked : value;
    setF(p => ({ ...p, [name]: v }));
    if (name !== "temCondicoes") liveValidate(name, v);
  };

  const validateFinal = () => {
    const e = {};
    Object.keys(LABELS).forEach(k => {
      if (k === "condicoes" && !f.temCondicoes) return;
      if (!f[k] || !f[k].toString().trim()) e[k] = `O campo ${LABELS[k]} é obrigatório`;
    });
    Object.keys(f).forEach(k => {
      const err = liveValidate(k, f[k] || "");
      if (err) e[k] = err;
    });
    if (!f.foto) e.foto = "O campo foto é obrigatório";
    setFe(e);
    return Object.keys(e).length === 0;
  };

  const sub = e => {
    e.preventDefault();
    if (!validateFinal()) return;
    const petsAtuais = JSON.parse(localStorage.getItem("pets")) || [];
    const novoPet = { id: Date.now(), ...f, statusAdocao: "Disponível" };
    localStorage.setItem("pets", JSON.stringify([...petsAtuais, novoPet]));
    nav("/adocao");
  };

  const inputStyled = (name, label, placeholder = "") => (
    <div className="mb-3">
      <label className="form-label small fw-bold text-muted ps-1">{label.toUpperCase()}</label>
      <input
        name={name}
        placeholder={placeholder}
        value={f[name]}
        onChange={ch}
        className={`form-control border-0 bg-light p-3 shadow-none ${fe[name] ? "is-invalid" : ""}`}
        style={{ borderRadius: "15px", transition: "0.3s" }}
      />
      {fe[name] && <div className="invalid-feedback ps-1 fw-bold" style={{fontSize: "0.75rem"}}>{fe[name]}</div>}
    </div>
  );

  return (
    <div style={{ backgroundColor: theme.light, minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            
            {/* Header de Cadastro */}
            <div className="d-flex align-items-center gap-3 mb-4">
               <button onClick={() => nav(-1)} className="btn bg-white shadow-sm rounded-circle p-2" style={{ width: "45px", height: "45px", border: "none", color: theme.secondary }}>←</button>
               <h2 className="fw-black m-0" style={{ color: theme.secondary, letterSpacing: "-1px" }}>Novo <span style={{ color: theme.primary }}>Membro</span></h2>
            </div>

            <div className="card border-0 shadow-lg p-4 p-md-5" style={{ borderRadius: "40px", backgroundColor: theme.white }}>
              <form onSubmit={sub}>
                
                <h5 className="fw-bold mb-4 d-flex align-items-center" style={{ color: theme.primary }}>
                  <span className="bg-success bg-opacity-10 p-2 rounded-3 me-2">📝</span> Informações Básicas
                </h5>

                <div className="row">
                  <div className="col-md-6">{inputStyled("nome", "Nome do Pet", "Ex: Pipoca")}</div>
                  <div className="col-md-6">{inputStyled("idade", "Idade", "Ex: 2 anos")}</div>
                </div>

                <div className="row">
                  <div className="col-md-6">{inputStyled("animal", "Espécie", "Ex: Cachorro")}</div>
                  <div className="col-md-6">{inputStyled("raca", "Raça", "Ex: Poodle ou Vira-lata")}</div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted ps-1">PORTE</label>
                    <select
                      name="porte"
                      value={f.porte}
                      onChange={ch}
                      className={`form-select border-0 bg-light p-3 shadow-none ${fe.porte ? "is-invalid" : ""}`}
                      style={{ borderRadius: "15px" }}
                    >
                      <option value="">Selecione</option>
                      <option>Pequeno</option>
                      <option>Médio</option>
                      <option>Grande</option>
                    </select>
                    {fe.porte && <div className="invalid-feedback ps-1 fw-bold">{fe.porte}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted ps-1">GÊNERO</label>
                    <select
                      name="genero"
                      value={f.genero}
                      onChange={ch}
                      className={`form-select border-0 bg-light p-3 shadow-none ${fe.genero ? "is-invalid" : ""}`}
                      style={{ borderRadius: "15px" }}
                    >
                      <option value="">Selecione</option>
                      <option>Macho</option>
                      <option>Fêmea</option>
                    </select>
                    {fe.genero && <div className="invalid-feedback ps-1 fw-bold">{fe.genero}</div>}
                  </div>
                </div>

                <hr className="my-5 opacity-5" />

                <h5 className="fw-bold mb-4 d-flex align-items-center" style={{ color: theme.primary }}>
                  <span className="bg-success bg-opacity-10 p-2 rounded-3 me-2">✨</span> Detalhes e Saúde
                </h5>

                <div className="form-check form-switch mb-4 ps-5">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="temCondicoes"
                    checked={f.temCondicoes}
                    onChange={ch}
                    style={{ width: "3em", height: "1.5em", cursor: "pointer" }}
                  />
                  <label className="form-check-label ms-2 fw-bold text-muted">Possui condições especiais?</label>
                </div>

                {f.temCondicoes && inputStyled("condicoes", "Descreva as condições", "Ex: Necessita de colírio diário")}

                <div className="mb-4">
                  <label className="form-label small fw-bold text-muted ps-1">DESCRIÇÃO DO PET</label>
                  <textarea
                    name="descricao"
                    rows="4"
                    placeholder="Conte um pouco sobre a personalidade dele..."
                    value={f.descricao}
                    onChange={ch}
                    className={`form-control border-0 bg-light p-3 shadow-none ${fe.descricao ? "is-invalid" : ""}`}
                    style={{ borderRadius: "20px", resize: "none" }}
                  />
                  {fe.descricao && <div className="invalid-feedback ps-1 fw-bold">{fe.descricao}</div>}
                </div>

                <div className="mb-5">
                  <label className="form-label small fw-bold text-muted ps-1">FOTO DO PET</label>
                  <div className={`d-flex align-items-center justify-content-center border-2 border-dashed rounded-5 p-4 text-center ${fe.foto ? "border-danger" : "border-light"}`} style={{ borderStyle: "dashed", backgroundColor: "#fafafa" }}>
                    {f.foto ? (
                      <div className="position-relative">
                        <img src={f.foto} alt="Preview" style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "25px" }} />
                        <button type="button" className="btn btn-sm btn-danger position-absolute top-0 end-0 rounded-circle" onClick={() => setF({...f, foto: ""})}>×</button>
                      </div>
                    ) : (
                      <label style={{ cursor: "pointer" }}>
                        <span style={{ fontSize: "2rem" }}>📸</span>
                        <p className="small text-muted mb-0">Clique para fazer upload da imagem</p>
                        <input
                          type="file"
                          accept="image/*"
                          className="d-none"
                          onChange={e => {
                            const file = e.target.files[0];
                            if (!file) return;
                            const r = new FileReader();
                            r.onload = () => {
                              setF(p => ({ ...p, foto: r.result }));
                              setFe(p => ({ ...p, foto: null }));
                            };
                            r.readAsDataURL(file);
                          }}
                        />
                      </label>
                    )}
                  </div>
                  {fe.foto && <div className="text-danger fw-bold mt-2" style={{fontSize: "0.75rem"}}>{fe.foto}</div>}
                </div>

                <button className="btn btn-lg w-100 fw-bold text-white shadow-lg border-0 py-3 hover-grow" style={{ backgroundColor: theme.primary, borderRadius: "100px" }}>
                  FINALIZAR CADASTRO
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .fw-black { font-weight: 900 !important; }
        .hover-grow { transition: all 0.3s ease; }
        .hover-grow:hover { transform: translateY(-3px); filter: brightness(1.1); }
        input:focus, select:focus, textarea:focus { 
          background-color: #fff !important; 
          box-shadow: 0 0 0 4px ${theme.primary}15 !important;
          outline: none;
        }
        .form-check-input:checked {
          background-color: ${theme.primary};
          border-color: ${theme.primary};
        }
      `}</style>
    </div>
  );
}