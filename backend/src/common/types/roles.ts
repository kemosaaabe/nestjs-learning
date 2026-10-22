export const rolesMap = {
  admin: 'admin',
  user: 'user',
} as const;

export type RolesType = (typeof rolesMap)[keyof typeof rolesMap];
