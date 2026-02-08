// serviços para salvar/pegar pets do localStorage

export function savePet(pet) {
  const pets = JSON.parse(localStorage.getItem("pets")) || [];
  pets.push(pet);
  localStorage.setItem("pets", JSON.stringify(pets));
}

export function getPets() {
  return JSON.parse(localStorage.getItem("pets")) || [];
}

export function getPetById(id) {
  const pets = getPets();
  return pets.find(p => p.id === Number(id));
}
