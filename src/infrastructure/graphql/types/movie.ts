export const movieSchema = `#graphql
  type Movie {
    id: Int
    title: String
    description: String
    author: Author
    actors: [Actor]
  }

  input CreateMovie{
    title: String!
    description: String
    authorId: Int!
    actors:[Int]
  }

  input MovieFilter {
    title: String
    description: String
    authorId: Int
    actorId: Int
  }

  input Pagination {
    page: Int
    limit: Int
  }

  type Mutation {
    createMovie(input:CreateMovie): String
    updateMovie(id: Int, input:CreateMovie): String
    deleteMovie(id: Int): String
  }

  type Query {
    getMovies(filter:MovieFilter, pagination:Pagination): [Movie]
    getMovieById(id: Int!): Movie
  }
`;
