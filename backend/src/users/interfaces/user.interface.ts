export interface User {
  id: number;
  name: string;
  email: string;
}

export type CreateUserDto = Omit<User, 'id'>;
