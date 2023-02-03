import { ValidationError } from "../errors/validationError";
import { ActorRepository } from "../repositories/actor"
import { CreateActor, Actor } from "../dtos/actor"

export interface IActorService {
  create(input: CreateActor): Promise<Actor>
  getAll(): Promise<Actor[]>
  getById(id: number): Promise<Actor>
}

export class ActorService implements IActorService {
  constructor(
    private repository: ActorRepository
  ){}

  async create(input: CreateActor): Promise<Actor> {
    try{
      const { name } = input
      if(!name) throw new ValidationError('Name cannot be empty')
      if(name.length > 100) throw new ValidationError('Name cannot be empty')
  
      const result = await this.repository.create({ name: input.name });
      return result
    }catch(err){
      throw new ValidationError('INTERNAL_SERVER_ERROR')
    }
  }

  async getAll(): Promise<Actor[]>{
    const result = await this.repository.getActors()
    return result
  }

  async getById(id: number): Promise<Actor>{
    return await this.repository.getById(id)
  }
}