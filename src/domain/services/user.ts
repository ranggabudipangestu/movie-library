import { ValidationError } from "../errors/validationError";
import { UserRepository } from "../repositories/user"
import { CreateUser, Login, Token } from "../dtos/user"
import Jwt from "../../infrastructure/utils/token";
import Hash from "../../infrastructure/utils/hashing";

export interface IUserService {
  signUp(input:CreateUser): Promise<String>
  signIn(input: Login): Promise<Token>
}

export class UserService implements IUserService {
  private hashing:Hash
  private jwt: Jwt
  
  constructor(
    private repository: UserRepository
  ){
    this.hashing = new Hash()
    this.jwt = new Jwt()
  }

  async signUp(input: CreateUser): Promise<String> {
    try{
      let { email, username, password } = input
      if(!email || email.length === 0) throw new ValidationError('Email cannot be empty')
      if(!username || username.length === 0) throw new ValidationError('Username cannot be empty')
      
      const checkExists = await this.repository.getUserByEmailOrUsername({ email })
      if(checkExists) throw new ValidationError('Email or Username is already exist')
      password = this.hashing.hash(password)
      const result = await this.repository.create({ email, username, password });
      if(!result) new Error('Failed to Signup')
      return 'Successfully signUp'
    }catch(err){
      console.log(err)
      throw new ValidationError(err)
    }
  }

  async signIn(input: Login): Promise<Token> {
    try{
      const { email, password } = input
      if(!email || email.length === 0) throw new ValidationError('Email cannot be empty')
  
      const result = await this.repository.getUserByEmailOrUsername({ email });
      if(!result) throw new ValidationError('Email or Username is not registered')

      const isSame = await this.hashing.compare(password, result.password);

      if(result && isSame){
        const token = this.jwt.encode({
          id: result.id,
          email: result.email,
          username: result.username
        })
        return {
          token
        }
      }

    }catch(err){
      throw new Error(err)
    }
  }

 
}