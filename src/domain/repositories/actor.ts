import { Actor } from "../../models/actor";

interface IActorRepository{
  create({ name }): Promise<Actor>
  getActors(): Promise<Actor[]>
  getById(id: number): Promise<Actor>
}

export class ActorRepository implements IActorRepository {
  async create({ name }): Promise<Actor>{
    return Actor.create({ name });
  }

  async getActors(): Promise<Actor[]>{
    return Actor.findAll({ attributes: ['id', 'name'] })
  }

  async getById(id: number): Promise<Actor>{
    return Actor.findOne({ where:{ id }, attributes: ['id', 'name'] })
  }
}