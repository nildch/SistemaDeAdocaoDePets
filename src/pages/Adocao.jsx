import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthCont.jsx";

const R = {
  nome: /^[A-Za-zÀ-ÿ\s]*$/,
  cpf: /^\d*$/,
  telefone: /^\d*$/
};

const LABELS = {
  nome: "Nome completo",
  email: "E-mail",
  cpf: "CPF",
  telefone: "Telefone"
};

export default function Adocao() {
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  const [pets, setPets] = useState([]);
  const [modal, setModal] = useState(false);
  const [pet, setPet] = useState(null);
  const [solicitacoes, setSolicitacoes] = useState([]);

  const [form, setForm] = useState({ nome: "", email: "", cpf: "", telefone: "" });
  const [fe, setFe] = useState({});

  useEffect(() => {
    if (!user) return nav("/");
    setPets(JSON.parse(localStorage.getItem("pets")) || []);
    setSolicitacoes(JSON.parse(localStorage.getItem("solicitacoes")) || []);
  }, [user, nav]);

  const salvarPets = lista => {
    setPets(lista);
    localStorage.setItem("pets", JSON.stringify(lista));
  };

  const petsParaMostrar = user?.role === "admin" 
    ? pets 
    : pets.filter(p => p.statusAdocao === "Disponível");

  const adotados = pets.filter(p => p.statusAdocao === "Adotado");

  const marcarAdotado = id =>
    salvarPets(
      pets.map(p => p.id === id ? { ...p, statusAdocao: "Adotado" } : p)
    );

  const remover = id =>
    window.confirm("Remover pet?") &&
    salvarPets(pets.filter(p => p.id !== id));

  const alterarStatus = (id, novoStatus) => {
    const lista = solicitacoes.map(s => s.id === id ? { ...s, status: novoStatus } : s);
    setSolicitacoes(lista);
    localStorage.setItem("solicitacoes", JSON.stringify(lista));
  };

  const abrir = p => { setPet(p); setModal(true); };
  const fechar = () => { setModal(false); setForm({ nome:"", email:"", cpf:"", telefone:"" }); setFe({}); };

  const liveValidate = (name, value) => {
    let error = null;
    if (name === "nome") {
      if (!R.nome.test(value)) error = "O campo Nome aceita apenas letras e espaços";
      else if (value && value.length < 11) error = "Nome deve ter no mínimo 11 caracteres";
    }
    if (name === "email" && value && !value.includes("@")) error = "Informe um e-mail válido";
    if (name === "cpf") {
      if (!R.cpf.test(value)) error = "CPF aceita apenas números";
      else if (value && value.length !== 11) error = "CPF deve conter 11 números";
    }
    if (name === "telefone") {
      if (!R.telefone.test(value)) error = "Telefone aceita apenas números";
      else if (value && (value.length < 8 || value.length > 15)) error = "Telefone deve ter entre 8 e 15 números";
    }
    setFe(p => ({ ...p, [name]: error }));
    return error;
  };

  const ch = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    liveValidate(name, value);
  };

  const validarFinal = () => {
    const e = {};
    Object.keys(LABELS).forEach(k => { if (!form[k]) e[k] = `O campo ${LABELS[k]} é obrigatório`; });
    Object.keys(form).forEach(k => { const err = liveValidate(k, form[k]); if (err) e[k] = err; });
    setFe(e);
    return !Object.keys(e).length;
  };

  const enviar = e => {
    e.preventDefault();
    if (!validarFinal()) return;
    const novaSolicitacao = { id: Date.now(), petId: pet.id, petNome: pet.nome, adotante: { ...form }, status: "Pendente", data: new Date().toLocaleString() };
    const lista = [...solicitacoes, novaSolicitacao];
    setSolicitacoes(lista);
    localStorage.setItem("solicitacoes", JSON.stringify(lista));
    alert("Solicitação enviada com sucesso!");
    fechar();
  };

  return (
    <div style={{ backgroundColor: "#fdfdfd", minHeight: "100vh", paddingBottom: "50px" }}>
      <div className="container py-5">
        <header className="text-center mb-5">
          <h1 className="fw-bold display-4" style={{ color: "#FF6F00" }}>Encontre seu Novo Amigo</h1>
          <p className="text-muted fs-5">
            {user?.role === "admin" 
              ? `Painel de Gerenciamento: ${petsParaMostrar.length} pets cadastrados` 
              : `Existem ${petsParaMostrar.length} amiguinhos esperando por você`}
          </p>
        </header>

        {/* LISTA PETS */}
        <div className="row g-4">
          {petsParaMostrar.map(p => (
            <div key={p.id} className="col-md-6 col-lg-4">
              <div 
                className={`card h-100 shadow-sm border-0 ${p.statusAdocao === "Adotado" ? "opacity-75" : ""}`}
                style={{ borderRadius: "20px", overflow: "hidden", transition: "0.3s" }}
              >
                <div style={{ position: "relative" }}>
                  <img src={p.foto} alt={p.nome} style={{ height: "250px", width: "100%", objectFit: "cover" }} />
                  <span 
                    className={`badge position-absolute top-0 end-0 m-3 px-3 py-2 ${p.statusAdocao === "Adotado" ? "bg-success" : "bg-warning text-dark"}`}
                    style={{ borderRadius: "10px" }}
                  >
                    {p.statusAdocao}
                  </span>
                </div>

                <div className="card-body text-center p-4">
                  <h4 className="fw-bold mb-1" style={{ color: "#333" }}>{p.nome}</h4>
                  <p className="text-muted mb-4">{p.especie} • {p.porte}</p>

                  <div className="d-grid gap-2">
                    {user?.role === "user" && (
                      <button className="btn btn-warning fw-bold py-2" style={{ borderRadius: "12px" }} onClick={() => abrir(p)}>
                        Adotar
                      </button>
                    )}

                    {user?.role === "admin" && (
                      <>
                        {p.statusAdocao === "Disponível" && (
                          <button className="btn btn-success fw-bold py-2" style={{ borderRadius: "12px" }} onClick={() => marcarAdotado(p.id)}>
                            Marcar como Adotado
                          </button>
                        )}
                        <button className="btn btn-outline-danger btn-sm border-2 fw-bold" style={{ borderRadius: "10px" }} onClick={() => remover(p.id)}>
                          Remover do Sistema
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        
        {user?.role === "user" && (
          <section className="mt-5 pt-5 border-top">
            <h3 className="fw-bold text-center mb-4" style={{ color: "#FF6F00" }}>Minhas solicitações</h3>
            <div className="row justify-content-center g-3">
              {solicitacoes.filter(s => s.adotante.email === user.email).map(s => (
                <div key={s.id} className="col-md-6">
                  <div className="card shadow-sm border-0 p-3" style={{ borderRadius: "15px", backgroundColor: "#fff" }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1 fw-bold">Pet: {s.petNome}</h6>
                        <small className="text-muted">{s.data}</small>
                      </div>
                      <span className={`badge ${s.status === "Aprovado" ? "bg-success" : s.status === "Recusado" ? "bg-danger" : "bg-warning text-dark"}`}>
                        {s.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {user?.role === "admin" && (
          <section className="mt-5 pt-5 border-top">
            <h3 className="fw-bold text-center mb-4 text-primary">Gerenciar Pedidos de Adoção</h3>
            <div className="table-responsive shadow-sm bg-white p-3" style={{ borderRadius: "20px" }}>
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Pet</th>
                    <th>Adotante</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {solicitacoes.map(s => (
                    <tr key={s.id}>
                      <td className="fw-bold">{s.petNome}</td>
                      <td>{s.adotante.nome}<br/><small className="text-muted">{s.adotante.telefone}</small></td>
                      <td><span className="badge bg-light text-dark border">{s.status}</span></td>
                      <td>
                        {s.status === "Pendente" && (
                          <div className="btn-group shadow-sm">
                            <button className="btn btn-success btn-sm" onClick={() => alterarStatus(s.id, "Aprovado")}>Aprovar</button>
                            <button className="btn btn-danger btn-sm" onClick={() => alterarStatus(s.id, "Recusado")}>Recusar</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>

      {modal && (
        <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <form className="modal-content border-0 shadow-lg" style={{ borderRadius: "20px" }} onSubmit={enviar}>
              <div className="modal-header border-0">
                <h5 className="fw-bold">Adotar {pet.nome}</h5>
                <button type="button" className="btn-close" onClick={fechar} />
              </div>
              <div className="modal-body p-4">
                {Object.keys(LABELS).map(c => (
                  <div key={c} className="mb-3">
                    <label className="form-label small fw-bold text-muted">{LABELS[c]}</label>
                    <input name={c} value={form[c]} onChange={ch} className={`form-control border-0 bg-light p-2 ${fe[c] ? "is-invalid" : ""}`} style={{ borderRadius: "10px" }} />
                    {fe[c] && <div className="invalid-feedback d-block">{fe[c]}</div>}
                  </div>
                ))}
              </div>
              <div className="modal-footer border-0 pb-4">
                <button type="button" className="btn btn-light px-4" onClick={fechar}>Cancelar</button>
                <button className="btn btn-success px-5 fw-bold" style={{ borderRadius: "10px", backgroundColor: "#2ecc71", border: "none" }}>Enviar pedido</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}