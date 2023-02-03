import { AuthorControllerFactory } from "../../../application/factories/author"
import { MovieControllerFactory } from "../../../application/factories/movie"
import { ActorControllerFactory } from "../../../application/factories/actor"
import { UserControllerFactory } from "../../../application/factories/user"

const authorControllerFactory = AuthorControllerFactory.make().init()
const movieControllerFactory = MovieControllerFactory.make().init()
const actorControllerFactory = ActorControllerFactory.make().init()
const userControllerFactory = UserControllerFactory.make().init()

export const resolver = () => {
  return {
    Query:{
      ...authorControllerFactory.query,
      ...movieControllerFactory.query,
      ...actorControllerFactory.query,
      ...userControllerFactory.query
    },
    Mutation: {
      ...authorControllerFactory.mutation,
      ...movieControllerFactory.mutation,
      ...actorControllerFactory.mutation,
      ...userControllerFactory.mutation
    }
  }
};
