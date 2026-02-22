import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthCont.jsx";
import { useNavigate } from "react-router-dom";

export default function Adocao() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [pets, setPets] = useState([]);
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [modalAdocao, setModalAdocao] = useState(false);
  const [petSelecionado, setPetSelecionado] = useState(null);
  const [form, setForm] = useState({ nome: "", cpf: "", telefone: "" });
  const [erro, setErro] = useState("");

  // Estilos de Cores Profissionais
  const theme = {
    primary: "#10ac84",
    primaryDark: "#0d8d6d",
    secondary: "#222f3e",
    accent: "#ff9f43",
    light: "#f8fafc",
    white: "#ffffff",
    grayText: "#64748b"
  };

  useEffect(() => {
    setPets(JSON.parse(localStorage.getItem("pets")) || []);
    setSolicitacoes(JSON.parse(localStorage.getItem("solicitacoes")) || []);
  }, []);

  const atualizarDados = (novosPets, novasSols) => {
    setPets(novosPets);
    setSolicitacoes(novasSols);
    localStorage.setItem("pets", JSON.stringify(novosPets));
    localStorage.setItem("solicitacoes", JSON.stringify(novasSols));
  };

  const handleNomeChange = (e) => {
    const v = e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
    setForm({ ...form, nome: v });
  };

  const handleTelefoneChange = (e) => {
    const v = e.target.value.replace(/[^0-9()-\s]/g, "");
    setForm({ ...form, telefone: v });
  };

  const handleCpfChange = (e) => {
    const v = e.target.value.replace(/\D/g, "");
    setForm({ ...form, cpf: v });
  };

  const enviarSolicitacao = (e) => {
    e.preventDefault();
    if (form.nome.trim().length < 11 || form.cpf.length !== 11) {
      setErro("Preencha o nome completo e o CPF corretamente.");
      return;
    }
    const nova = {
      id: Date.now(),
      petId: petSelecionado.id,
      petNome: petSelecionado.nome,
      adotanteId: user.id,
      userName: form.nome,
      userCpf: form.cpf,
      userTel: form.telefone,
      status: "Pendente"
    };
    atualizarDados(pets, [...solicitacoes, nova]);
    setModalAdocao(false);
    setForm({ nome: "", cpf: "", telefone: "" });
    setErro("");
  };

  const gerenciarSolicitacao = (solId, novoStatus) => {
    const sol = solicitacoes.find(s => s.id === solId);
    const novasSols = solicitacoes.map(s => s.id === solId ? { ...s, status: novoStatus } : s);
    let novosPets = [...pets];
    if (novoStatus === "Aprovado") {
      novosPets = pets.map(p => p.id === sol.petId ? { ...p, statusAdocao: "Adotado" } : p);
    }
    atualizarDados(novosPets, novasSols);
  };

  const verDetalhes = (id) => navigate(`/pet/${id}`);

  const abrirAdocao = (e, pet) => {
    e.stopPropagation(); 
    if (!user) { navigate("/login"); return; }
    setPetSelecionado(pet);
    setModalAdocao(true);
  };

  const disponiveis = pets.filter(p => p.statusAdocao !== "Adotado");
  const adotados = pets.filter(p => p.statusAdocao === "Adotado");
  const minhasSols = user ? solicitacoes.filter(s => s.adotanteId === user.id) : [];
  const solsPendentes = solicitacoes.filter(s => s.status === "Pendente");

  const jaSolicitado = (petId) => {
    if (!user) return false;
    return solicitacoes.some(s => s.petId === petId && s.adotanteId === user.id);
  };

  return (
    <div style={{ backgroundColor: theme.light, minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="container py-5">
        
        {/* Header Elegante */}
        <div className="text-center mb-5">
          <h1 className="fw-bolder mb-2" style={{ color: theme.secondary, letterSpacing: "-1px", fontSize: "2.8rem" }}>
            Mude uma vida <span style={{ color: theme.primary }}>hoje</span>
          </h1>
          <p style={{ color: theme.grayText, fontSize: "1.1rem" }}>Explore nossos amigos que buscam um novo lar e muito carinho.</p>
        </div>

        {/* Vitrine de Pets */}
        <div className="row g-4 justify-content-center">
          {disponiveis.length > 0 ? (
            disponiveis.map(p => (
              <div key={p.id} className="col-sm-6 col-lg-3">
                <div 
                  className="card border-0 shadow-sm h-100" 
                  style={{ borderRadius: "28px", backgroundColor: theme.white, transition: "transform 0.3s ease, box-shadow 0.3s ease", cursor: "pointer", overflow: "hidden" }}
                  onClick={() => verDetalhes(p.id)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ height: "280px", position: "relative" }}>
                    <img src={p.foto} className="w-100 h-100" style={{ objectFit: "cover" }} alt={p.nome} />
                    <div className="position-absolute bottom-0 start-0 m-3 px-3 py-1 rounded-pill" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(4px)", fontSize: "0.7rem", fontWeight: "700", color: theme.secondary }}>
                      {p.porte.toUpperCase()}
                    </div>
                  </div>
                  <div className="card-body p-4 text-center">
                    <h5 className="fw-bold mb-1" style={{ color: theme.secondary }}>{p.nome}</h5>
                    <p className="small mb-4" style={{ color: theme.grayText }}>{p.raca}</p>
                    
                    {(!user || user.role !== "admin") && (
                      !user ? (
                        <button className="btn btn-warning w-100 rounded-pill py-2 fw-bold text-white" style={{ border: "none", background: theme.accent }} onClick={(e) => abrirAdocao(e, p)}>Login para Adotar</button>
                      ) : jaSolicitado(p.id) ? (
                        <button className="btn btn-light w-100 rounded-pill py-2 fw-bold text-muted" disabled>✔ Solicitado</button>
                      ) : (
                        <button className="btn w-100 rounded-pill py-2 fw-bold text-white shadow-sm" style={{ border: "none", backgroundColor: theme.primary }} onClick={(e) => abrirAdocao(e, p)}>Quero Adotar</button>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-5 rounded-5" style={{ background: "#fff", border: "1px dashed #cbd5e1" }}>
              <h4 className="text-muted">Nenhum pet disponível no momento 🐾</h4>
            </div>
          )}
        </div>

        {/* Minhas Solicitações (User) */}
        {user && user.role === "user" && minhasSols.length > 0 && (
          <div className="mt-5 pt-5">
            <h4 className="fw-bold mb-4" style={{ color: theme.secondary }}>📋 Acompanhe seus Pedidos</h4>
            <div className="row g-3">
              {minhasSols.map(s => (
                <div key={s.id} className="col-12 col-md-6">
                  <div className="p-4 bg-white rounded-4 shadow-sm d-flex align-items-center justify-content-between border-0" style={{ cursor: "pointer" }} onClick={() => verDetalhes(s.petId)}>
                    <div className="d-flex align-items-center">
                      <div className="bg-light rounded-circle p-3 me-3">🐶</div>
                      <div>
                        <h6 className="mb-0 fw-bold">{s.petNome}</h6>
                        <small style={{ color: theme.grayText }}>Clique para ver detalhes</small>
                      </div>
                    </div>
                    <span className="badge rounded-pill px-3 py-2" style={{ backgroundColor: s.status === 'Aprovado' ? `${theme.primary}20` : s.status === 'Negado' ? '#fee2e2' : '#fef3c7', color: s.status === 'Aprovado' ? theme.primary : s.status === 'Negado' ? '#ef4444' : theme.accent }}>
                      {s.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Painel Administrativo */}
        {user && user.role === "admin" && (
          <div className="mt-5">
            <div className="card border-0 shadow-lg rounded-5 overflow-hidden mb-5">
              <div className="card-header border-0 py-4 px-4 d-flex justify-content-between align-items-center" style={{ backgroundColor: theme.secondary }}>
                <h5 className="text-white fw-bold mb-0">Solicitações Pendentes</h5>
                <span className="badge bg-white text-dark rounded-pill px-3">{solsPendentes.length}</span>
              </div>
              <div className="p-4 bg-white">
                {solsPendentes.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="small text-uppercase fw-bold" style={{ color: theme.grayText }}>
                        <tr><th>PET</th><th>CANDIDATO</th><th className="text-center">AÇÕES</th></tr>
                      </thead>
                      <tbody>
                        {solsPendentes.map(s => (
                          <tr key={s.id}>
                            <td className="fw-bold" style={{ color: theme.primary, cursor: "pointer" }} onClick={() => verDetalhes(s.petId)}>{s.petNome} 🔍</td>
                            <td>{s.userName} <br/> <small className="text-muted">{s.userTel}</small></td>
                            <td className="text-center">
                              <button className="btn btn-sm px-4 rounded-pill fw-bold text-white me-2 shadow-sm" style={{ backgroundColor: theme.primary, border: "none" }} onClick={() => gerenciarSolicitacao(s.id, "Aprovado")}>Aprovar</button>
                              <button className="btn btn-sm btn-outline-danger px-4 rounded-pill fw-bold" onClick={() => gerenciarSolicitacao(s.id, "Negado")}>Negar</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : <p className="text-center py-4 text-muted">Nenhuma solicitação aguardando.</p>}
              </div>
            </div>

            {/* Galeria de Sucesso */}
            <div className="bg-white p-5 rounded-5 shadow-sm">
              <h5 className="fw-bold mb-4" style={{ color: theme.primary }}>✨ Galeria de Adotados</h5>
              <div className="d-flex gap-4 overflow-auto pb-3">
                {adotados.map(p => (
                  <div key={p.id} className="text-center" style={{ minWidth: "150px", cursor: "pointer" }} onClick={() => verDetalhes(p.id)}>
                    <img src={p.foto} style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "40px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }} alt={p.nome} />
                    <div className="mt-3 fw-bold small text-dark">{p.nome}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal Glassmorphism */}
      {modalAdocao && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(10px)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-2xl" style={{ borderRadius: "40px", padding: "1.2rem" }}>
              <div className="modal-header border-0 pb-0">
                <h3 className="fw-bold" style={{ color: theme.secondary, letterSpacing: "-1px" }}>Formulário de Adoção</h3>
                <button className="btn-close" onClick={() => setModalAdocao(false)}></button>
              </div>
              <form onSubmit={enviarSolicitacao} className="p-4">
                {erro && <div className="alert alert-danger border-0 rounded-4 py-2 small mb-4">{erro}</div>}
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">Nome Completo</label>
                  <input type="text" className="form-control rounded-4 p-3 bg-light border-0 shadow-inner" required value={form.nome} onChange={handleNomeChange} placeholder="Ex: Maria Oliveira" />
                </div>
                <div className="row">
                  <div className="col-6 mb-3">
                    <label className="form-label small fw-bold text-muted">CPF</label>
                    <input type="text" className="form-control rounded-4 p-3 bg-light border-0 shadow-inner" maxLength="11" required value={form.cpf} onChange={handleCpfChange} />
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label small fw-bold text-muted">WhatsApp</label>
                    <input type="text" className="form-control rounded-4 p-3 bg-light border-0 shadow-inner" required value={form.telefone} onChange={handleTelefoneChange} />
                  </div>
                </div>
                <button type="submit" className="btn btn-lg w-100 rounded-pill fw-bold mt-4 text-white shadow-lg" style={{ backgroundColor: theme.primary, border: "none" }}>Enviar Solicitação</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}