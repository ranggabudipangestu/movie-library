import { ActorRepository } from "../../domain/repositories/actor";
import { ActorService } from "../../domain/services/actor";
import { ActorGraphQLController } from "../../infrastructure/controllers/actor";


export class ActorControllerFactory {
  static make() {
    const repository = new ActorRepository();
    const service = new ActorService(repository);
    const controller = new ActorGraphQLController(service);

    return controller;
  }
}