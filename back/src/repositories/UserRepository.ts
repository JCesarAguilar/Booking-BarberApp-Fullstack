import { AppDataSource } from '../config/data-source';
import { User } from '../entities/UserEntity';

const UserRepository = AppDataSource.getRepository(User).extend({
  findById: async function (id: number) {
    const userFounded = await this.findOne({
      where: { id },
      relations: ['appointments']
    });
    if (userFounded) return userFounded;
    else throw Error;
  }
});

export default UserRepository;
