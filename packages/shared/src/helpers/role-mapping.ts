const role = {
  owner: "Líder",
  admin: "Administrador",
  member: "Membro",
};

export function getRole(roleProp: keyof typeof role) {
  return role[roleProp];
}
