import { ConflictException, Injectable } from "@nestjs/common";
import { CrudService } from '../generics/crud';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  getUserByUserNameOrEmail(username: string, email: string): Promise<User> {
    return this.userRepository.findOne({
      where: [{ username }, { email }],
    });
  }
}
