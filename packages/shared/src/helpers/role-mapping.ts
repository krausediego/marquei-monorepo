const role = {
  owner: "Proprietário",
  admin: "Administrador",
  member: "Membro",
};

export type RoleProp = keyof typeof role;

export function getRole(roleProp: RoleProp) {
  return role[roleProp];
}
