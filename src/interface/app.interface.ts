export interface IConfig {
  PORT: number;
  DB_URI: string;
  // AUTH_SECRET: string;
}

export interface IAuth {
  name: string;
  email: string;
  imageURL: string;
  password: string;
  repeatPassword: string;
  roles: string;
}
