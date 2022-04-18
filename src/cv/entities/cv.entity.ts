import { Transform } from 'class-transformer';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Skill } from '../../skill/entities/skill.entity';
import { User } from '../../user/entities/user.entity';
import { TiemstampEntity } from '../../generics/tiemstamp.entity';

@Entity()
export class Cv extends TiemstampEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 50,
  })
  name: string;
  @Column({
    length: 50,
  })
  firstname: string;
  @Column()
  age: number;
  @Column({
    length: 12,
  })
  cin: string;
  @Column({
    length: 100,
  })
  job: string;
  @Column({
    length: 50,
  })
  path: string;

  @ManyToMany((MyTargetEntity) => Skill, (skill) => skill.cvs, {
    eager: true,
  })
  @JoinTable({
    name: 'cv_skill',
    joinColumn: {
      name: 'cv',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'skill',
      referencedColumnName: 'id',
    },
  })
  skills: Skill[];
  @ManyToOne((TargetEntity) => User, (user) => user.cvs, {
    /*     eager: true, */
  })
  /*   @Transform(({ value }) => ({
      name: value.name,
    })
  ) */
  user: User;
}
