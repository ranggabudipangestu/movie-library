export interface CreateUser {
  email: String;
  username: String;
  password: String;
}

export interface Login {
  email: String;
  password: String;
}

export interface Token {
  token: String
}
