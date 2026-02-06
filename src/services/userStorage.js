// serviços para salvar/pegar usuários do localStorage

export function saveUser(user) {
  const users = JSON.parse(localStorage.getItem("usuarios")) || [];
  users.push(user);
  localStorage.setItem("usuarios", JSON.stringify(users));
}

export function getUsers() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}
