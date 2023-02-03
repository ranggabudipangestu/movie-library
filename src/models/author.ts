import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../infrastructure/database/sequelize';

interface IAuthor {
  id: number;
  name: string;
}

export class Author extends Model<IAuthor, Omit<IAuthor, 'id'>> {
  declare id: number;
  declare name: string;
}

Author.init({
  id: {
    type: DataTypes.INTEGER, 
    primaryKey: true,
    autoIncrement: true
  }, 
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  tableName: 'authors',
  modelName:"author"
})