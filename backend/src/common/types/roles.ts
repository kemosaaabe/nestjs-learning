export const rolesMap = {
  admin: 'admin',
  user: 'user',
  manager: 'manager',
} as const;

export type RolesType = (typeof rolesMap)[keyof typeof rolesMap];
