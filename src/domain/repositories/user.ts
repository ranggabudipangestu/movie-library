import { Op } from "sequelize";
import { User } from "../../models/user";

interface IUserRepository{
  create({ email, password, username }): Promise<any>
  getUserByEmailOrUsername({ email }): Promise<User>
}

export class UserRepository implements IUserRepository {
  async create({email, password, username}): Promise<any> {
    try{
      await User.create({
        email,
        username,
        password
      });
      return true
    }catch(error){
      return false
    }
  }

  async getUserByEmailOrUsername({ email }): Promise<User> {
    const getData = await User.findOne({
      where:{
        [Op.or]: [
          { email },
          { username: email }
        ]
      },
    })

    return getData
  }
}