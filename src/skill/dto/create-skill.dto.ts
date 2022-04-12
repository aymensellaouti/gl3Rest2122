import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSkillDto {
  @IsString()
  @MinLength(3, {
    message: 'La taille minimale de la designation est de 3 caractères',
  })
  @MaxLength(50, {
    message: 'La taille maximale de la designation est de 50 caractères',
  })
  designation: string;
}
