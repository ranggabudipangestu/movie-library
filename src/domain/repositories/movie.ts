import { Movie, MovieActor } from "../../models/movie";
import * as dto from "../../domain/dtos/movie";
import { sequelize } from '../../infrastructure/database/sequelize';
import { Actor } from "../../models/actor";
import { Author } from "../../models/author";
import { filterHandler } from "../../infrastructure/utils/filterHandler";
import { QueryTypes } from "sequelize";

interface IMovieRepository {
  create(input: dto.CreateMovie): Promise<Boolean>
  getAll(filter: dto.MovieFilter, pagination: dto.Pagination): Promise<any>
  getById(id: number): Promise<any>
  delete(id: Number): Promise<any>
  update(id: Number, input:dto.CreateMovie): Promise<any>
}

export class MovieRepository implements IMovieRepository {
  async create(input: dto.CreateMovie): Promise<Boolean> {
    try {
      await sequelize.transaction(async (t) => {

        const movie = await Movie.create({
          title: input.title,
          description: input.description,
          authorId: input.authorId
        }, { transaction: t });

        const arrActors: Array<any> = []
        input.actors.forEach(data => {
          arrActors.push({
            movieId: movie.id,
            actorId: data
          })
        })

        await MovieActor.bulkCreate(arrActors, { returning: true, transaction:t })

        return true;

      });
      return true
    } catch (error) {
      return false
    }
  }

  async getAll(filter: dto.MovieFilter, pagination: dto.Pagination): Promise<any> {
    let strFilter: String = ''
    let strPagination: String = ''
    let arrParams: Array<any> = []

    if(filter){
      if (filter.actorId) {
        strFilter += filterHandler(arrParams) + ` movie_actors.actorId = ?`
        arrParams.push(filter.actorId)
      }
  
      if (filter.title) {
        strFilter += filterHandler(arrParams) + ` movies.title LIKE ?`
        arrParams.push(`%${filter.title}%`)
      }
  
      if (filter.description) {
        strFilter += filterHandler(arrParams) + ` movies.description LIKE ?`
        arrParams.push(`%${filter.description}%`)
      }
  
      if (filter.authorId) {
        strFilter += filterHandler(arrParams) + ` movies.authorId = ?`
        arrParams.push(filter.authorId)
      }
    }
    
    if(pagination){
      if(pagination.limit){
        strPagination += ' LIMIT ?'
        arrParams.push(pagination.limit)
      }
  
      if(pagination.page){
        strPagination += ' OFFSET ?'
        arrParams.push(Number(pagination.page)-1)
      }
    }

    const result = await sequelize.query(
      `Select 
      movies.id as id, 
      movies.title as title, 
      movies.description as description,
      authors.id as 'author.id',
      authors.name as 'author.name'
      from movies 
      JOIN authors ON authors.id = movies.authorId
      JOIN movie_actors ON movie_actors.movieId = movies.id
      ${strFilter}
      GROUP BY movies.id
      ${strPagination}
      `,
      {
        nest: true,
        replacements: arrParams,
        type: QueryTypes.SELECT
      })
    return result
  }

  async getById(id: Number): Promise<any> {
    const movie = await Movie.findOne({
      include: [
        { model: Author, as: "author" },
      ],
      where: { id },
      type:QueryTypes.SELECT
    })

    if(!movie) return null

    const actors = await MovieActor.findAll({
      include: [
        { model: Actor, as: "actor" },
      ],
      where: {
        movieId: movie.id
      },
      type:QueryTypes.SELECT
    })
    return { movie, actors }
  }

  async delete(id: Number): Promise<any> {
    try {
      await sequelize.transaction(async (t) => {
        await Movie.destroy({ where: { id }, transaction:t })
        await MovieActor.destroy({
          where: {
            movieId: id
          },
          transaction:t
        })
  
      });
      return true;
    }catch(error){
      return false
    }
  }

  async update(id: Number, input:dto.CreateMovie): Promise<any> {
    try {
      await sequelize.transaction(async (t) => {

        await MovieActor.destroy({
          where:{ 
            movieId: id 
          },
          transaction: t
        })

        await Movie.update({
          title: input.title,
          description: input.description,
          authorId: input.authorId,
        }, { where:{ id }, transaction:t })

        const arrActors: Array<any> = []
        input.actors.forEach(data => {
          arrActors.push({
            movieId: id,
            actorId: data
          })
        })

        await MovieActor.bulkCreate(arrActors, { returning: true, transaction:t })

      });
      return true
    } catch (error) {
      return false
    }
  }
}