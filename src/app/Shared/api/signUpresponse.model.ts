export interface User {
  name: string;
  email: string;
  age: number;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface signUpResponse {
  user: User;
  token: string;
}
