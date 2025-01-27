export interface TUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  isBlocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TUserLogin {
  email: string;
  password: string;
}

export interface TUserRegister {
  name: string;
  email: string;
  password: string;
}

export interface TUserUpdate {
  name: string;
  email: string;
  password: string;
}

export interface TUserBlock {
  isBlocked: boolean;
}

export interface TUserChangeRole {
  role: "user" | "admin";
}

export interface TUserResponse {
  data: TUser;
}
