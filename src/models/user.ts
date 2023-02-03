import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../infrastructure/database/sequelize';

interface IUser {
  id: Number;
  email: String;
  username: String;
  password: String;
  
}

export class User extends Model<IUser, Omit<IUser, 'id'>> {
  declare id: Number;
  declare email: String;
  declare username: String;
  declare password: String;
}

User.init({
  id: {
    type: DataTypes.INTEGER, 
    primaryKey: true,
    autoIncrement: true
  }, 
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'users'
})