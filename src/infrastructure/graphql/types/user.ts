export const userSchema = `#graphql
  type Token {
    token: String!
  }

  input SignUp{
    email: String!
    username: String!
    password: String!
  }

  input SignIn{
    email: String!
    password: String!
  }

  type Mutation {
    signUp(input:SignUp):String
    signIn(input:SignIn):Token
  }

`;
