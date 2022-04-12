import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cv } from '../../cv/entities/cv.entity';
import { Expose } from 'class-transformer';
import { TiemstampEntity } from '../../generics/tiemstamp.entity';

@Entity()
export class Skill extends TiemstampEntity {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;
  @Column({ length: 100 })
  @Expose()
  designation: string;
  @ManyToMany((MyTargetEntity) => Cv, (cv) => cv.skills)
  cvs: Cv[];
}
