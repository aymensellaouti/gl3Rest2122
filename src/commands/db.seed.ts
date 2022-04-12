import { SkillService } from '../skill/skill.service';
import { Skill } from '../skill/entities/skill.entity';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { User, UserRoleEnum } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CvService } from '../cv/cv.service';
import { Cv } from '../cv/entities/cv.entity';
import * as casual from 'casual';
async function bootstrap() {
  console.log('In db seed....');

  const app = await NestFactory.createApplicationContext(AppModule);

  console.log('Loading AppModule....');

  // Todo : Seed Skill

  const skillService = app.get(SkillService);
  console.log('Loading skillService Successfully....');

  for (let i = 1; i < 10; i++) {
    const skill = new Skill();
    skill.designation = `Job ${i}`;
    await skillService.create(skill);
  }
  const skills = await skillService.findAll();
  console.log('skills Added To the DB....');

  // Todo 2 : Seed Users
  const userService = app.get(UserService);
  for (let i = 1; i < 10; i++) {
    const user = new User();
    user.email = casual.email + i;
    user.username = casual.first_name + i;
    user.password = i % 3 == 0 ? 'admin' : 'user';
    user.role = i % 3 == 0 ? UserRoleEnum.admin : UserRoleEnum.user;
    await userService.create(user);
  }
  console.log('users seeded ...');
  const users = await userService.findAll();
  // Todo 3 : Seed Cv with associates skill and users
  console.log('seed cv');
  const cvService = app.get(CvService);
  for (let i = 1; i < 10; i++) {
    const cv = new Cv();
    cv.name = casual.last_name;
    cv.firstname = casual.first_name;
    cv.job = `Job ${i}`;
    cv.age = casual.integer(10, 60);
    cv.path = 'as.jpg';

    cv.skills = [];
    for (let i = 0; i < 3; i++) {
      const mesSkills = '';
      cv.skills.push(skills[i]);
    }
    await cvService.create(cv, users[casual.integer(1, 9)]);
  }
  await app.close();
}

bootstrap();
