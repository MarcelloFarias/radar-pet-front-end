export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface UserRegistration {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface UserLogin {
  email: string;
  password: string;
}
