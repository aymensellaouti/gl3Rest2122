import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { CredenialsDto } from './dto/credenials.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginResponeDto } from "./dto/login-respone.dto";
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterDto): Promise<User> {
    /*
     * Todo
     *  Get username + password + email
     *  verify if username exit or not ( verify username and email )
     *  crypt password
     *  save user
     * */
    const { username, email } = registerDto;
    let user = await this.userService.getUserByUserNameOrEmail(username, email);
    if (user) {
      throw new UnauthorizedException('Le user existe déjà');
    }
    user = await this.userService.create(registerDto);
    delete user.password;
    delete user.salt;
    return user;
  }
  async login(credentialsDto: CredenialsDto): Promise<LoginResponeDto> {
    //  Todo
    //  1- getuser by email or username
    //  1-1 ok tester le mdp
    //  1-2 ko throw error
    const { identifier, password } = credentialsDto;
    const user = await this.userService.getUserByUserNameOrEmail(
      identifier,
      identifier,
    );
    if (!user) {
      throw new UnauthorizedException('Veuillez vérifier vos credentials');
    }
    //  2- compare el mot
    //  2-1 ok return ok and user
    //  1-2 ko throw error
    const isLoggedIn = await bcrypt.compare(password, user.password);
    if (!isLoggedIn) {
      throw new UnauthorizedException('Veuillez vérifier vos credentials');
    }
    const payload: JwtPayloadDto = {
      username: user.username,
      email: user.email,
      role: user.role,
    };
    const jwt = this.jwtService.sign(payload);
    return { jwt };
  }
}
