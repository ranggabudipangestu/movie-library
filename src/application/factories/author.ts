import { AuthorRepository } from "../../domain/repositories/author";
import { AuthorService } from "../../domain/services/author";
import { AuthorGraphQLController } from "../../infrastructure/controllers/author";


export class AuthorControllerFactory {
  static make() {
    const repository = new AuthorRepository();
    const service = new AuthorService(repository);
    const controller = new AuthorGraphQLController(service);

    return controller;
  }
}