import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../infrastructure/database/sequelize';
import { Actor } from './actor';
import { Author } from './author';

interface IMovie {
  id: Number;
  title: String;
  description: String;
  authorId: Number
}

export class Movie extends Model<IMovie, Omit<IMovie, 'id'>> {
  declare id: Number;
  declare title: String;
  declare description: String;
  declare authorId: Number
}

Movie.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'movies'
})

interface IMovieActor {
  id: Number;
  movieId: Number;
  actorId: Number;
}

export class MovieActor extends Model<IMovieActor, Omit<IMovieActor, 'id'>>{
  declare id: Number;
  declare movieId: Number;
  declare actorId: Number
}

MovieActor.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  actorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

}, {
  sequelize,
  tableName: 'movie_actors',
  modelName: 'movie_actors'
})

Author.hasMany(Movie)
Movie.belongsTo(Author);

Movie.hasMany(MovieActor);
MovieActor.belongsTo(Movie)

Actor.hasMany(MovieActor)
MovieActor.belongsTo(Actor)