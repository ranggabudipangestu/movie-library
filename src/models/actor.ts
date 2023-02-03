import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../infrastructure/database/sequelize';

interface IActor {
  id: number;
  name: string;
}

export class Actor extends Model<IActor, Omit<IActor, 'id'>> {
  declare id: number;
  declare name: string;
}

Actor.init({
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
  tableName: 'actors',
  modelName: 'actors'
})