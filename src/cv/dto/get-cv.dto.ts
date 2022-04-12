import { Expose } from 'class-transformer';
import { Skill } from '../../skill/entities/skill.entity';
import { User } from '../../user/entities/user.entity';
export class GetCvDto {
  id: number;
  name: string;
  firstname: string;
  age: number;
  cin: string;
  job: string;
  path: string;
  skills: Skill[];
  user: User;
}
