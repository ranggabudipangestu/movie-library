import { Author } from "../../models/author";

interface IAuthorRepository{
  create({ name }): Promise<Author>
  getAuthors(): Promise<Author[]>
  getById(id: number): Promise<Author>
}

export class AuthorRepository implements IAuthorRepository {
  async create({ name }): Promise<Author>{
    return Author.create({ name });
  }

  async getAuthors(): Promise<Author[]>{
    return Author.findAll({ attributes: ['id', 'name'] })
  }

  async getById(id: number): Promise<Author>{
    return Author.findOne({ where:{ id }, attributes: ['id', 'name'] })
  }
}