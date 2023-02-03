export const actorSchema = `#graphql
  type Actor {
    id: Int
    name: String
  }

  input CreateActor{
    name: String!
  }

  type Mutation {
    createActor(input:CreateActor):Actor
  }

  type Query {
    getActors: [Actor]
    getActorById(id: Int!): Actor
  }
`;
