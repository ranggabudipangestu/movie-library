import { Author } from "../../domain/dtos/author"
import { AuthorService } from "../../domain/services/author"
import Jwt from "../utils/token"

interface IAuthorController{
  create(_, { input }, req): Promise<Author>
  getAuthors(): Promise<Author[]>
  getAuthorById(_, { id }, req): Promise<Author>
}
export class AuthorGraphQLController implements IAuthorController{
  private jwt: Jwt
  constructor(
    private service: AuthorService
  ){ this.jwt = new Jwt() }

  async create(_, { input }, req):Promise<Author>{
    await this.jwt.validToken(req.token)
    try{
      return await this.service.create(input)
    }catch(err){
      throw new Error(err)
    }
  }

  async getAuthors(): Promise<Author[]>{
    try{
      return await this.service.getAll()
    }catch(err){
      throw new Error(err)
    }
  }

  async getAuthorById(_, { id }, req): Promise<Author>{
    try{
      return await this.service.getById(Number(id))
    }catch(err){
      throw new Error(err)
    }
  }
  

  init() {
    return {
      query: {
        getAuthors: (_, args, req) => this.getAuthors(),
        getAuthorById: (_, args, req) => this.getAuthorById(_, args, req),
      },
      mutation: {
        createAuthor: (_, args, req) => this.create(_, args, req),
      }
    }
  }
}
