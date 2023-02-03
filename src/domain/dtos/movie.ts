import { Author } from '../dtos/author'
import { Actor } from '../dtos/actor'

export interface CreateMovie {
  title: String
  description: String
  authorId: Number
  actors: Array<Number>
}

export interface MovieFilter {
  title: String
  description: String
  authorId: Number
  actorId: Number
}

export interface Pagination {
  page: Number
  limit: Number
}

export interface Movie {
  id: Number;
  title: String
  description: String
  author: Author
  actors: Actor[]
}
