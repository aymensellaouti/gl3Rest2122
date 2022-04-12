import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Repository } from 'typeorm';
import { Cv } from './entities/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from "../user/entities/user.entity";

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
  ) {}
  async create(createCvDto: CreateCvDto, user: User = null): Promise<Cv> {
    if (user) {
      createCvDto.user = user;
      console.log(createCvDto);
    }
    try {
      return await this.cvRepository.save(createCvDto);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<Cv[]> {
    const options = {
      relations: ['user', 'skills'],
      cache: true,
    };
    return this.cvRepository.find(options);
  }

  async findOne(id: number): Promise<Cv> {
    const options = {
      relations: ['user', 'skills'],
      cache: true,
      where: [{ id }],
    };
    const cv = await this.cvRepository.findOne(options);
    if (cv) {
      return cv;
    }
    throw new NotFoundException('Le cv est introuvable');
  }

  async update(id: number, updateCvDto: UpdateCvDto): Promise<Cv> {
    let cv = await this.findOne(id);
    cv = { ...cv, ...updateCvDto };
    return this.cvRepository.save(cv);
  }

  remove(id: number) {
    return `This action removes a #${id} cv`;
  }
}
