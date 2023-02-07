import { Actor } from "../../domain/dtos/actor"
import { ActorService } from "../../domain/services/actor"
import Jwt from "../utils/token"

interface IActorController{
  create(_, { input }, req): Promise<Actor>
  getActors(): Promise<Actor[]>
  getActorById(_, { id }, req): Promise<Actor>
}
export class ActorGraphQLController implements IActorController{
  private jwt: Jwt
  constructor(
    private service: ActorService
  ){
    this.jwt = new Jwt()
  }

  async create(_, { input }, req):Promise<Actor>{
    await this.jwt.validToken(req.token)
    try{
      return await this.service.create(input)
    }catch(err){
      throw new Error(err)
    }
  }

  async getActors(): Promise<Actor[]>{
    try{
      return await this.service.getAll()
    }catch(err){
      throw new Error(err)
    }
  }

  async getActorById(_, { id }, req): Promise<Actor>{
    try{
      return await this.service.getById(Number(id))
    }catch(err){
      throw new Error(err)
    }
  }
  

  init() {
    return {
      query: {
        getActors: (_, args, req) => this.getActors(),
        getActorById: (_, args, req) => this.getActorById(_, args, req),
      },
      mutation: {
        createActor: (_, args, req) => this.create(_, args, req),
      }
    }
  }
}
