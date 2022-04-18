import { Injectable } from "@nestjs/common";
import { CrudService } from "../generics/crud";
import { User, UserRoleEnum } from "./entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterDto } from "../auth/dto/register.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService extends CrudService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async create(registerDto: RegisterDto): Promise<User> {
    const user = this.userRepository.create(registerDto);
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
    user.role = UserRoleEnum.user;
    return this.userRepository.save(user);
  }

  async getUserByUserNameOrEmail(
    username: string,
    email: string,
  ): Promise<User> {
    console.log('in getUserBy....');
    const user = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });
    console.log(user);
    return user;
  }
}
