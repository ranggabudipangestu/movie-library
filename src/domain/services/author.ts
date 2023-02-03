import { ValidationError } from "../errors/validationError";
import { AuthorRepository } from "../repositories/author"
import { CreateAuthor, Author } from "../dtos/author"

export interface IAuthorService {
  create(input: CreateAuthor): Promise<Author>
  getAll(): Promise<Author[]>
  getById(id: number): Promise<Author>
}

export class AuthorService implements IAuthorService {
  constructor(
    private repository: AuthorRepository
  ){}

  async create(input: CreateAuthor): Promise<Author> {
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

  async getAll(): Promise<Author[]>{
    const result = await this.repository.getAuthors()
    return result
  }

  async getById(id: number): Promise<Author>{
    return await this.repository.getById(id)
  }
}