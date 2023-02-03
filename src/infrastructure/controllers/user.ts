import { Token } from "../../domain/dtos/user"
import { UserService } from "../../domain/services/user"

interface IUserController{
  signUp(_, { input }, req): Promise<String>
  signIn(_, { input }, req): Promise<Token>
}
export class UserGraphQLController implements IUserController{
  constructor(
    private service: UserService
  ){}

  async signUp(_, { input }, req):Promise<String>{
    try{
      return await this.service.signUp(input)
    }catch(err){
      throw new Error(err)
    }
  }

  async signIn(_, { input }, req):Promise<Token>{
    try{
      return await this.service.signIn(input)
    }catch(err){
      throw new Error(err)
    }
  }
  

  init() {
    return {
      query: {},
      mutation: {
        signUp: (_, args, req) => this.signUp(_, args, req),
        signIn: (_, args, req) => this.signIn(_, args, req),
      }
    }
  }
}
