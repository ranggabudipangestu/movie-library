import { UserRepository } from "../../domain/repositories/user";
import { UserService } from "../../domain/services/user";
import { UserGraphQLController } from "../../infrastructure/controllers/user";


export class UserControllerFactory {
  static make() {
    const repository = new UserRepository();
    const service = new UserService(repository);
    const controller = new UserGraphQLController(service);

    return controller;
  }
}