import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  // register(registerDto: RegisterDto): Promise<User> {
  //   /*
  //    * Todo
  //    *  Get username + password
  //    *  verify if username exit or not
  //    *  crypt password
  //    *  save user
  //    * */
  //   const { username, email, password } = registerDto;
  //   const user = this.userService.getUserByUserNameOrEmail(username, email);
  //   if (user) {
  //     throw new ConflictException('Le user existe déjà');
  //   }
  // }
}
