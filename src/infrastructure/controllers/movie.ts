import { Movie } from "../../domain/dtos/movie"
import { MovieService } from "../../domain/services/movie"
import Jwt from "../utils/token"

interface IMovieController {
  createMovie(_, { input }, req): Promise<String>
  updateMovie(_, { id, input }, req): Promise<String>
  deleteMovie(_, { id }, req): Promise<String>
  getMovies(_, { filter, pagination }, req): Promise<Movie[]>
  getMovieById(_, { id }, req): Promise<Movie>

}
export class MovieGraphQLController implements IMovieController {
  private jwt: Jwt
  constructor(
    private service: MovieService
  ) {
    this.jwt = new Jwt()
  }

  async createMovie(_, { input }, req): Promise<String> {
    await this.jwt.validToken(req.token)
    try {
      const result = await this.service.create(input)
      return result
    } catch (err) {
      throw new Error('INTERNAL_SERVER_ERROR')
    }
  }

  async updateMovie(_, { id, input }, req): Promise<String> {
    await this.jwt.validToken(req.token)
    try {
      const result = await this.service.update(id, input)
      return result
    } catch (err) {
      throw new Error('INTERNAL_SERVER_ERROR')
    }
  }

  async deleteMovie(_, { id }, req): Promise<String> {
    await this.jwt.validToken(req.token)
    try {
      const result = await this.service.delete(id)
      return result
    } catch (err) {
      throw new Error('INTERNAL_SERVER_ERROR')
    }
  }

  async getMovies(_, { filter, pagination }, req): Promise<Movie[]> {
    const result = await this.service.getAll(filter, pagination)
    return result
  }

  async getMovieById(_, { id }, req): Promise<Movie> {
    const result = await this.service.getById(id)
    return result

  }


  init() {
    return {
      query: {
        getMovies: (_, args, req) => this.getMovies(_, args, req),
        getMovieById: (_, args, req) => this.getMovieById(_, args, req)
      },
      mutation: {
        createMovie: (_, args, req) => this.createMovie(_, args, req),
        updateMovie: (_, args, req) => this.updateMovie(_, args, req),
        deleteMovie: (_, args, req) => this.deleteMovie(_, args, req),
      }
    }
  }
}