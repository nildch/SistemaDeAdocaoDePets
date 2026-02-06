// serviços para salvar autenticação (usuário logado)

export function saveAuth(user) {
  localStorage.setItem("auth", JSON.stringify(user));
}

export function getAuth() {
  return JSON.parse(localStorage.getItem("auth"));
}

export function removeAuth() {
  localStorage.removeItem("auth");
}
