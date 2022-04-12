import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { CrudService } from '../generics/crud';

@Injectable()
export class SkillService extends CrudService<Skill> {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {
    super(skillRepository);
  }
  // async create(createSkillDto: CreateSkillDto): Promise<Skill> {
  //   return await this.skillRepository.save(createSkillDto);
  // }
  //
  // async findAll(): Promise<Skill[]> {
  //   return await this.findAll();
  // }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} skill`;
  // }
  //
  // update(id: number, updateSkillDto: UpdateSkillDto) {
  //   return `This action updates a #${id} skill`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} skill`;
  // }
}
