import { MovieRepository } from "../../domain/repositories/movie";
import { MovieService } from "../../domain/services/movie";
import { MovieGraphQLController } from "../../infrastructure/controllers/movie";


export class MovieControllerFactory {
  static make() {
    const repository = new MovieRepository();
    const service = new MovieService(repository);
    const controller = new MovieGraphQLController(service);

    return controller;
  }
}