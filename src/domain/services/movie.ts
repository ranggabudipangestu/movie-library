import { ValidationError } from "../errors/validationError";
import { MovieRepository } from "../repositories/movie"
import { CreateMovie, Movie, MovieFilter, Pagination } from "../dtos/movie"

export interface IMovieService {
  create(input: CreateMovie): Promise<String>
  getAll(filter: MovieFilter, pagination: Pagination): Promise<Movie[]>
  getById(id: Number): Promise<Movie>
  delete(id: Number): Promise<String>
  update(id: Number, input: CreateMovie): Promise<String>
}

export class MovieService implements IMovieService {
  constructor(
    private repository: MovieRepository
  ) { }

  async create(input: CreateMovie): Promise<String> {
    try{
      this._inputValidation(input)
    }catch(error){
      throw new ValidationError(error)
    }

    try {
      const result = await this.repository.create(input);
      if (!result) {
        throw new ValidationError('Failed to create Movie')
      }
      return 'Success'
    } catch (error) {
      throw new Error(error)
    }
  }

  async getById(id: Number): Promise<Movie> {
    try {
      const result = await this.repository.getById(id)
      if(!result) return null
      const data = {
        ...result.movie.dataValues,
        actors: result.actors.map(item => {
          const { actor } = item
          const { id, name } = actor
          return { id, name }
        })
      }
      return data
    } catch (error) {
      throw new Error(error)
    }

  }

  async getAll(filter: MovieFilter, pagination: Pagination): Promise<Movie[]> {
    const result = await this.repository.getAll(filter, pagination)
    return result
  }

  async delete(id: Number): Promise<String> {
    try {
      const result = await this.repository.delete(id)
      if (!result) throw new Error
      return 'Success'
    } catch (error) {
      throw new Error(error)
    }
  }

  async update(id: Number, input:CreateMovie): Promise<String>{
    try{
      this._inputValidation(input)
    }catch(error){
      throw new ValidationError(error)
    }

    try {
      const result = await this.repository.update(id, input);
      if (!result) {
        throw new ValidationError('Failed to Update Movie')
      }

      return 'Data Successfully Updated'
    } catch (error) {
      throw new ValidationError(error)
    }
  }

  _inputValidation(input:CreateMovie): Boolean{
    const { title, actors, authorId } = input
    if (!title) throw new ValidationError('Title cannot be empty')
    if (title.length > 100) throw new ValidationError('Name cannot be empty')
    if (!actors.length) throw new ValidationError('Actor cannot be empty')
    if (!authorId) throw new ValidationError('Actor cannot be empty')
    return true
  }
}