export const authorSchema = `#graphql
  type Author {
    id: Int
    name: String
  }

  input CreateAuthor{
    name: String!
  }

  type Mutation {
    createAuthor(input:CreateAuthor):Author
  }

  type Query {
    getAuthors: [Author]
    getAuthorById(id: Int!): Author
  }
`;
